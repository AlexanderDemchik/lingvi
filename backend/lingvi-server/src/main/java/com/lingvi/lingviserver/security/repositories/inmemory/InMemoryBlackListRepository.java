package com.lingvi.lingviserver.security.repositories.inmemory;

import com.lingvi.lingviserver.security.entities.inmemory.InMemoryBlackListToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;

@Repository
public interface InMemoryBlackListRepository extends CrudRepository<InMemoryBlackListToken, String> {
    void removeAllByAddingDateBefore(Date date);
}
