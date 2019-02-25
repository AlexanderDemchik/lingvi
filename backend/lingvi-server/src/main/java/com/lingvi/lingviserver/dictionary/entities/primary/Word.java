package com.lingvi.lingviserver.dictionary.entities.primary;

import com.lingvi.lingviserver.dictionary.entities.Language;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "dictionary")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String word;

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

    public Word() {
    }

    public Word(String word, Language language, List<Translation> translations) {
        this.word = word;
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

    @Override
    public String toString() {
        return "Word{" +
                "id=" + id +
                ", word='" + word + '\'' +
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
}
