package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    @SuppressWarnings("SpringDataMethodInconsistencyInspection")
    User findByUserProviders_userProviderPK_providerAndUserProviders_userProviderPK_userProviderId(String provider, String userProviderId);

    default User findByProviderAndUserProviderId(String provider, String userProviderId) {
        return findByUserProviders_userProviderPK_providerAndUserProviders_userProviderPK_userProviderId(provider, userProviderId);
    }
}
