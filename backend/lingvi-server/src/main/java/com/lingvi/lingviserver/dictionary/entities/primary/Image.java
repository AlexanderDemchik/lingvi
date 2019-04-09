package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

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

    @JsonIgnore
    @JsonIgnoreProperties({"image"})
    @OneToMany(mappedBy = "image")
    private List<Blame> blames = new ArrayList<>();

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

    public List<Blame> getBlames() {
        return blames;
    }

    public void setBlames(List<Blame> blames) {
        this.blames = blames;
    }
}
