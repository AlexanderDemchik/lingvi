package com.lingvi.lingviserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.http.converter.ByteArrayHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@SpringBootApplication
@EnableScheduling
@EnableCaching
@EnableJpaAuditing
public class LingviServerApplication {

    public static void main(String[] args) {
        ApplicationContext context = SpringApplication.run(LingviServerApplication.class, args);
    }

    @Bean
    public RestTemplate restTemplate(List<HttpMessageConverter<?>> messageConverters) {
        return new RestTemplate(messageConverters);
    }

    @Bean
    public ByteArrayHttpMessageConverter byteArrayHttpMessageConverter() {
        return new ByteArrayHttpMessageConverter();
    }
}

