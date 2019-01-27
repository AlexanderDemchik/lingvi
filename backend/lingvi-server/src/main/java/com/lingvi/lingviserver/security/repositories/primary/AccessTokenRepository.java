package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.AccessToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface AccessTokenRepository extends CrudRepository<AccessToken, String> {
    void removeAllByCreationDateBefore(Date date);
}
