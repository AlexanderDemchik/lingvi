package com.lingvi.lingviserver.security.entities;

import com.fasterxml.jackson.annotation.JsonSetter;

/**
 * Class that contain user info, which we get from OAuth providers and send to account-service
 */
public class ProviderUser {

    /**
     * User id from provider
     */
    private String id;

    /**
     * User name
     */
    private String givenName;

    /**
     * User family name
     */
    private String familyName;

    /**
     * User email
     */
    private String email;

    /**
     * Link to user profile photo
     */
    private String profilePhoto;

    /**
     * User gender
     */
    private String gender;

    public ProviderUser() {
    }

    public ProviderUser(String id, String email) {
        this.id = id;
        this.email = email;
    }

    public String getGivenName() {
        return givenName;
    }

    @JsonSetter("givenName")
    public void setGivenName(String name) {
        this.givenName = name;
    }

    public String getFamilyName() {
        return familyName;
    }

    @JsonSetter("familyName")
    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getEmail() {
        return email;
    }

    @JsonSetter("email")
    public void setEmail(String email) {
        this.email = email;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    @JsonSetter("profilePhoto")
    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getId() {
        return id;
    }

    @JsonSetter("id")
    public void setId(String id) {
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
        return "ProviderUser{" +
                "id='" + id + '\'' +
                ", givenName='" + givenName + '\'' +
                ", familyName='" + familyName + '\'' +
                ", email='" + email + '\'' +
                ", profilePhoto='" + profilePhoto + '\'' +
                ", gender='" + gender + '\'' +
                '}';
    }
}
