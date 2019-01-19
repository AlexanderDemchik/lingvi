package com.lingvi.lingviserver.commons.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@SuppressWarnings("SpringFacetCodeInspection")
@Configuration
@ConfigurationProperties(prefix = "security")
public class SecurityProperties {

    private String tokenPrefix;
    private String tokenHeaderString;
    private String tokenSecret;
    private long tokenLifeTime;
    private long refreshTokenLifeTime;
    private String claimsRoleField;

    public String getTokenPrefix() {
        return tokenPrefix;
    }

    public void setTokenPrefix(String tokenPrefix) {
        this.tokenPrefix = tokenPrefix;
    }

    public String getTokenHeaderString() {
        return tokenHeaderString;
    }

    public void setTokenHeaderString(String tokenHeaderString) {
        this.tokenHeaderString = tokenHeaderString;
    }

    public String getTokenSecret() {
        return tokenSecret;
    }

    public void setTokenSecret(String tokenSecret) {
        this.tokenSecret = tokenSecret;
    }

    public long getTokenLifeTime() {
        return tokenLifeTime;
    }

    public void setTokenLifeTime(String tokenLifeTime) {
        this.tokenLifeTime = Long.valueOf(tokenLifeTime.substring(0, tokenLifeTime.length() - 1));
    }

    public long getRefreshTokenLifeTime() {
        return refreshTokenLifeTime;
    }

    public void setRefreshTokenLifeTime(String refreshTokenLifeTime) {
        this.refreshTokenLifeTime = Long.valueOf(refreshTokenLifeTime.substring(0, refreshTokenLifeTime.length() - 1));
    }

    public String getClaimsRoleField() {
        return claimsRoleField;
    }

    public void setClaimsRoleField(String claimsRoleField) {
        this.claimsRoleField = claimsRoleField;
    }
}
