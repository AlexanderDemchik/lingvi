package com.lingvi.lingviserver.security.entities;

import com.fasterxml.jackson.annotation.JsonSetter;

/**
 * @see BaseAccessTokenResponse
 */
public class GoogleAccessTokenResponse extends BaseAccessTokenResponse {

    @Override
    @JsonSetter("access_token")
    public void setAccessToken(String accessToken) {
        super.setAccessToken(accessToken);
    }

    @Override
    @JsonSetter("expires_in")
    public void setExpireIn(String expireIn) {
        super.setExpireIn(expireIn);
    }
}
