package com.lingvi.lingviserver.account.controllers;

import com.lingvi.lingviserver.account.entities.Settings;
import com.lingvi.lingviserver.account.entities.primary.User;
import com.lingvi.lingviserver.account.services.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static com.lingvi.lingviserver.commons.utils.Utils.getUserId;

@RestController
@RequestMapping("/account")
public class AccountController {

    private AccountService accountService;

    /**
     * @param accountService {@link AccountService}
     */
    @Autowired
    public AccountController(AccountService accountService) {
        this.accountService = accountService;
    }

    @GetMapping("/settings")
    public Settings getSettings() {
        return accountService.getSettings(getUserId());
    }

    @PutMapping("settings/i18n")
    public Settings updateI18nSettings(@RequestBody Settings settings) {
        return accountService.updateI18nSettings(getUserId(), settings);
    }

    @GetMapping
    public List<User> getUsers() {
        return accountService.getAllUsers();
    }

}
