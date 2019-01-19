package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.AccessToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface AccessTokenRepository extends CrudRepository<AccessToken, String> {
    List<AccessToken> removeAllByCreationDateBefore(Date date);
}
