package com.lingvi.lingviserver.dictionary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "dictionary.api.systran")
public class SystranProperties {

    private String apiKey;
    private String translateUrl;
    private String dictionaryUrl;
    private String lemmaUrl;

    public String getApiKey() {
        return apiKey;
    }

    public void setApiKey(String apiKey) {
        this.apiKey = apiKey;
    }

    public String getTranslateUrl() {
        return translateUrl;
    }

    public void setTranslateUrl(String translateUrl) {
        this.translateUrl = translateUrl;
    }

    public String getDictionaryUrl() {
        return dictionaryUrl;
    }

    public void setDictionaryUrl(String dictionaryUrl) {
        this.dictionaryUrl = dictionaryUrl;
    }

    public String getLemmaUrl() {
        return lemmaUrl;
    }

    public void setLemmaUrl(String lemmaUrl) {
        this.lemmaUrl = lemmaUrl;
    }
}
