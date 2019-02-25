package com.lingvi.lingviserver.security.entities.inmemory;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * Model of black list token in in-memory db
 */
@Entity(name = "black_list")
public class InMemoryBlackListToken {

    @Id
    private String token;

    @Column
    private Date addingDate;

    public InMemoryBlackListToken(String token, Date addingDate) {
        this.token = token;
        this.addingDate = addingDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public Date getAddingDate() {
        return addingDate;
    }

    public void setAddingDate(Date addingDate) {
        this.addingDate = addingDate;
    }
}
