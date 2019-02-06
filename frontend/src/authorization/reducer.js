import {
  CHANGE_AUTH_STATE, CHANGE_REFRESH_STATE, EXIT, LOGIN_REQUEST, LOGIN_REQUEST_ERROR, LOGIN_REQUEST_SUCCESS,
  REFRESH_REQUEST,
  REFRESH_REQUEST_ERROR,
  REFRESH_REQUEST_SUCCESS,
  REGISTER_REQUEST, REGISTER_REQUEST_ERROR, REGISTER_REQUEST_SUCCESS
} from "./actions";

let initialState = {
  logged: false,
  userId: null,
  isRefreshing: false,
  login: {
    isLoginRequest: false,
  },
  register: {
    isRegisterRequest: false,
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return {...state, login: {...state.login, isLoginRequest: true}};
    case LOGIN_REQUEST_SUCCESS: return {...state, logged: true, login: {...state.login, isLoginRequest: false}};
    case LOGIN_REQUEST_ERROR: return {...state, login: {...state.login, isLoginRequest: false}}; 
    case REGISTER_REQUEST: return {...state, register: {...state.register, isRegisterRequest: true}};
    case REGISTER_REQUEST_SUCCESS: return {...state, logged: true, register: {...state.register, isRegisterRequest: false}};
    case REGISTER_REQUEST_ERROR: return {...state, register: {...state.register, isRegisterRequest: false}};
    case CHANGE_AUTH_STATE:
      return {
        ...state, logged: action.state
      };
    case REFRESH_REQUEST: return {...state, isRefreshing: true};
    case REFRESH_REQUEST_SUCCESS: return {...state, isRefreshing: false};
    case REFRESH_REQUEST_ERROR: return {...state, isRefreshing: false};
    case CHANGE_REFRESH_STATE:
      return {
        ...state, isRefreshing: action.state
      };
    case EXIT: return {...state, logged: false, userId: null};
    default: return state;
  }
};

export default authReducer;