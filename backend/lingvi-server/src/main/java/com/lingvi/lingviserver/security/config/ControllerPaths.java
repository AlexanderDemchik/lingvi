package com.lingvi.lingviserver.security.config;

/**
 * Contains constant paths for controller
 */
public class ControllerPaths {
    public final static String LOGIN = "/login";
    public final static String REGISTER = "/register";
    public final static String SOCIAL_LOGIN = LOGIN + "/{provider}";
    public final static String SOCIAL_REGISTER = REGISTER + "/{provider}";
    public final static String REFRESH_TOKEN = "/token/refresh";
    public final static String ME = "/me";
    public final static String SOCIAL_REGISTER_WITH_ACCESS_TOKEN = REGISTER + "/{provider}/token";
}
