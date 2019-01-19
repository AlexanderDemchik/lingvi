package com.lingvi.lingviserver.account.repositories.primary;

import com.lingvi.lingviserver.account.entities.primary.Account;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccountRepository extends CrudRepository<Account, Long> {
}
