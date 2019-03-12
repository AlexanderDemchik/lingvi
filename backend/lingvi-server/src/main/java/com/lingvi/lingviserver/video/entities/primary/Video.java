package com.lingvi.lingviserver.video.entities.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.video.entities.VideoType;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Integer season;

    @Column
    private Integer episode;

    @Column
    private VideoType type = VideoType.FILM;

    @Column
    private String link;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "video")
    private List<VideoInfo> videoInfos = new ArrayList<>();

    @ElementCollection
    @CollectionTable(name = "video_qualities", joinColumns = @JoinColumn(name="video_id"))
    @Column(name = "quality")
    private List<Integer> qualities;

    @ElementCollection
    @CollectionTable(name = "video_subtitles", joinColumns = @JoinColumn(name="video_id"))
    @Column(name = "subtitle")
    private List<Language> subtitles;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getSeason() {
        return season;
    }

    public void setSeason(Integer season) {
        this.season = season;
    }

    public Integer getEpisode() {
        return episode;
    }

    public void setEpisode(Integer episode) {
        this.episode = episode;
    }

    public VideoType getType() {
        return type;
    }

    public void setType(VideoType type) {
        this.type = type;
    }

    public List<Integer> getQualities() {
        return qualities;
    }

    public void setQualities(List<Integer> qualities) {
        this.qualities = qualities;
    }

    public List<Language> getSubtitles() {
        return subtitles;
    }

    public void setSubtitles(List<Language> subtitles) {
        this.subtitles = subtitles;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getLink() {
        return link;
    }
}
