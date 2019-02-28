package com.lingvi.lingviserver.dictionary.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity that returns to user when he request translate
 */
public class WordResponse {

    private Long id;
    private String word;
    private String transcription;
    private Language language;

    @JsonIgnoreProperties(value = {"translations", "sounds", "lemma"})
    private Word lemma;

    private List<TranslationResponse> translations = new ArrayList<>();
    private String soundUrl;

    public WordResponse() {};
    public WordResponse(Word word, Sound sound, List<TranslationResponse> translations) {
        this.id = word.getId();
        this.word = word.getWord();
        this.language = word.getLanguage();
        this.lemma = word.getLemma();
        this.transcription = word.getTranscription();
        this.translations = translations;

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

    public Word getLemma() {
        return lemma;
    }

    public void setLemma(Word lemma) {
        this.lemma = lemma;
    }

    public String getSoundUrl() {
        return soundUrl;
    }

    public void setSoundUrl(String soundUrl) {
        this.soundUrl = soundUrl;
    }

    public List<TranslationResponse> getTranslations() {
        return translations;
    }

    public void setTranslations(List<TranslationResponse> translations) {
        this.translations = translations;
    }
}
