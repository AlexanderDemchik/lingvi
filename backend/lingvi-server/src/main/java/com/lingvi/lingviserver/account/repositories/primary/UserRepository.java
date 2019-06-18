package com.lingvi.lingviserver.account.repositories.primary;

import com.lingvi.lingviserver.account.entities.primary.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    User findByEmail(String email);

    @SuppressWarnings("SpringDataMethodInconsistencyInspection")
    User findByUserProviders_userProviderPK_providerAndUserProviders_userProviderPK_userProviderId(String provider, String userProviderId);

    default User findByProviderAndUserProviderId(String provider, String userProviderId) {
        return findByUserProviders_userProviderPK_providerAndUserProviders_userProviderPK_userProviderId(provider, userProviderId);
    }

    List<User> findAll();
}
