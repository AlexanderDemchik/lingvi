package com.lingvi.lingviserver.security.entities;

/**
 * Model of request to refresh token
 */
public class RefreshTokenRequest {

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    private String refreshToken;
}
