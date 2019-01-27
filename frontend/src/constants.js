/*Common constants*/
export const ROOT = "http://localhost:3000";
export const API_ROOT = "http://localhost:8080";
export const PROJECT_NAME = "lingvi";

export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";

export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_ERROR = "REGISTER_ERROR";

export const TOKEN_FIELD = "token";
export const REFRESH_TOKEN_FIELD = "refreshToken";
export const EXPIRE_IN_FIELD = "expireIn";

export const CHANGE_AUTH_STATE = "CHANGE_AUTH_STATE";
export const CHANGE_REFRESH_STATE = "CHANGE_REFRESH_STATE";

export const VK_LOGIN_REF = "https://oauth.vk.com/authorize?client_id=6656636&display=page&redirect_uri=http://localhost:3000/login/vk&scope=email&response_type=code&v=5.80";
export const VK_REGISTER_REF = "https://oauth.vk.com/authorize?client_id=6656636&display=page&redirect_uri="+ROOT+"/register/vk&scope=email&response_type=code&v=5.80";
export const GOOGLE_LOGIN_REF = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&redirect_uri=http://localhost:3000/login/google&response_type=code&client_id=594971830551-lq21v3eoggpf1amdjslu4f822o19of9c.apps.googleusercontent.com";
export const GOOGLE_REGISTER_REF = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&redirect_uri="+ROOT+"/register/google&response_type=code&client_id=594971830551-lq21v3eoggpf1amdjslu4f822o19of9c.apps.googleusercontent.com";