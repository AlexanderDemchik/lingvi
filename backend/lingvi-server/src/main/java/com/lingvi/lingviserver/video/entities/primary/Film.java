package com.lingvi.lingviserver.video.entities.primary;

import com.lingvi.lingviserver.commons.entities.primary.StorageFile;
import com.lingvi.lingviserver.i18n.entities.primary.I18n;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Entity(name = "movies")
@EntityListeners(AuditingEntityListener.class)
public class Film {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String key;

    @OneToOne
    private StorageFile previewPoster;

    @Column
    private long views = 0;

    @Column
    @CreatedDate
    private Date createdAt;

    @Column
    private String name;

    @OneToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private Video video = new Video();

    @Column(length = 20000,columnDefinition="Text")
    private String description;

//    @OneToOne
//    private I18n name;

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

    public long getViews() {
        return views;
    }

    public void setViews(long views) {
        this.views = views;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public StorageFile getPreviewPoster() {
        return previewPoster;
    }

    public void setPreviewPoster(StorageFile previewPosterLink) {
        this.previewPoster = previewPosterLink;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

//    public I18n getName() {
//        return name;
//    }
//
//    public void setName(I18n name) {
//        this.name = name;
//    }
}
