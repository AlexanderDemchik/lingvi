package com.lingvi.lingviserver.security.entities.primary;

import com.lingvi.lingviserver.account.entities.primary.User;

import javax.persistence.*;

/**
 * Model to present relationship between users and providers.
 * <p>
 * Consist three primary keys:
 * user id,
 * provider name,
 * provider user id.
 */
@Entity(name = "user_providers")
public class UserProvider {

    @EmbeddedId
    private UserProviderPK userProviderPK = new UserProviderPK();

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    public UserProvider() {
    }

    public UserProvider(UserProviderPK userProviderPK, User user) {
        this.userProviderPK = userProviderPK;
        this.user = user;
    }

    public UserProviderPK getUserProviderPK() {
        return userProviderPK;
    }

    public void setUserProviderPK(UserProviderPK userProviderPK) {
        this.userProviderPK = userProviderPK;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
