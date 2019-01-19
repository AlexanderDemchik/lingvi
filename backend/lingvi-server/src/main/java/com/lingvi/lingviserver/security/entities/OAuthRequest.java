package com.lingvi.lingviserver.security.entities;

/**
 * Model of user request to login or register throw social networks(facebook, vk, etc..) that contains authorization code and redirect_uri for oauth authorization code flow
 */
public class OAuthRequest {

    private String code;
    private String redirectUri;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRedirectUri() {
        return redirectUri;
    }

    public void setRedirectUri(String redirectUri) {
        this.redirectUri = redirectUri;
    }
}
