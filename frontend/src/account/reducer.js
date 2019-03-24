import {LANGUAGES} from "../constants";
import {CHANGE_TRANSLATION_LANGUAGE, CHANGE_UI_LANGUAGE} from "./actions";

const initialState = {
  uiLanguage: LANGUAGES.RU,
  translationLanguage: LANGUAGES.RU
};

export const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_UI_LANGUAGE: return {...state, uiLanguage: action.data};
    case CHANGE_TRANSLATION_LANGUAGE: return {...state, translationLanguage: action.data};
    default: return state;
  }
};