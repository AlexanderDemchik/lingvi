export const OPEN_LOGIN_FORM = "OPEN_LOGIN_FORM";
export const CLOSE_LOGIN_FORM = "CLOSE_LOGIN_FORM";
export const OPEN_REGISTER_FORM = "OPEN_REGISTER_FORM";
export const CLOSE_REGISTER_FORM = "CLOSE_REGISTER_FORM";
export const OPEN_CREATE_ACCOUNT_FORM = "OPEN_CREATE_ACCOUNT_FORM";
export const CLOSE_CREATE_ACCOUNT_FORM = "CLOSE_CREATE_ACCOUNT_FORM";
export const SET_LOGIN_FORM_ERROR = "SET_LOGIN_FORM_ERROR";
export const SET_REGISTER_FORM_ERRORS = "SET_REGISTER_FORM_ERRORS";
export const RESET_TO_INITIAL = "RESET_TO_INITIAL";
export const OPEN_RESTORE_FORM = "OPEN_RESTORE_FORM";
export const CLOSE_RESTORE_FORM = "CLOSE_RESTORE_FORM";


export const closeLoginForm = () => ({
  type: CLOSE_LOGIN_FORM,
});

export const openLoginForm = () => ({
  type: OPEN_LOGIN_FORM,
});

export const setLoginFormErrorState = (state) => ({
  type: SET_LOGIN_FORM_ERROR,
  state: state
});

export const closeRegisterForm = () => ({
  type: CLOSE_REGISTER_FORM,
});

export const openRegisterForm = () => ({
  type: OPEN_REGISTER_FORM,
});

export const setRegisterFormErrors = (emailErrors = [], passwordErrors = [], nameErrors = [], surnameErrors = []) => ({
  type: SET_REGISTER_FORM_ERRORS,
  emailErrors: emailErrors,
  passwordErrors: passwordErrors,
  nameErrors: nameErrors,
  surnameErrors: surnameErrors
});

export const openCreateAccountForm = (token, expireIn, provider) => ({
  type: OPEN_CREATE_ACCOUNT_FORM,
  accessToken: token,
  expireIn: expireIn,
  provider: provider
});

export const closeCreateAccountForm = () => ({
  type: CLOSE_CREATE_ACCOUNT_FORM
});

export const resetToInitial = () => ({
  type: RESET_TO_INITIAL
});

export const closeRestoreForm = () => ({
  type: CLOSE_RESTORE_FORM,
});

export const openRestoreForm = () => ({
  type: OPEN_RESTORE_FORM,
});






