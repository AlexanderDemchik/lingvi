package com.lingvi.lingviserver.security.config;

import com.lingvi.lingviserver.security.entities.BaseProvider;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
@ConfigurationProperties(prefix = "providers")
public class ProvidersProperties {

    @Component
    @ConfigurationProperties(prefix = "providers.google")
    public static class Google extends BaseProvider {
    }
}
