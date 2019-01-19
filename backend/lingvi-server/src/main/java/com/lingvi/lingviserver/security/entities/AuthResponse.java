package com.lingvi.lingviserver.security.entities;

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

    public AuthResponse(Long expireIn, String token, String refreshToken) {
        this.expireIn = expireIn;
        this.token = token;
        this.refreshToken = refreshToken;
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
}
