package com.lingvi.lingviserver.security.entities.primary;

import com.lingvi.lingviserver.account.entities.primary.User;

import javax.persistence.*;
import java.util.Date;

/**
 * Refresh tokens issued to users, and they are long-lived
 */
@Entity(name = "refresh_tokens")
public class RefreshToken {

    @Id
    private String token;

    @Column
    private Date creationDate;

    @Column
    private Status status;

    @Column
    private Date exchangeDate;

    @Column
    private String exchangedToToken;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;

    public RefreshToken() {}

    public RefreshToken(String token, Date creationDate, User user) {
        this.token = token;
        this.creationDate = creationDate;
        this.status = Status.ACTIVE;
        this.user = user;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public Date getExchangeDate() {
        return exchangeDate;
    }

    public void setExchangeDate(Date exchangeDate) {
        this.exchangeDate = exchangeDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getExchangedToToken() {
        return exchangedToToken;
    }

    public void setExchangedToToken(String exchangedToToken) {
        this.exchangedToToken = exchangedToToken;
    }

    public enum Status {
        DISABLED, ACTIVE
    }
}
