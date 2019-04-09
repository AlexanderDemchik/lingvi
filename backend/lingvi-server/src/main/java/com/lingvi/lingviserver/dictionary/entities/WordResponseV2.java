package com.lingvi.lingviserver.dictionary.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;

import java.util.List;

/**
 * Entity that returns to user when he request translate
 */
public class WordResponseV2 {

    private Long id;
    private String text;
    private String transcription;
    private Language language;
    private List<TranslationResponse> translations;
    private Language translationLanguage;

    @JsonIgnoreProperties(value = {"translations", "sounds", "lemma"})
    private WordDTO lemma;

    /**
     * Translations grouped by part of speech
     */
    private String soundUrl;
    private Image image;

    public WordResponseV2(WordDTO wordDTO, List<TranslationResponse> translations, Language translationLanguage, Image image, String soundUrl) {
        this.id = wordDTO.getId();
        this.language = wordDTO.getLanguage();
        this.lemma = wordDTO.getLemma();
        this.text = wordDTO.getText();
        this.image = image;
        this.transcription = wordDTO.getTranscription();
        this.soundUrl = soundUrl;
        this.translations = translations;
        this.translationLanguage = translationLanguage;
    }

    public List<TranslationResponse> getTranslations() {
        return translations;
    }

    public void setTranslations(List<TranslationResponse> translations) {
        this.translations = translations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
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

    public String getSoundUrl() {
        return soundUrl;
    }

    public void setSoundUrl(String soundUrl) {
        this.soundUrl = soundUrl;
    }

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }
}
