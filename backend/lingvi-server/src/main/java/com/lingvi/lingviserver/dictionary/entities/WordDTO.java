package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.dictionary.entities.primary.Word;

/**
 *
 */
public class WordDTO extends Word {

    WordDTO(Word word) {
        super(word.getId(), word.getWord(), word.getLanguage(), word.getTranslations());
    }
}
