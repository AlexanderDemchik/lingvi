import {LANGUAGES} from "../constants";
import {
  CHANGE_TRANSLATION_LANGUAGE, CHANGE_UI_LANGUAGE, FETCH_SETTINGS_SUCCESS, SET_SETTINGS, UPDATE_I18N_SETTINGS_ERROR,
  UPDATE_I18N_SETTINGS_REQUEST, UPDATE_I18N_SETTINGS_SUCCESS
} from "./actions";

const initialState = {
  uiLanguage: LANGUAGES.RU,
  translationLanguage: LANGUAGES.RU,

  isSavingI18nSettings: false
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_UI_LANGUAGE: return {...state, uiLanguage: action.data};
    case CHANGE_TRANSLATION_LANGUAGE: return {...state, translationLanguage: action.data};
    case FETCH_SETTINGS_SUCCESS: return {...state, uiLanguage: action.payload.uiLanguage, translationLanguage: action.payload.translationLanguage};

    case UPDATE_I18N_SETTINGS_REQUEST: return {...state, isSavingI18nSettings: true};
    case UPDATE_I18N_SETTINGS_SUCCESS: return {...state, isSavingI18nSettings: false, uiLanguage: action.payload.uiLanguage, translationLanguage: action.payload.translationLanguage};
    case UPDATE_I18N_SETTINGS_ERROR: return {...state, isSavingI18nSettings: false};

    case SET_SETTINGS: return action.data;
    default: return state;
  }
};

export default settingsReducer;