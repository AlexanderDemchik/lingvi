package com.lingvi.lingviserver.i18n.entities.primary;

import javax.persistence.*;
import java.util.List;

@Entity
public class I18n {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "i18n")
    private List<I18nTranslation> translations;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<I18nTranslation> getTranslations() {
        return translations;
    }

    public void setTranslations(List<I18nTranslation> translations) {
        this.translations = translations;
    }
}
