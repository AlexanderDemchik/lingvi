import {CHANGE_AUTH_STATE, LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS} from "../constants";

let initialState = {
  logged: false,
  userId: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST: return state;
    case LOGIN_SUCCESS: return state;
    case LOGIN_ERROR: return state;
    case CHANGE_AUTH_STATE:
      return {
        ...state, isAuth: action.state
      };
    default: return state;
  }
};

export default authReducer;