package com.lingvi.lingviserver.security.config;

public class Constants {
    public final static long ALLOWED_REFRESH_TOKEN_REJECTION_TIME = 60000;
    public final static String[] SWAGGER_PATHS = {
            "/v2/api-docs",
            "/swagger-resources",
            "/swagger-resources/**",
            "/configuration/ui",
            "/configuration/security",
            "/swagger-ui.html",
            "/webjars/**"
    };
    public final static String H2_DB_PATH = "/h2/**";
}
