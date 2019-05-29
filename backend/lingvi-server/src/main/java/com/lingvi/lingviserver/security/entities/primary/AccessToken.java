package com.lingvi.lingviserver.security.entities.primary;

import com.lingvi.lingviserver.account.entities.primary.User;

import javax.persistence.*;
import java.util.Date;

/**
 * Access tokens issued to users, and they are short-lived
 */
@Entity(name = "access_tokens")
public class AccessToken {

    @Id
    private String token;

    @Column
    private Date creationDate;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;

    public AccessToken() {}

    public AccessToken(String token, Date creationDate, User user) {
        this.token = token;
        this.creationDate = creationDate;
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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
