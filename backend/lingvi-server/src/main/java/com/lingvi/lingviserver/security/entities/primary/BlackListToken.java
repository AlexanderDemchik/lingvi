package com.lingvi.lingviserver.security.entities.primary;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

@Entity(name = "black_list")
public class BlackListToken {

    @Id
    private String token;

    @Column
    private Date addingDate;

    @Column
    private Type type;

    public BlackListToken() {
    }

    public BlackListToken(String token, Date addingDate, Type type) {
        this.token = token;
        this.addingDate = addingDate;
        this.type = type;
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

    public Type getType() {
        return type;
    }

    public void setType(Type type) {
        this.type = type;
    }

    public enum Type {
        ACCESS, REFRESH
    }
}
