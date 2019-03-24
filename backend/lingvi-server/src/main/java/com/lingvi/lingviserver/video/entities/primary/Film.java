package com.lingvi.lingviserver.video.entities.primary;

import javax.persistence.*;

@Entity(name = "films")
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String key;

    @Column
    private String previewPosterLink;

    @Column
    private String videoPosterLink;

    @OneToOne
    private Video video;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Video getVideo() {
        return video;
    }

    public void setVideo(Video video) {
        this.video = video;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getPreviewPosterLink() {
        return previewPosterLink;
    }

    public void setPreviewPosterLink(String previewPosterLink) {
        this.previewPosterLink = previewPosterLink;
    }

    public String getVideoPosterLink() {
        return videoPosterLink;
    }

    public void setVideoPosterLink(String videoPosterLink) {
        this.videoPosterLink = videoPosterLink;
    }
}
