package com.lingvi.lingviserver.account.entities.primary;


import com.lingvi.lingviserver.security.entities.primary.User;
import javax.persistence.*;

/**
 * Class that contains user info.
 */
@Entity(name = "accounts")
public class Account {

    @Id
    private Long id;

    @MapsId
    @OneToOne
    @JoinColumn(name = "id")
    private User user;

    @Column
    private String givenName;

    @Column
    private String familyName;

    @Column
    private String email;

    @Column
    private String profilePhoto;

    @Column
    private String gender;

    public Account() {
    }

    public Account(User user, String email) {
        this.user = user;
        this.email = email;
    }

    public Account(User user, String givenName, String familyName, String email, String profilePhoto, String gender) {
        this.user = user;
        this.givenName = givenName;
        this.familyName = familyName;
        this.email = email;
        this.profilePhoto = profilePhoto;
        this.gender = gender;
    }

    public Account(Long id) {
        this.id = id;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String name) {
        this.givenName = name;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    @Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", email='" + email + '\'' +
                ", profilePhoto='" + profilePhoto + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
