package com.lingvi.lingviserver.security.entities;

/**
 * Abstract class with provider fields
 */
public abstract class BaseProvider {

    /**
     * Provider client id
     */
    private String clientId;

    /**
     * Provider client secret
     */
    private String clientSecret;

    /**
     * Provider access token
     */
    private String accessTokenUri;

    /**
     * Provider uri to fetch user info
     */
    private String userInfoUri;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getAccessTokenUri() {
        return accessTokenUri;
    }

    public void setAccessTokenUri(String accessTokenUri) {
        this.accessTokenUri = accessTokenUri;
    }

    public String getUserInfoUri() {
        return userInfoUri;
    }

    public void setUserInfoUri(String userInfoUri) {
        this.userInfoUri = userInfoUri;
    }
}
