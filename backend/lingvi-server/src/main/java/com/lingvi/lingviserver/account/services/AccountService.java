package com.lingvi.lingviserver.account.services;

import com.lingvi.lingviserver.account.repositories.primary.AccountRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService {

    private Logger logger = LoggerFactory.getLogger(AccountService.class);
    private AccountRepository accountRepository;

    /**
     * @param accountRepository {@link AccountRepository}
     */
    @Autowired
    public AccountService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }
}
