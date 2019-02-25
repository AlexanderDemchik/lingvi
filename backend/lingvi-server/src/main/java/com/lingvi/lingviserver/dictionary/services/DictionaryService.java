package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import com.lingvi.lingviserver.dictionary.repositories.primary.TranslationRepository;
import com.lingvi.lingviserver.dictionary.repositories.primary.WordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
public class DictionaryService {

    private Logger logger = LoggerFactory.getLogger(DictionaryService.class);

    private YandexTranslationService yandexTranslationService;
    private WordRepository wordRepository;
    private TranslationRepository translationRepository;
    private GoogleTextToSpeechService googleTextToSpeechService;
    private SystranTranslationService systranTranslationService;

    @Autowired
    DictionaryService(YandexTranslationService yandexTranslationService, WordRepository wordRepository, TranslationRepository translationRepository, GoogleTextToSpeechService googleTextToSpeechService, SystranTranslationService systranTranslationService) {
        this.yandexTranslationService = yandexTranslationService;
        this.wordRepository = wordRepository;
        this.translationRepository = translationRepository;
        this.googleTextToSpeechService = googleTextToSpeechService;
        this.systranTranslationService = systranTranslationService;
    }

    /**
     * @param text text to be translated
     * @param from language from which translation
     * @param to language to which translation is
     */
    public Word translate(String text, Language from, Language to) {

        String textToBeTranslated = text.trim();

        Word translated;
        if((translated = wordRepository.findByWord(textToBeTranslated)) != null) {
            return translated;
        } else {
            CompletableFuture<Translation> translatorResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadTranslation(text, from, to));
            CompletableFuture<Word> dictionaryResponse = CompletableFuture.supplyAsync(() -> yandexTranslationService.loadDictionaryTranslations(text, from, to));
            CompletableFuture<String> lemmaResponse = CompletableFuture.supplyAsync(() -> systranTranslationService.getLemma(textToBeTranslated, from));
            CompletableFuture<Sound> audioResponse = CompletableFuture.supplyAsync(() -> googleTextToSpeechService.getAudioFromText(text, from));

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
                    translated = new Word(text, from, Arrays.asList(translationFromTranslator));
                }

                //save sound
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
}
