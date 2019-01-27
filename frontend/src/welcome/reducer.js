import {CLOSE_LOGIN_FORM, CLOSE_REGISTER_FORM, OPEN_LOGIN_FORM, OPEN_REGISTER_FORM} from "./actions";

const initialState = {
  loginForm: {
    open: false
  },
  registerForm: {
    open: false
  }
};

export const welcomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_FORM: return {...state, loginForm: {...state.loginForm, open: true}};
    case CLOSE_LOGIN_FORM: return {...state, loginForm: {...state.loginForm, open: false}};
    case OPEN_REGISTER_FORM: return {...state, registerForm: {...state.registerForm, open: true}};
    case CLOSE_REGISTER_FORM: return {...state, registerForm: {...state.registerForm, open: false}};
    default: return state;
  }
};