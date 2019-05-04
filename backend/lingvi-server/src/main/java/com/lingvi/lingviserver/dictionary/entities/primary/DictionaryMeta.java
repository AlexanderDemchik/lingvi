package com.lingvi.lingviserver.dictionary.entities.primary;

import com.lingvi.lingviserver.commons.entities.Language;

import javax.persistence.*;

/**
 * Just contains info which dictionaries needed to show user
 */
@Entity(name = "user_dictionary_meta")
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"userId", "fromLang", "toLang"}))
public class DictionaryMeta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private Long userId;

    @Column(name = "fromLang")
    private Language from;

    @Column(name = "toLang")
    private Language to;

    public DictionaryMeta(Long userId, Language from, Language to) {
        this.userId = userId;
        this.from = from;
        this.to = to;
    }

    public DictionaryMeta() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Language getFrom() {
        return from;
    }

    public void setFrom(Language from) {
        this.from = from;
    }

    public Language getTo() {
        return to;
    }

    public void setTo(Language to) {
        this.to = to;
    }
}
