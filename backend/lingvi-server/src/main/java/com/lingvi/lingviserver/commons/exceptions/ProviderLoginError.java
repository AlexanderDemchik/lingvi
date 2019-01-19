package com.lingvi.lingviserver.commons.exceptions;

public class ProviderLoginError extends ApiSubError {

    private String accessToken;
    private String expireIn;
    private String provider;

    public ProviderLoginError(String code, String accessToken, String expireIn, String provider) {
        this.setCode(code);
        this.accessToken = accessToken;
        this.expireIn = expireIn;
        this.provider = provider;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getExpireIn() {
        return expireIn;
    }

    public void setExpireIn(String expireIn) {
        this.expireIn = expireIn;
    }

    public String getProvider() {
        return provider;
    }

    public void setProvider(String provider) {
        this.provider = provider;
    }
}
