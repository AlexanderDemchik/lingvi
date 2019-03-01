package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.dictionary.entities.*;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.UserWord;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import com.lingvi.lingviserver.dictionary.repositories.primary.SoundRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.TranslationRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.UserWordRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.WordRepository;
import com.lingvi.lingviserver.dictionary.utils.StorageUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.stream.Collectors;

@Service
public class DictionaryService {

    private Logger logger = LoggerFactory.getLogger(DictionaryService.class);

    private YandexTranslationService yandexTranslationService;
    private WordRepository wordRepository;
    private TranslationRepository translationRepository;
    private GoogleTextToSpeechService googleTextToSpeechService;
    private SystranTranslationService systranTranslationService;
    private SoundRepository soundRepository;
    private UserWordRepository userWordRepository;
    private EspeakTranscriptionService espeakTranscriptionService;
    private StorageUtil storageUtil;

    @Autowired
    DictionaryService(YandexTranslationService yandexTranslationService, WordRepository wordRepository, TranslationRepository translationRepository, GoogleTextToSpeechService googleTextToSpeechService, SystranTranslationService systranTranslationService, SoundRepository soundRepository, UserWordRepository userWordRepository, EspeakTranscriptionService espeakTranscriptionService, StorageUtil storageUtil) {
        this.yandexTranslationService = yandexTranslationService;
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
        this.googleTextToSpeechService = googleTextToSpeechService;
        this.systranTranslationService = systranTranslationService;
        this.soundRepository = soundRepository;
        this.userWordRepository = userWordRepository;
        this.espeakTranscriptionService = espeakTranscriptionService;
        this.storageUtil = storageUtil;
    }

    /**
     * Getting word from db or do request to api
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public Word translate(String text, Language from, Language to) {

        final SoundType soundType = SoundType.FEMALE_EN_GB;

        Word translated;
        if((translated = wordRepository.findByWordIgnoreCase(text)) != null) {
            return translated;
        } else {
            CompletableFuture<Translation> translatorResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadTranslation(text, from, to));
            CompletableFuture<Word> dictionaryResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadDictionaryTranslations(text, from, to));
            CompletableFuture<String> lemmaResponse = CompletableFuture.supplyAsync(() -> systranTranslationService.getLemma(text, from));

            CompletableFuture.allOf(translatorResponse, dictionaryResponse, lemmaResponse).join();

            try {
                translated = dictionaryResponse.get();
                Translation translationFromTranslator = translatorResponse.get();
                if (translated != null) {

                    if (translationFromTranslator != null && (translated.getTranslations().size() == 0)) { //not save translation from translator if have translations from dictionary
                        translationFromTranslator.setWord(translated);
                        translated.getTranslations().add(translationFromTranslator);
                    } else {
                        logger.error("Something wrong with translator");
                    }

                    //check if lemma for word is exist
                    if (lemmaResponse.get() != null) {
                        Word lemmaWord;
                        if ((lemmaWord = wordRepository.findByWordIgnoreCase(lemmaResponse.get())) != null) {
                            translated.setLemma(lemmaWord);
                        } else {
                            lemmaWord = translate(lemmaResponse.get(), from, to);
                            translated.setLemma(lemmaWord);
                        }
                    }

                    //save sound asynchronously if it is word but not sequence
                    Word finalTranslated = translated;
                    CompletableFuture<String> audioResponse = CompletableFuture.supplyAsync(() -> googleTextToSpeechService.getAudioFromText(finalTranslated.getWord(), soundType));
                    audioResponse.thenApply(base64Audio -> {
                        Sound sound = storageUtil.saveSoundToStorage(base64Audio);
                        sound.setWord(finalTranslated);
                        sound.setSoundType(soundType);
                        finalTranslated.getSounds().add(sound);
                        wordRepository.save(finalTranslated);
                        return null;
                    });

                    if (translated.getTranscription() == null && translated.getLanguage().equals(Language.EN)) {
                        translated.setTranscription(espeakTranscriptionService.transcript(translated.getWord()));
                    }

                    wordRepository.save(translated);
                } else { //if translation from dictionary is null, then it's just a sequence, and we not save it to db
                    if (translationFromTranslator == null) throw new ApiError("Error occurred while translate word", HttpStatus.BAD_REQUEST);
                    translated = new Word(text, from, new ArrayList<>());
                    translationFromTranslator.setWord(translated);
                    translated.getTranslations().add(translationFromTranslator);
                }
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        return translated;

    }

    /**
     * Map {@link Word} to {@link WordResponse}
     *
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public WordResponse handleUserTranslateRequest(String text, Language from, Language to) {

        text = text.trim();

        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        Word word = translate(text, from, to);
        List<TranslationResponse> resultTranslations;

        if (word.getId() != null) {
            UserWord wordFromUserDict = userWordRepository.findByWordAndAccountId(word, userId);

            List<Translation> translationsFromUserDict = null;
            List<Long> translationsFromUserDictIds = null;
            if (wordFromUserDict != null) {
                translationsFromUserDict = wordFromUserDict.getUserTranslations();
                translationsFromUserDictIds = translationsFromUserDict.stream().map(Translation::getId).collect(Collectors.toList());
            }

            List<Translation> translationsFromCommonDict = translationRepository.findTop5ByWordOrderByPopularityDesc(word);

            if (translationsFromUserDict != null) {
                resultTranslations = translationsFromUserDict.stream().map(t -> new TranslationResponse(t, true)).collect(Collectors.toList());
                for (Translation translation : translationsFromCommonDict) {
                    if (!translationsFromUserDictIds.contains(translation.getId())) {
                        resultTranslations.add(new TranslationResponse(translation, false));
                    }
                }
            } else if (translationsFromCommonDict != null) {
                resultTranslations = translationsFromCommonDict.stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
            } else {
                resultTranslations = word.getTranslations().stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
            }
        } else {
            resultTranslations = word.getTranslations().stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
        }

        return new WordResponse(word, soundRepository.findTop1ByWordIdAndSoundType(word.getId(), SoundType.FEMALE_EN_GB), resultTranslations);
    }

    /**
     * If word present in dictionary return link to mp3 file in storage else return base64 decoded string with mp3
     *
     * @param text text
     * @return {@link SoundResponse}
     *
     * @see Word
     * @see Sound
     * @see SoundType
     */
    public SoundResponse textToSpeech(String text) {
        text = text.trim();
        final SoundType soundType = SoundType.FEMALE_EN_GB; //@TODO take sound type from user profile
        Sound sound;
        Word word;
        if ((word = wordRepository.findByWordIgnoreCase(text)) != null) {
            if ((sound = soundRepository.findTop1ByWordIdAndSoundType(word.getId(), soundType)) != null) {
                return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
            } else {
                sound = storageUtil.saveSoundToStorage(googleTextToSpeechService.getAudioFromText(text, soundType));
                if (sound != null) {
                    sound.setWord(word);
                    sound.setSoundType(soundType);
                    soundRepository.save(sound);
                    return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
                }
                throw new ApiError("Error occurred while getting sound for word id: " + word.getId() + " soundType: " + soundType, HttpStatus.BAD_REQUEST);
            }
        } else {
            return new SoundResponse("data:audio/mp3;base64," + googleTextToSpeechService.getAudioFromText(text, soundType));
        }
    }
}
