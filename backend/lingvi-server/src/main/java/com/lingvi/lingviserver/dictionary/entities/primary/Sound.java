package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lingvi.lingviserver.dictionary.entities.SoundType;

import javax.persistence.*;

@Entity
public class Sound {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private SoundType soundType;

    @Column
    private String rootUrl;

    @Column
    private String relativePath;

    @JsonIgnore
    @ManyToOne
    @JoinColumn
    private Word word;

    public Sound() {
    }

    public Sound(SoundType soundType, String rootUrl, String relativePath, Word word) {
        this.soundType = soundType;
        this.rootUrl = rootUrl;
        this.relativePath = relativePath;
        this.word = word;
    }

    public Sound(SoundType soundType, String rootUrl, String relativePath) {
        this.soundType = soundType;
        this.rootUrl = rootUrl;
        this.relativePath = relativePath;
        this.word = word;
    }

    public Sound(SoundType soundType, String link, Word word) {
        this.soundType = soundType;
        this.word = word;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public SoundType getSoundType() {
        return soundType;
    }

    public void setSoundType(SoundType soundType) {
        this.soundType = soundType;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public String getRootUrl() {
        return rootUrl;
    }

    public void setRootUrl(String rootUrl) {
        this.rootUrl = rootUrl;
    }

    public String getRelativePath() {
        return relativePath;
    }

    public void setRelativePath(String relativePath) {
        this.relativePath = relativePath;
    }
}
