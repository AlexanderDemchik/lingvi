package com.lingvi.lingviserver.video.entities.primary;

import com.lingvi.lingviserver.commons.entities.primary.StorageFile;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String key;

    @Column
    private String name;

    @OneToOne
    private StorageFile previewPoster;

    @OneToMany(mappedBy = "show", cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Season> seasons = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<Season> getSeasons() {
        return seasons;
    }

    public void setSeasons(List<Season> seasons) {
        this.seasons = seasons;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
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
}
