package com.lingvi.lingviserver.dictionary.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@ConfigurationProperties(prefix = "dictionary.api.yandex")
public class YandexTranslationApiProperties {

    @Component
    @ConfigurationProperties(prefix = "dictionary.api.yandex.translate")
    public static class Translate {
        private String apiKey;
        private String url;

        public String getApiKey() {
            return apiKey;
        }

        public String getUrl() {
            return url;
        }

        public void setApiKey(String apiKey) {
            this.apiKey = apiKey;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }

    @Component
    @ConfigurationProperties(prefix = "dictionary.api.yandex.dictionary")
    public static class Dictionary {
        private String apiKey;
        private String url;

        public String getApiKey() {
            return apiKey;
        }

        public String getUrl() {
            return url;
        }

        public void setApiKey(String apiKey) {
            this.apiKey = apiKey;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
