package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.dictionary.entities.PartOfSpeech;
import com.lingvi.lingviserver.dictionary.entities.TranslationSource;

import javax.persistence.*;
import java.io.Serializable;

/**
 * Word translation
 */
@Entity(name = "translations")
public class Translation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Language language;

    @Column
    private String translation;

    @Column
    private PartOfSpeech partOfSpeech;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private Word word;

    @Column
    private Long popularity = 1L;

    @JsonIgnore
    @Column
    private TranslationSource source;

    /**
     * If added by user is user id, else null
     */
    @JsonIgnore
    @Column
    private Long addedBy;

    public Translation() {
    }

    public Translation(Language language, String translation) {
        this.language = language;
        this.translation = translation;
    }

    public Translation(Language language, String translation, TranslationSource source) {
        this.language = language;
        this.translation = translation;
        this.source = source;
    }

    public Translation(Language language, String translation, TranslationSource source, Long popularity) {
        this.language = language;
        this.translation = translation;
        this.source = source;
        this.popularity = popularity;
    }

    public Translation(Language language, String translation, Word word, TranslationSource source) {
        this.language = language;
        this.translation = translation;
        this.word = word;
        this.source = source;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public Long getPopularity() {
        return popularity;
    }

    public void setPopularity(Long popularity) {
        this.popularity = popularity;
    }

    public TranslationSource getSource() {
        return source;
    }

    public void setSource(TranslationSource source) {
        this.source = source;
    }

    public PartOfSpeech getPartOfSpeech() {
        return partOfSpeech;
    }

    public void setPartOfSpeech(PartOfSpeech partOfSpeech) {
        this.partOfSpeech = partOfSpeech;
    }

    public Long getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Long addedBy) {
        this.addedBy = addedBy;
    }

    @Override
    public String toString() {
        return "Translation{" +
                "id=" + id +
                ", language=" + language +
                ", translation='" + translation + '\'' +
                ", partOfSpeech=" + partOfSpeech +
                ", popularity=" + popularity +
                ", source=" + source +
                '}';
    }
}
