package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.BlackListToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface BlackListTokenRepository extends CrudRepository<BlackListToken, String> {
    void removeAllByTypeAndAddingDateBefore(BlackListToken.Type type, Date date);
}
