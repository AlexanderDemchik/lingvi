package com.lingvi.lingviserver.video.entities.primary;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "shows")
public class Show {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String key;

    @Column
    private String previewPosterLink;

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

    public String getPreviewPosterLink() {
        return previewPosterLink;
    }

    public void setPreviewPosterLink(String previewPosterLink) {
        this.previewPosterLink = previewPosterLink;
    }
}
