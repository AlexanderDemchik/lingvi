import {ROOT} from "./api";

/*Common constants*/

export const GOOGLE = "google";
export const PROJECT_NAME = "lingvi";

export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const providerRegisterWithTokenPath = (provider) => (
  `${REGISTER_PATH}/${provider}/token`
);

export const REFRESH_PATH = "/token/refresh";
export const ME_PATH = "/me";

export const TOKEN_FIELD = "token";
export const REFRESH_TOKEN_FIELD = "refreshToken";
export const EXPIRE_IN_FIELD = "expireIn";

export const VK_LOGIN_REF = "https://oauth.vk.com/authorize?client_id=6656636&display=page&redirect_uri=http://localhost:3000/login/vk&scope=email&response_type=code&v=5.80";
export const VK_REGISTER_REF = `https://oauth.vk.com/authorize?client_id=6656636&display=page&redirect_uri=${ROOT}/register/vk&scope=email&response_type=code&v=5.80`;
export const GOOGLE_LOGIN_REF = "https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&redirect_uri=http://localhost:3000/login/google&response_type=code&client_id=594971830551-lq21v3eoggpf1amdjslu4f822o19of9c.apps.googleusercontent.com";
export const GOOGLE_REGISTER_REF = `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email&access_type=offline&include_granted_scopes=true&redirect_uri=${ROOT}/register/google&response_type=code&client_id=594971830551-lq21v3eoggpf1amdjslu4f822o19of9c.apps.googleusercontent.com`;

//error codes
export const PROVIDER_LOGIN_EXCEPTION = "PROVIDER_LOGIN_EXCEPTION";
export const VALIDATION_EXCEPTION = "VALIDATION_EXCEPTION";
export const USER_NOT_FOUND = "USER_NOT_FOUND";

export const LANGUAGES = {
  EN: "EN",
  RU: "RU",
  UA: "UA"
};