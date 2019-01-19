package com.lingvi.lingviserver.security.config;

/**
 * Contains constant paths for controller
 */
public class ControllerPaths {
    public final static String LOGIN = "/login";
    public final static String REGISTER = "/register";
    public final static String SOCIAL_LOGIN = "/login/{provider}";
    public final static String SOCIAL_REGISTER = "/register/{provider}";
    public final static String REFRESH_TOKEN = "/token/refresh";
}
