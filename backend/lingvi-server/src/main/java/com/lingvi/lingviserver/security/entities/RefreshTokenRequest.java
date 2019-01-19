package com.lingvi.lingviserver.security.entities;

public class RefreshTokenRequest {

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    private String refreshToken;
}
