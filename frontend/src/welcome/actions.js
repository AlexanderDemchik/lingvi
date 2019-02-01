export const OPEN_LOGIN_FORM = "OPEN_LOGIN_FORM";
export const CLOSE_LOGIN_FORM = "CLOSE_LOGIN_FORM";
export const OPEN_REGISTER_FORM = "OPEN_REGISTER_FORM";
export const CLOSE_REGISTER_FORM = "CLOSE_REGISTER_FORM";
export const OPEN_CREATE_ACCOUNT_FORM = "OPEN_CREATE_ACCOUNT_FORM";
export const CLOSE_CREATE_ACCOUNT_FORM = "CLOSE_CREATE_ACCOUNT_FORM";

export const closeLoginForm = () => ({
  type: CLOSE_LOGIN_FORM,
});

export const openLoginForm = () => ({
  type: OPEN_LOGIN_FORM,
});

export const closeRegisterForm = () => ({
  type: CLOSE_REGISTER_FORM,
});

export const openRegisterForm = () => ({
  type: OPEN_REGISTER_FORM,
});

export const openCreateAccountForm = () => ({
  type: OPEN_CREATE_ACCOUNT_FORM,
});

export const closeCreateAccountForm = () => ({
  type: CLOSE_CREATE_ACCOUNT_FORM,
});




