package com.lingvi.lingviserver.dictionary.entities;

import com.lingvi.lingviserver.commons.entities.Language;
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

    private String word;

    private String transcription;

    private Language language;

    private WordDTO lemma;

    private List<Translation> translations = new ArrayList<>();

    private List<Sound> sounds = new ArrayList<>();

    public WordDTO(Word word) {
        this.id = word.getId();
        this.word = word.getWord();
        this.transcription = word.getTranscription();
        this.language = word.getLanguage();

        if (word.getLemma() != null) {
            lemma = new WordDTO(word.getLemma());
        }
    }

    public WordDTO(Word word, List<Translation> translations) {
        this.id = word.getId();
        this.word = word.getWord();
        this.transcription = word.getTranscription();
        this.language = word.getLanguage();
        this.translations = translations;

        if (word.getLemma() != null) {
            lemma = new WordDTO(word.getLemma());
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
