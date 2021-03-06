package com.lingvi.lingviserver.dictionary.entities.primary;

import com.lingvi.lingviserver.commons.entities.Language;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * Common dictionary text
 */
@Entity(name = "dictionary")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"text", "language"}))
public class Word implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String text;

    @Column
    private String transcription;

    @Column
    private Language language;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "lemma_word_id")
    private Word lemma;

    @OneToMany(mappedBy = "word", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Translation> translations = new ArrayList<>();

    @OneToMany(mappedBy = "word", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Sound> sounds = new ArrayList<>();

    @OneToMany(mappedBy = "word", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Image> images = new ArrayList<>();

    public Word() {
    }

    public Word(String text, Language language, List<Translation> translations) {
        this.text = text;
        this.language = language;
        this.translations = translations;
    }

    public Word(Long id, String text, Language language, List<Translation> translations) {
        this.text = text;
        this.language = language;
        this.translations = translations;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Translation> getTranslations() {
        return translations;
    }

    public void setTranslations(List<Translation> translations) {
        this.translations = translations;
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

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id +
                ", text='" + text + '\'' +
                ", transcription='" + transcription + '\'' +
                ", language=" + language +
                ", translations=" + translations +
                '}';
    }

    public Word getLemma() {
        return lemma;
    }

    public void setLemma(Word lemma) {
        this.lemma = lemma;
    }

    public List<Sound> getSounds() {
        return sounds;
    }

    public void setSounds(List<Sound> sounds) {
        this.sounds = sounds;
    }

    public List<Image> getImages() {
        return images;
    }

    public void setImages(List<Image> images) {
        this.images = images;
    }
}
