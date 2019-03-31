package com.lingvi.lingviserver.dictionary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "dictionary.api.azure.cognitive-services.image-search")
public class BingSearchProperties {

    private String apiKey;
    private String searchUrl;
    private String authorizationHeaderName;

    public String getApiKey() {
        return apiKey;
    }

    public String getSearchUrl() {
        return searchUrl;
    }

    public String getAuthorizationHeaderName() {
        return authorizationHeaderName;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public void setSearchUrl(String searchUrl) {
        this.searchUrl = searchUrl;
    }

    public void setAuthorizationHeaderName(String authorizationHeaderName) {
        this.authorizationHeaderName = authorizationHeaderName;
    }
}
