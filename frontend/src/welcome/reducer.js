import {
  CLOSE_CREATE_ACCOUNT_FORM,
  CLOSE_LOGIN_FORM, CLOSE_REGISTER_FORM, CLOSE_RESTORE_FORM, OPEN_CREATE_ACCOUNT_FORM, OPEN_LOGIN_FORM,
  OPEN_REGISTER_FORM, OPEN_RESTORE_FORM, RESET_TO_INITIAL, SET_LOGIN_FORM_ERROR, SET_REGISTER_FORM_ERRORS
} from "./actions";

const initialState = {
  loginForm: {
    open: false,
    isError: false
  },
  registerForm: {
    open: false,
    emailErrors: [],
    passwordErrors: [],
    nameErrors: [],
    surnameErrors: []
  },
  createAccountForm: {
    open: false,
    accessToken: "",
    expireIn: "",
    provider: ""
  },
  restoreForm: {
    open: false,
  }
};

export const welcomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LOGIN_FORM: return {...state, loginForm: {...state.loginForm, open: true}};
    case CLOSE_LOGIN_FORM: return {...state, loginForm: initialState.loginForm};
    case SET_LOGIN_FORM_ERROR: return {...state, loginForm: {...state.loginForm, isError: action.state}};
    case OPEN_REGISTER_FORM: return {...state, registerForm: {...state.registerForm, open: true}};
    case CLOSE_REGISTER_FORM: return {...state, registerForm: initialState.registerForm};
    case OPEN_CREATE_ACCOUNT_FORM: return {...state, createAccountForm: {...state.createAccountForm, open: true,
        accessToken: action.accessToken, expireIn: action.expireIn, provider: action.provider}};
    case CLOSE_CREATE_ACCOUNT_FORM: return {...state, createAccountForm: {...state.createAccountForm, open: false,
        accessToken: "", provider: "", expireIn: ""}};
    case SET_REGISTER_FORM_ERRORS: return {...state, registerForm: {...state.registerForm, emailErrors: action.emailErrors, passwordErrors: action.passwordErrors,
        nameErrors: action.nameErrors, surnameErrors: action.surnameErrors}};
    case OPEN_RESTORE_FORM: return {...state, restoreForm: {...state.restoreForm, open: true}};
    case CLOSE_RESTORE_FORM: return {...state, restoreForm: {...state.restoreForm, open: false}};
    case RESET_TO_INITIAL: return initialState;
    default: return state;
  }
};