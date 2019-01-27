package com.lingvi.lingviserver.security.repositories.inmemory;

import com.lingvi.lingviserver.security.entities.inmemory.InMemoryBlackListToken;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;

public interface InMemoryBlackListRepository extends CrudRepository<InMemoryBlackListToken, String> {
    void removeAllByAddingDateBefore(Date date);
}
