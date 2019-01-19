package com.lingvi.lingviserver.security.repositories.primary;

import com.lingvi.lingviserver.security.entities.primary.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface RefreshTokenRepository  extends CrudRepository<RefreshToken, String> {
    RefreshToken findByToken(String token);
    void removeAllByCreationDateBefore(Date date);
    void removeAllByStatusAndCreationDateBefore(RefreshToken.Status status, Date date);
}
