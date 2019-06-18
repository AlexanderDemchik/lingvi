import api from "../api";
import history from "../history"
import {
  EXPIRE_IN_FIELD, LOGIN_PATH, ME_PATH, PROVIDER_LOGIN_EXCEPTION, providerRegisterWithTokenPath, REFRESH_PATH,
  REFRESH_TOKEN_FIELD, REGISTER_PATH, TOKEN_FIELD, USER_NOT_FOUND, VALIDATION_EXCEPTION
} from "../constants";
import {
  closeCreateAccountForm, openCreateAccountForm, resetToInitial, setLoginFormErrorState,
  setRegisterFormErrors
} from "../welcome/actions";
import {setSettings} from "../settings/actions";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "LOGIN_REQUEST_SUCCESS";
export const LOGIN_REQUEST_ERROR = "LOGIN_REQUEST_ERROR";
export const REGISTER_REQUEST = "REGISTER_REQUEST";
export const REGISTER_REQUEST_SUCCESS = "REGISTER_REQUEST_SUCCESS";
export const REGISTER_REQUEST_ERROR = "REGISTER_REQUEST_ERROR";
export const CHANGE_AUTH_STATE = "CHANGE_AUTH_STATE";
export const CHANGE_REFRESH_STATE = "CHANGE_REFRESH_STATE";
export const REFRESH_REQUEST = "REFRESH_REQUEST";
export const REFRESH_REQUEST_SUCCESS = "REFRESH_REQUEST_SUCCESS";
export const REFRESH_REQUEST_ERROR = "REFRESH_REQUEST_ERROR";
export const EXIT = "EXIT";

export function socialLogin(provider, code, redirect_uri) {
  return function (dispatch) {
    dispatch({type: LOGIN_REQUEST});
    return api.post(LOGIN_PATH+"/"+provider, {code: code, redirectUri: redirect_uri})
      .then(r => {
        fillAuthLocalStorage(r.data);
        dispatch({type: LOGIN_REQUEST_SUCCESS});
        history.replace("/");
      })
      .catch(err => {
        dispatch({type: LOGIN_REQUEST_ERROR});
        history.replace("/");
        const errBody = err.response.data;
        if(errBody.code === PROVIDER_LOGIN_EXCEPTION && errBody.errors && errBody.errors[0].code === USER_NOT_FOUND) {
          dispatch(openCreateAccountForm(errBody.errors[0].accessToken, errBody.errors[0].expireIn, errBody.errors[0].provider));
        }
      })
  }
}

export const login = (email, password) => {
  return dispatch => {
    dispatch({type: LOGIN_REQUEST});
    api.post(LOGIN_PATH, {email: email, password: password})
      .then(r => {
        fillAuthLocalStorage(r.data);
        dispatch(setSettings(r.data.account));
        dispatch(resetToInitial());
        dispatch({type: LOGIN_REQUEST_SUCCESS});
      })
      .catch(err => {
        dispatch({type: LOGIN_REQUEST_ERROR});
        dispatch(setLoginFormErrorState(true));
      });
  };
};


export const register = (email, password, name = "", surname = "") => {
  return dispatch => {
    dispatch({type: REGISTER_REQUEST});
    api.post( REGISTER_PATH, {email: email, password: password, name: name, surname: surname})
      .then(r => {
        dispatch(setSettings(r.data.account));
        fillAuthLocalStorage(r.data);
        dispatch(resetToInitial());
        dispatch({type: REGISTER_REQUEST_SUCCESS});
      })
      .catch(err => {
        dispatch({type: REGISTER_REQUEST_ERROR});
        console.log(err.response);
        console.log(err);
        console.log(err.response.data)
        if(err.response.data.code === VALIDATION_EXCEPTION) {

         let emailErrors = [];
         let passwordErrors = [];
         let nameErrors = [];
         let surnameErrors = [];

          err.response.data.errors.forEach(e => {
            switch (e.field) {
              case "email":
                emailErrors.push(e.message);
                break;
              case "password":
                passwordErrors.push(e.message);
                break;
              case "name":
                nameErrors.push(e.message);
                break;
              case "surname":
                surnameErrors.push(e.message);
                break;
              default:
            }
          });

          dispatch(setRegisterFormErrors(emailErrors, passwordErrors, nameErrors, surnameErrors));
        }
      });
  };
};

export function socialRegister(provider, code, redirect_uri) {
  return function (dispatch) {
    dispatch({type: REGISTER_REQUEST});
    return api.post(REGISTER_PATH+"/"+provider, {code: code, redirectUri: redirect_uri})
      .then(r => {
        fillAuthLocalStorage(r.data);
        dispatch({type: REGISTER_REQUEST_SUCCESS});
        history.replace("/");
      })
      .catch(err => {
        dispatch({type: REGISTER_REQUEST_ERROR});
      })
  }
}

export function refresh(token) {
  return function (dispatch) {
    dispatch({type: REFRESH_REQUEST});
    return api.post( REFRESH_PATH, {refreshToken: token})
      .then(r => {
        fillAuthLocalStorage(r.data);
        dispatch({type: REFRESH_REQUEST_SUCCESS});
      })
      .catch(err => {
        clearAuthLocalStorage();
        dispatch({type: REFRESH_REQUEST_ERROR});
      })
  }
}

export const providerRegisterWithToken = (token, provider) => (
  (dispatch) => {
    dispatch({type: REGISTER_REQUEST});
    return api.post( providerRegisterWithTokenPath(provider), {accessToken: token})
      .then(r => {
        fillAuthLocalStorage(r.data);
        dispatch(closeCreateAccountForm());
        dispatch({type: REGISTER_REQUEST_SUCCESS});
      })
      .catch(err => {
        dispatch({type: REGISTER_REQUEST_ERROR});
      })
  }
);

export const exit = () => (
  (dispatch) => {
    clearAuthLocalStorage();
    dispatch({type: EXIT});
    history.push("/");
  }
);


export const me = () => (dispatch) => {
  return api.get(ME_PATH).then(r => {
    dispatch(setSettings(r.data));
    return new Promise(resolve => resolve(r));
  });
};

export function changeAuthState(state) {
  if(state === false) clearAuthLocalStorage();
  return {
    type: CHANGE_AUTH_STATE,
    state: state
  }
}

export function changeRefreshState(state) {
  return {
    type: CHANGE_REFRESH_STATE,
    state: state
  }
}

export function fillAuthLocalStorage(obj) {
  localStorage.setItem(TOKEN_FIELD, obj[TOKEN_FIELD]);
  localStorage.setItem(REFRESH_TOKEN_FIELD, obj[REFRESH_TOKEN_FIELD]);
  localStorage.setItem(EXPIRE_IN_FIELD, obj[EXPIRE_IN_FIELD]);
}

export function clearAuthLocalStorage() {
  localStorage.removeItem(TOKEN_FIELD);
  localStorage.removeItem(REFRESH_TOKEN_FIELD);
  localStorage.removeItem(EXPIRE_IN_FIELD);
}