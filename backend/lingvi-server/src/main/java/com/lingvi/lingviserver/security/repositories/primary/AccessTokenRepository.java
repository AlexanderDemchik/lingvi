package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.AccessToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface AccessTokenRepository extends CrudRepository<AccessToken, String> {
    void removeAllByCreationDateBefore(Date date);
}
