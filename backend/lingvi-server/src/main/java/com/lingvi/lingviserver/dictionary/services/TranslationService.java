package com.lingvi.lingviserver.dictionary.services;

import com.lingvi.lingviserver.dictionary.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;

public interface TranslationService {

    Translation loadTranslation(String word, Language fromLang, Language toLang);

    Word loadDictionaryTranslations(String word, Language fromLang, Language toLang);
}
