package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;

public class TranslationResponse {

    private Long id;
    private Language language;
    private String translation;
    private PartOfSpeech partOfSpeech;
    private Long popularity;

    /**
     * Show if translation is in user dictionary
     */
    private boolean isInUserDict;

    public TranslationResponse() {
    }

    public TranslationResponse(Translation translation) {
        this.id = translation.getId();
        this.language = translation.getLanguage();
        this.translation = translation.getTranslation();
        this.partOfSpeech = translation.getPartOfSpeech();
        this.popularity = translation.getPopularity();
    }

    public TranslationResponse(Translation translation, boolean isInUserDict) {
        this.id = translation.getId();
        this.language = translation.getLanguage();
        this.translation = translation.getTranslation();
        this.partOfSpeech = translation.getPartOfSpeech();
        this.popularity = translation.getPopularity();
        this.isInUserDict = isInUserDict;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public PartOfSpeech getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(PartOfSpeech partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public Long getPopularity() {
        return popularity;
    }

    public void setPopularity(Long popularity) {
        this.popularity = popularity;
    }

    public boolean isInUserDict() {
        return isInUserDict;
    }

    public void setInUserDict(boolean inUserDict) {
        isInUserDict = inUserDict;
    }
}
