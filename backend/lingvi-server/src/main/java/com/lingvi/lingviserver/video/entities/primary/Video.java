package com.lingvi.lingviserver.video.entities.primary;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.video.entities.VideoType;

import javax.persistence.*;
import java.util.List;

@Entity
public class Video {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String rootUrl;

    @Column
    private String relativePath;

    @Column
    private VideoType videoType;

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

    public VideoType getVideoType() {
        return videoType;
    }

    public void setVideoType(VideoType videoType) {
        this.videoType = videoType;
    }
}
