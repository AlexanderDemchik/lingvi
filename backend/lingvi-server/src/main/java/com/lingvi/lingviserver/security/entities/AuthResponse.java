package com.lingvi.lingviserver.security.entities;

import com.lingvi.lingviserver.account.entities.primary.User;

/**
 * Model that will return to user after successfully login and register.
 */
public class AuthResponse {

    /**
     * Expiration date of token
     */
    private Long expireIn;

    /**
     * Jwt token
     */
    private String token;

    /**
     * Jwt refresh token
     */
    private String refreshToken;

    private User account;

    public AuthResponse(Long expireIn, String token, String refreshToken) {
        this.expireIn = expireIn;
        this.token = token;
        this.refreshToken = refreshToken;
    }

    public AuthResponse(Long expireIn, String token, String refreshToken, User account) {
        this.expireIn = expireIn;
        this.token = token;
        this.refreshToken = refreshToken;
        this.account = account;
    }

    public Long getExpireIn() {
        return expireIn;
    }

    public void setExpireIn(Long expireIn) {
        this.expireIn = expireIn;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public User getAccount() {
        return account;
    }

    public void setAccount(User account) {
        this.account = account;
    }
}
