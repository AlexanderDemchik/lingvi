package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;

@Entity(name = "word_images")
public class Image implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long addedBy;

    @Column
    private String rootPath;

    @Column
    private String relativePath;

    @ManyToOne
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
    @JsonIdentityReference(alwaysAsId = true)
    @JoinColumn(name = "word_id")
    private Word word;

    public Image() {
    }

    public Image(String rootPath, String relativePath) {
        this.rootPath = rootPath;
        this.relativePath = relativePath;
    }

    public Long getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(Long addedBy) {
        this.addedBy = addedBy;
    }

    public String getRootPath() {
        return rootPath;
    }

    public void setRootPath(String rootPath) {
        this.rootPath = rootPath;
    }

    public String getRelativePath() {
        return relativePath;
    }

    public void setRelativePath(String relativePath) {
        this.relativePath = relativePath;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
