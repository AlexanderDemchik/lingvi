export const OPEN_LOGIN_FORM = "OPEN_LOGIN_FORM";
export const CLOSE_LOGIN_FORM = "CLOSE_LOGIN_FORM";
export const OPEN_REGISTER_FORM = "OPEN_REGISTER_FORM";
export const CLOSE_REGISTER_FORM = "CLOSE_REGISTER_FORM";

export const closeLoginForm = () => ({
  type: CLOSE_LOGIN_FORM,
  open : false
});

export const openLoginForm = () => ({
  type: OPEN_LOGIN_FORM,
  open : true
});

export const closeRegisterForm = () => ({
  type: CLOSE_REGISTER_FORM,
  open : false
});

export const openRegisterForm = () => ({
  type: OPEN_REGISTER_FORM,
  open : true
});