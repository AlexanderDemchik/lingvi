package com.lingvi.lingviserver.security.entities;


/**
 * Model of response from provider access token endpoint
 */
public abstract class BaseAccessTokenResponse {

    private String accessToken;
    private String expiresIn;

    public BaseAccessTokenResponse() {
    }

    public BaseAccessTokenResponse(String accessToken, String expiresIn) {
        this.accessToken = accessToken;
        this.expiresIn = expiresIn;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
            this.accessToken = accessToken;
        }

    public String getExpireIn() {
        return expiresIn;
    }

    public void setExpireIn(String expireIn) {
        this.expiresIn = expireIn;
    }
}

