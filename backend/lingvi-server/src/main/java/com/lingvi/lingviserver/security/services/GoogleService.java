package com.lingvi.lingviserver.security.services;

import com.lingvi.lingviserver.commons.exceptions.ApiError;
import com.lingvi.lingviserver.security.config.ProvidersProperties;
import com.lingvi.lingviserver.security.entities.BaseAccessTokenResponse;
import com.lingvi.lingviserver.security.entities.GoogleAccessTokenResponse;
import com.lingvi.lingviserver.security.entities.GoogleUser;
import com.lingvi.lingviserver.security.entities.ProviderUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

/**
 * Google provider implementation
 * @see BaseProviderService
 */
@Service
public class GoogleService implements BaseProviderService {

    private ProvidersProperties.Google properties;

    @Autowired
    public GoogleService(ProvidersProperties.Google properties) {
        this.properties = properties;
    }

    @Override
    public BaseAccessTokenResponse getAccessToken(String code, String redirectUri) {
        RestTemplate restTemplate = new RestTemplate();

        HttpEntity<MultiValueMap<String, String>> httpEntity = buildAccessTokenRequest(code, redirectUri);
        ResponseEntity<GoogleAccessTokenResponse> response;

        try {
            response = restTemplate.exchange(properties.getAccessTokenUri(), HttpMethod.POST, httpEntity, GoogleAccessTokenResponse.class);
        } catch (HttpClientErrorException e) {
            throw new ApiError(e.getResponseBodyAsString(), HttpStatus.BAD_REQUEST);
        }

        if(response.getBody() != null) {
            return response.getBody();
        }
        return null;
    }

    @Override
    public ProviderUser loadUser(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();

        UriComponentsBuilder builder = UriComponentsBuilder.fromUriString(properties.getUserInfoUri());
        builder.queryParam("access_token", accessToken).build();

        ResponseEntity<GoogleUser> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, null, GoogleUser.class);

        return response.getBody();
    }

    @Override
    public HttpEntity<MultiValueMap<String, String>> buildAccessTokenRequest(String code, String redirectUri) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, String> map = new LinkedMultiValueMap<String, String>() {};
        map.add("grant_type", "authorization_code");
        map.add("client_id", properties.getClientId());
        map.add("client_secret", properties.getClientSecret());
        map.add("code", code);
        map.add("redirect_uri", redirectUri);

        return new HttpEntity<>(map, headers);
    }
}
