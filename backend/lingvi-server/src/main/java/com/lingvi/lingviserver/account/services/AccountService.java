package com.lingvi.lingviserver.account.services;

import com.lingvi.lingviserver.account.entities.Settings;
import com.lingvi.lingviserver.account.entities.primary.Account;
import com.lingvi.lingviserver.account.repositories.primary.AccountRepository;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

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

    public Settings getSettings(Long userId) {
        Account account;
        if ((account = accountRepository.findById(userId).orElse(null)) == null) throw new ApiError("Account with id " + userId + " not found", HttpStatus.NOT_FOUND);

        return new Settings(account.getTranslationLanguage(), account.getUiLanguage());
    }

    public Settings updateI18nSettings(Long userId, Settings settings) {
        final List supportedTranslationLanguages = Arrays.asList(Language.RU, Language.FR, Language.UA);
        final List supportedUiLanguages = Arrays.asList(Language.RU, Language.EN, Language.FR);
        logger.error(settings.getTranslationLanguage().toString());
        Account account;
        if ((account = accountRepository.findById(userId).orElse(null)) == null) throw new ApiError("Account with id " + userId + " not found", HttpStatus.NOT_FOUND);

        if (settings.getTranslationLanguage() != null) {
            if(!supportedTranslationLanguages.contains(settings.getTranslationLanguage())) throw new ApiError("Unsupported translation language", HttpStatus.BAD_REQUEST);
            account.setTranslationLanguage(settings.getTranslationLanguage());
        }

        if (settings.getUiLanguage() != null) {
            if(!supportedUiLanguages.contains(settings.getUiLanguage())) throw new ApiError("Unsupported ui language", HttpStatus.BAD_REQUEST);
            account.setUiLanguage(settings.getUiLanguage());
        }

        accountRepository.save(account);
        return new Settings(account.getTranslationLanguage(), account.getUiLanguage());
    }
}
