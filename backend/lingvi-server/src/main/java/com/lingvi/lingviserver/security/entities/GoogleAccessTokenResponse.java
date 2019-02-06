package com.lingvi.lingviserver.security.entities;

import com.fasterxml.jackson.annotation.JsonSetter;

import java.util.Date;

/**
 * @see BaseAccessTokenResponse
 */
public class GoogleAccessTokenResponse extends BaseAccessTokenResponse {

    public GoogleAccessTokenResponse() {
    }

    public GoogleAccessTokenResponse(String accessToken, String expiresIn) {
        super(accessToken, expiresIn);
    }

    @Override
    @JsonSetter("access_token")
    public void setAccessToken(String accessToken) {
        super.setAccessToken(accessToken);
    }

    @Override
    @JsonSetter("expires_in")
    public void setExpireIn(String expireIn) {
        super.setExpireIn(String.valueOf(new Date().getTime() + Integer.parseInt(expireIn) * 1000));
    }
}
