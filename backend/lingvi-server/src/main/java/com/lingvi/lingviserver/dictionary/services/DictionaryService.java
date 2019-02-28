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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
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

    @Autowired
    DictionaryService(YandexTranslationService yandexTranslationService, WordRepository wordRepository, TranslationRepository translationRepository, GoogleTextToSpeechService googleTextToSpeechService, SystranTranslationService systranTranslationService, SoundRepository soundRepository, UserWordRepository userWordRepository) {
        this.yandexTranslationService = yandexTranslationService;
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
        this.googleTextToSpeechService = googleTextToSpeechService;
        this.systranTranslationService = systranTranslationService;
        this.soundRepository = soundRepository;
        this.userWordRepository = userWordRepository;
    }

    /**
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public Word translate(String text, Language from, Language to) {

        String textToBeTranslated = text.trim().toLowerCase();

        Word translated;
        if((translated = wordRepository.findByWord(textToBeTranslated)) != null) {
            return translated;
        } else {
            CompletableFuture<Translation> translatorResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadTranslation(text, from, to));
            CompletableFuture<Word> dictionaryResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadDictionaryTranslations(text, from, to));
            CompletableFuture<String> lemmaResponse = CompletableFuture.supplyAsync(() -> systranTranslationService.getLemma(textToBeTranslated, from));
            CompletableFuture<Sound> audioResponse = CompletableFuture.supplyAsync(() -> googleTextToSpeechService.getAudioFromText(text, SoundType.FEMALE_EN_GB));

            CompletableFuture.allOf(translatorResponse, dictionaryResponse, lemmaResponse).join();

            try {
                translated = dictionaryResponse.get();
                Translation translationFromTranslator = translatorResponse.get();
                if (translated != null) {
                    if (translationFromTranslator != null) {
                        translationFromTranslator.setWord(translated);
                        translated.getTranslations().add(translationFromTranslator);

                        //check if lemma for word is exist
                        if (lemmaResponse.get() != null) {
                            Word lemmaWord;
                            if ((lemmaWord = wordRepository.findByWord(lemmaResponse.get())) != null) {
                                translated.setLemma(lemmaWord);
                            } else {
                                lemmaWord = translate(lemmaResponse.get(), from, to);
                                translated.setLemma(lemmaWord);
                            }
                        }
                    } else {
                        logger.error("Something wrong with translator");
                    }
                } else {
                    if (translationFromTranslator == null) throw new ApiError("Error occurred while translate word", HttpStatus.BAD_REQUEST);
                    translated = new Word(text, from, new ArrayList<>());
                    translationFromTranslator.setWord(translated);
                    translated.getTranslations().add(translationFromTranslator);
                }

                //save sound asynchronously
                Word finalTranslated = translated;
                audioResponse.thenApply(sound -> {
                    sound.setWord(finalTranslated);
                    finalTranslated.getSounds().add(sound);
                    wordRepository.save(finalTranslated);
                    return null;
                });

                wordRepository.save(translated);
            } catch (ExecutionException | InterruptedException e) {
                e.printStackTrace();
            }
        }
        return translated;

    }

    /**
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public WordResponse handleUserTranslateRequest(String text, Language from, Language to) {
        Long userId = Long.valueOf(SecurityContextHolder.getContext().getAuthentication().getName());
        Word word = translate(text, from, to);
        UserWord wordFromUserDict = userWordRepository.findByWordAndAccountId(word, userId);

        List<Translation> translationsFromUserDict = null;
        List<Long> translationsFromUserDictIds = null;
        if (wordFromUserDict != null) {
            translationsFromUserDict = wordFromUserDict.getUserTranslations();
            translationsFromUserDictIds = translationsFromUserDict.stream().map(Translation::getId).collect(Collectors.toList());
        }

        List<TranslationResponse> resultTranslations;
        List<Translation> translationsFromCommonDict = translationRepository.findTop5ByWordOrderByPopularityDesc(word);

        if (translationsFromUserDict != null) {
            resultTranslations = translationsFromUserDict.stream().map(t -> new TranslationResponse(t, true)).collect(Collectors.toList());
            for (Translation translation : translationsFromCommonDict) {
                if (!translationsFromUserDictIds.contains(translation.getId())) {
                    resultTranslations.add(new TranslationResponse(translation, false));
                }
            }
        } else {
            resultTranslations = translationsFromCommonDict.stream().map(t -> new TranslationResponse(t, false)).collect(Collectors.toList());
        }

        return new WordResponse(word, soundRepository.findTop1ByWordIdAndSoundType(word.getId(), SoundType.FEMALE_EN_GB), resultTranslations);
    }

    public SoundResponse getSoundByWordId(long wordId) {
        final SoundType soundType = SoundType.FEMALE_EN_GB;
        Sound sound;
        if ((sound = soundRepository.findTop1ByWordIdAndSoundType(wordId, soundType)) != null) {
            return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
        } else {
            Optional<Word> optionalWord = wordRepository.findById(wordId);
            if (optionalWord.isPresent()) {
                Word word = optionalWord.get();
                sound = googleTextToSpeechService.getAudioFromText(word.getWord(), soundType);
                if (sound != null) {
                    sound.setWord(word);
                    soundRepository.save(sound);
                    return new SoundResponse(sound.getRootUrl() + sound.getRelativePath());
                }
                throw new ApiError("Error occurred while getting sound for word id: " + wordId + " soundType: " + soundType, HttpStatus.BAD_REQUEST);
            }

            throw new ApiError("Word with id " + wordId + " not exist", HttpStatus.BAD_REQUEST);
        }
    }
}
