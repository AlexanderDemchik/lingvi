package com.lingvi.lingviserver.account.entities.primary;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.security.entities.primary.AccessToken;
import com.lingvi.lingviserver.security.entities.primary.RefreshToken;
import com.lingvi.lingviserver.security.entities.primary.Role;
import com.lingvi.lingviserver.security.entities.primary.UserProvider;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;


/**
 * User model
 */
@Entity(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @Column(unique = true)
    private String email;

    @Column
    private boolean locked = false;

    @JsonIgnore
    @Column
    private String password;

    @Column
    @CreatedDate
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @Column
    private String givenName;

    @Column
    private String familyName;

    @Column
    private String profilePhoto;

    @Column
    private String gender;

    @Column
    private Language translationLanguage;

    @Column
    private Language uiLanguage;

    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user", fetch = FetchType.LAZY)
    private List<UserProvider> userProviders = new ArrayList<>();

//    @ManyToMany
//    @JoinTable(name = "user_roles", joinColumns = {@JoinColumn(name = "user_id")}, inverseJoinColumns = {@JoinColumn(name="role_id")})
    @Column
    private Role role;

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "user", fetch = FetchType.LAZY)
    private List<RefreshToken> refreshTokens = new ArrayList<>();

    @JsonIgnore
    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "user", fetch = FetchType.LAZY)
    private List<AccessToken> accessTokens = new ArrayList<>();

    public User() {
    }

    public User(String email, String password, Role role) {
        this.email = email;
        this.password = password;
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public List<AccessToken> getAccessTokens() {
        return accessTokens;
    }

    public void setAccessTokens(List<AccessToken> accessTokens) {
        this.accessTokens = accessTokens;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }


    public List<UserProvider> getUserProviders() {
        return userProviders;
    }

    public void setUserProviders(List<UserProvider> userProviders) {
        this.userProviders = userProviders;
    }

    public List<RefreshToken> getRefreshTokens() {
        return refreshTokens;
    }

    public void setRefreshTokens(List<RefreshToken> refreshTokens) {
        this.refreshTokens = refreshTokens;
    }

    public String getGivenName() {
        return givenName;
    }

    public void setGivenName(String givenName) {
        this.givenName = givenName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getProfilePhoto() {
        return profilePhoto;
    }

    public void setProfilePhoto(String profilePhoto) {
        this.profilePhoto = profilePhoto;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public Language getTranslationLanguage() {
        return translationLanguage;
    }

    public void setTranslationLanguage(Language translationLanguage) {
        this.translationLanguage = translationLanguage;
    }

    public Language getUiLanguage() {
        return uiLanguage;
    }

    public void setUiLanguage(Language uiLanguage) {
        this.uiLanguage = uiLanguage;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, email, password, userProviders, role, accessTokens, refreshTokens);
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
