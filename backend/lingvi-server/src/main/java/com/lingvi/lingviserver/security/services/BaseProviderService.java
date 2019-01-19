package com.lingvi.lingviserver.security.services;

import com.lingvi.lingviserver.security.entities.BaseAccessTokenResponse;
import com.lingvi.lingviserver.security.entities.ProviderUser;
import org.springframework.http.HttpEntity;
import org.springframework.util.MultiValueMap;

/**
 * Interface with provider methods
 */
public interface BaseProviderService {

    /**
     * Get access token from auth provider throw authorization code flow
     *
     * @param code authorization code
     * @param redirectUri redirectUri which we used to obtain code
     * @return {@link BaseAccessTokenResponse} implementation
     */
    BaseAccessTokenResponse getAccessToken(String code, String redirectUri);

    /**
     * Load user data from auth provider
     *
     * @param accessToken access token
     * @return user data
     */
    ProviderUser loadUser(String accessToken);

    /**
     * Helper method to build HttpEntity with necessary request params and header to get access token from provider
     *
     * @param code authorization code
     * @param redirectUri redirect uri bounded to code
     * @return HttpEntity with MultiValueMap that contains necessary request params
     */
    HttpEntity<MultiValueMap<String, String>> buildAccessTokenRequest(String code, String redirectUri);
}
