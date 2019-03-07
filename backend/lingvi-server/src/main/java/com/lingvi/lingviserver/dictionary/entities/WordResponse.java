package com.lingvi.lingviserver.dictionary.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Entity that returns to user when he request translate
 */
public class WordResponse {

    private Long id;
    private String word;
    private String transcription;
    private Language language;
    private Translation defaultTranslation;
    private Language translationLanguage;
    private boolean isInUserDict;

    @JsonIgnoreProperties(value = {"translations", "sounds", "lemma"})
    private WordDTO lemma;

    /**
     * Translations grouped by part of speech
     */
    private Map<PartOfSpeech, List<Translation>> translations = new HashMap<>();
    private String soundUrl;

    public WordResponse() {}

    public WordResponse(WordDTO word, Sound sound, Map<PartOfSpeech, List<Translation>> translations, Translation defaultTranslation, boolean isInUserDict) {
        this.id = word.getId();
        this.word = word.getWord();
        this.language = word.getLanguage();
        this.lemma = word.getLemma();
        this.transcription = word.getTranscription();
        this.translations = translations;
        this.isInUserDict = isInUserDict;
        this.defaultTranslation = defaultTranslation;

        if (sound != null) {
            this.soundUrl = sound.getRootUrl() + sound.getRelativePath();
        }
    }

    public WordResponse(WordDTO word, Sound sound, Map<PartOfSpeech, List<Translation>> translations, Translation defaultTranslation, boolean isInUserDict, Language translationLanguage) {
        this.id = word.getId();
        this.word = word.getWord();
        this.language = word.getLanguage();
        this.lemma = word.getLemma();
        this.transcription = word.getTranscription();
        this.translations = translations;
        this.isInUserDict = isInUserDict;
        this.defaultTranslation = defaultTranslation;
        this.translationLanguage = translationLanguage;

        if (sound != null) {
            this.soundUrl = sound.getRootUrl() + sound.getRelativePath();
        }
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWord() {
        return word;
    }

    public void setWord(String word) {
        this.word = word;
    }

    public String getTranscription() {
        return transcription;
    }

    public void setTranscription(String transcription) {
        this.transcription = transcription;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getSoundUrl() {
        return soundUrl;
    }

    public void setSoundUrl(String soundUrl) {
        this.soundUrl = soundUrl;
    }

    public Translation getDefaultTranslation() {
        return defaultTranslation;
    }

    public boolean isInUserDict() {
        return isInUserDict;
    }

    public void setInUserDict(boolean inUserDict) {
        isInUserDict = inUserDict;
    }

    public Map<PartOfSpeech, List<Translation>> getTranslations() {
        return translations;
    }

    public void setTranslations(Map<PartOfSpeech, List<Translation>> translations) {
        this.translations = translations;
    }

    public Language getTranslationLanguage() {
        return translationLanguage;
    }

    public void setTranslationLanguage(Language translationLanguage) {
        this.translationLanguage = translationLanguage;
    }

    public WordDTO getLemma() {
        return lemma;
    }

    public void setLemma(WordDTO lemma) {
        this.lemma = lemma;
    }
}
