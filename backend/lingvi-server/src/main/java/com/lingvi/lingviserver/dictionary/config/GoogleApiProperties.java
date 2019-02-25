package com.lingvi.lingviserver.dictionary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "dictionary.api.google")
public class GoogleApiProperties {

    private String apiKey;
    private String textToSpeechUrl;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getTextToSpeechUrl() {
        return textToSpeechUrl;
    }

    public void setTextToSpeechUrl(String textToSpeechUrl) {
        this.textToSpeechUrl = textToSpeechUrl;
    }
}
