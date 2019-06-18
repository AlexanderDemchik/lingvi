package com.lingvi.lingviserver.account.services;

import com.lingvi.lingviserver.account.entities.Settings;
import com.lingvi.lingviserver.account.entities.primary.User;
import com.lingvi.lingviserver.account.repositories.primary.UserRepository;
import com.lingvi.lingviserver.commons.entities.Language;
import com.lingvi.lingviserver.commons.exceptions.ApiError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class AccountService {

    private Logger logger = LoggerFactory.getLogger(AccountService.class);
    private UserRepository userRepository;

    public AccountService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Settings getSettings(Long userId) {
        User account;
        System.out.println(LocaleContextHolder.getLocale());
        if ((account = userRepository.findById(userId).orElse(null)) == null) throw new ApiError("Account with id " + userId + " not found", HttpStatus.NOT_FOUND);

        return new Settings(account.getTranslationLanguage(), account.getUiLanguage());
    }

    public Settings updateI18nSettings(Long userId, Settings settings) {
        final List supportedTranslationLanguages = Arrays.asList(Language.RU, Language.FR, Language.UA);
        final List supportedUiLanguages = Arrays.asList(Language.RU, Language.EN, Language.FR);
        User account;
        if ((account = userRepository.findById(userId).orElse(null)) == null) throw new ApiError("Account with id " + userId + " not found", HttpStatus.NOT_FOUND);

        if (settings.getTranslationLanguage() != null) {
            if(!supportedTranslationLanguages.contains(settings.getTranslationLanguage())) throw new ApiError("Unsupported translation language", HttpStatus.BAD_REQUEST);
            account.setTranslationLanguage(settings.getTranslationLanguage());
        }

        if (settings.getUiLanguage() != null) {
            if(!supportedUiLanguages.contains(settings.getUiLanguage())) throw new ApiError("Unsupported ui language", HttpStatus.BAD_REQUEST);
            account.setUiLanguage(settings.getUiLanguage());
        }

        userRepository.save(account);
        return new Settings(account.getTranslationLanguage(), account.getUiLanguage());
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
