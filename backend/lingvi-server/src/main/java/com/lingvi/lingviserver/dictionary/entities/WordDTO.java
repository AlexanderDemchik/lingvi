package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.primary.Image;
import com.lingvi.lingviserver.dictionary.entities.primary.Sound;
import com.lingvi.lingviserver.dictionary.entities.primary.Translation;
import com.lingvi.lingviserver.dictionary.entities.primary.Word;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * We need to use this DTO instead entity to avoid problems with caching
 */
public class WordDTO implements Serializable {

    private Long id;

    private String text;

    private String transcription;

    private Language language;

    private WordDTO lemma;

    private Image image;

    private List<Translation> translations = new ArrayList<>();

    private List<Sound> sounds = new ArrayList<>();

    public WordDTO(Word text) {
        this.id = text.getId();
        this.text = text.getText();
        this.transcription = text.getTranscription();
        this.language = text.getLanguage();

        if (text.getLemma() != null) {
            lemma = new WordDTO(text.getLemma());
        }
    }

    public WordDTO(Word text, List<Translation> translations) {
        this.id = text.getId();
        this.text = text.getText();
        this.transcription = text.getTranscription();
        this.language = text.getLanguage();
        this.translations = translations;

        if (text.getLemma() != null) {
            lemma = new WordDTO(text.getLemma());
        }
    }

    public WordDTO(Word text, List<Translation> translations, Image image) {
        this.id = text.getId();
        this.text = text.getText();
        this.transcription = text.getTranscription();
        this.language = text.getLanguage();
        this.translations = translations;
        this.image = image;

        if (text.getLemma() != null) {
            lemma = new WordDTO(text.getLemma());
        }
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

    public Image getImage() {
        return image;
    }

    public void setImage(Image image) {
        this.image = image;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public WordDTO getLemma() {
        return lemma;
    }

    public void setLemma(WordDTO lemma) {
        this.lemma = lemma;
    }

    public List<Translation> getTranslations() {
        return translations;
    }

    public void setTranslations(List<Translation> translations) {
        this.translations = translations;
    }

    public List<Sound> getSounds() {
        return sounds;
    }

    public void setSounds(List<Sound> sounds) {
        this.sounds = sounds;
    }
}
