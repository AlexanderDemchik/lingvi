package com.lingvi.lingviserver.i18n.entities.primary;

import com.lingvi.lingviserver.commons.entities.Language;

import javax.persistence.*;

@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"i18n", "language"}))
public class I18nTranslation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Language language;

    @Column
    private String translation;

    @ManyToOne
    @JoinColumn(name = "i18n")
    private I18n i18n;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public I18n getI18n() {
        return i18n;
    }

    public void setI18n(I18n i18n) {
        this.i18n = i18n;
    }

    public Language getLanguage() {
        return language;
    }

    public void setLanguage(Language language) {
        this.language = language;
    }

    public String getTranslation() {
        return translation;
    }

    public void setTranslation(String translation) {
        this.translation = translation;
    }
}
