package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Representation of word in user dictionary
 */
@Entity(name = "user_dictionary")
@EntityListeners(AuditingEntityListener.class)
public class UserWord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String context;

    @JsonIgnoreProperties({"translations", "lemma", "sounds", "hibernateLazyInitializer"})
    @OneToOne(fetch = FetchType.LAZY)
    private Word word;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    private List<Translation> userTranslations = new ArrayList<>();

    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private Date createdDate;

    @Column(nullable = false)
    private Long accountId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public Word getWord() {
        return word;
    }

    public void setWord(Word word) {
        this.word = word;
    }

    public List<Translation> getUserTranslations() {
        return userTranslations;
    }

    public void setUserTranslations(List<Translation> userTranslations) {
        this.userTranslations = userTranslations;
    }

    public void setAccountId(Long accountId) {
        this.accountId = accountId;
    }

    public Long getAccountId() {
        return this.accountId;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "UserWord{" +
                "id=" + id +
                ", context='" + context + '\'' +
                ", word=" + word +
                ", userTranslations=" + userTranslations +
                ", createdDate=" + createdDate +
                ", accountId=" + accountId +
                '}';
    }
}
