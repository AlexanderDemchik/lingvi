package com.lingvi.lingviserver.video.entities;

import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.video.entities.primary.Video;

import java.util.ArrayList;
import java.util.List;

public class VideoDTO {

    private Long id;
    private String rootUrl;
    private String relativePath;
    private VideoType videoType;
    private boolean isReady = false;
    private List<Integer> qualities = new ArrayList<>();
    private List<Language> subtitles = new ArrayList<>();

    public VideoDTO() {

    }

    public VideoDTO(Video video) {
        this.id = video.getId();
        this.rootUrl = video.getRootUrl();
        this.relativePath = video.getRelativePath();
        this.videoType = video.getVideoType();
        this.qualities = new ArrayList<>(video.getQualities());
        this.subtitles = new ArrayList<>(video.getSubtitles());
        this.isReady = video.isReady();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public boolean isReady() {
        return isReady;
    }

    public void setReady(boolean ready) {
        isReady = ready;
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
}
