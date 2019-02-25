package com.lingvi.lingviserver.security.entities;

/**
 * Used to proceed registration throw social with already received access tokem
 */
public class OAuthRequestWithToken {

    private String accessToken;

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }
}
