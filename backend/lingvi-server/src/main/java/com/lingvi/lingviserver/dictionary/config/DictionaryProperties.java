package com.lingvi.lingviserver.dictionary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "dictionary")
public class DictionaryProperties {

    private String espeakPath;

    public String getEspeakPath() {
        return espeakPath;
    }

    public void setEspeakPath(String espeakPath) {
        this.espeakPath = espeakPath;
    }
}
