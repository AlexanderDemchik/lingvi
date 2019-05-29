package com.lingvi.lingviserver.video.entities.primary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lingvi.lingviserver.commons.entities.primary.StorageFile;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"season_id", "number"}))
public class Episode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer number;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Video video = new Video();

    @OneToOne
    private StorageFile videoPoster;

    @Column
    private String description;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "season_id")
    private Season season;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getNumber() {
        return number;
    }

    public void setNumber(Integer number) {
        this.number = number;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

    public Season getSeason() {
        return season;
    }

    public void setSeason(Season season) {
        this.season = season;
    }

    public StorageFile getVideoPoster() {
        return videoPoster;
    }

    public void setVideoPoster(StorageFile videoPosterLink) {
        this.videoPoster = videoPosterLink;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
