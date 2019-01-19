package com.lingvi.lingviserver.security.entities.primary;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

/**
 * Representation of complex primary key
 */
@Embeddable
public class UserProviderPK implements Serializable {

    private Long userId;

    @Column(name = "provider")
    private String provider;

    @Column(name = "user_provider_id")
    private String userProviderId;

    public UserProviderPK() {
    }

    public UserProviderPK(Long userId, String provider, String userProviderId) {
        this.userId = userId;
        this.provider = provider;
        this.userProviderId = userProviderId;
    }

    public UserProviderPK(String provider, String userProviderId) {
        this.provider = provider;
        this.userProviderId = userProviderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }

    public String getUserProviderId() {
        return userProviderId;
    }

    public void setUserProviderId(String userProviderId) {
        this.userProviderId = userProviderId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserProviderPK that = (UserProviderPK) o;
        return Objects.equals(userId, that.userId) &&
                Objects.equals(provider, that.provider) &&
                Objects.equals(userProviderId, that.userProviderId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, provider, userProviderId);
    }
}
