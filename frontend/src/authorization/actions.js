import axios from "axios";
import history from "../history"
import {
  API_ROOT, CHANGE_AUTH_STATE, EXPIRE_IN_FIELD, LOGIN_ERROR, LOGIN_PATH, LOGIN_REQUEST, LOGIN_SUCCESS,
  REFRESH_TOKEN_FIELD,
  REGISTER_ERROR, REGISTER_PATH,
  REGISTER_REQUEST, REGISTER_SUCCESS, TOKEN_FIELD
} from "../constants";

export function login(email, password) {
  return function (dispatch) {
    dispatch({type: LOGIN_REQUEST});
    return axios.post(API_ROOT+LOGIN_PATH, {email: email, password: password})
      .then(r => {
        dispatch({type: LOGIN_SUCCESS});
        dispatch(changeAuthState(true));
        fillAuthLocalStorage(r.data);
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({type: LOGIN_ERROR});
      })
  }
}

export function socialLogin(provider, code) {
  return function (dispatch) {
    dispatch({type: LOGIN_REQUEST});
    return axios.post(API_ROOT+LOGIN_PATH+"/"+provider, {code: code})
      .then(r => {
        dispatch({type: LOGIN_SUCCESS});
        fillAuthLocalStorage(r.data);
        dispatch(changeAuthState(true));
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({type: LOGIN_ERROR});
      })
  }
}

export function register(email, password) {
  return function (dispatch) {
    dispatch({type: REGISTER_REQUEST});
    return axios.post(API_ROOT+REGISTER_PATH, {email: email, password: password})
      .then(r => {
        dispatch({type: REGISTER_SUCCESS});
        fillAuthLocalStorage(r.data);
        dispatch(changeAuthState(true));
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({type: REGISTER_ERROR});
      })
  }
}

export function socialRegister(provider, code) {
  return function (dispatch) {
    dispatch({type: REGISTER_REQUEST});
    return axios.post(API_ROOT+REGISTER_PATH+"/"+provider, {code: code})
      .then(r => {
        dispatch({type: REGISTER_SUCCESS});
        fillAuthLocalStorage(r.data);
        dispatch(changeAuthState(true));
        history.push("/dashboard");
      })
      .catch(err => {
        dispatch({type: REGISTER_ERROR});
      })
  }
}

export function changeAuthState(state) {
  if(state === false) clearAuthLocalStorage();
  return {
    type: CHANGE_AUTH_STATE,
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