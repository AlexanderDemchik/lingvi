package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;

/**
 * @see YandexTranslationService
 */
public interface TranslationService {

    /**
     * Load just one translation, without part of speech and other fields
     *
     * @param word word to be translated
     * @param fromLang language from which translation
     * @param toLang language to which translation
     * @return {@link Translation}
     */
    Translation loadTranslation(String word, Language fromLang, Language toLang);

    /**
     * Load all available translations from api, and other data about word
     *
     * @param word word to be translated
     * @param fromLang language from which translation
     * @param toLang language to which translation
     * @return {@link Word}
     */
    Word loadDictionaryTranslations(String word, Language fromLang, Language toLang);
}
