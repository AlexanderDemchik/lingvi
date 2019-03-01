package com.lingvi.lingviserver.dictionary.entities.primary;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIdentityReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.lingvi.lingviserver.account.entities.primary.Account;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Representation of word in user dictionary
 */
@Entity(name = "user_dictionary")
public class UserWord {

    @JsonIgnore
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String context;

    @JsonIdentityInfo(generator= ObjectIdGenerators.PropertyGenerator.class, property="id")
    @JsonIdentityReference(alwaysAsId=true)
    @OneToOne(fetch = FetchType.LAZY)
    private Word word;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Translation> userTranslations = new ArrayList<>();

    @CreatedDate
    @Column
    private String createdDate;

    @ManyToOne(fetch = FetchType.LAZY)
    private Account account;

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

    public String getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(String createdDate) {
        this.createdDate = createdDate;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }
}
