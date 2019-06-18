import i18n from "../i18n";
import api, {API_ROOT} from "../api"

export const CHANGE_UI_LANGUAGE = "CHANGE_UI_LANGUAGE";
export const CHANGE_TRANSLATION_LANGUAGE = "CHANGE_TRANSLATION_LANGUAGE";

export const FETCH_SETTINGS_REQUEST = "FETCH_SETTINGS_REQUEST";
export const FETCH_SETTINGS_SUCCESS = "FETCH_SETTINGS_SUCCESS";
export const FETCH_SETTINGS_ERROR = "FETCH_SETTINGS_ERROR";

export const UPDATE_I18N_SETTINGS_REQUEST = "UPDATE_I18N_SETTINGS_REQUEST";
export const UPDATE_I18N_SETTINGS_ERROR = "UPDATE_I18N_SETTINGS_ERROR";
export const UPDATE_I18N_SETTINGS_SUCCESS = "UPDATE_I18N_SETTINGS_SUCCESS";

export const SET_SETTINGS = "SET_SETTINGS";

export const getSettings = () => (dispatch) => {
  dispatch({type: FETCH_SETTINGS_REQUEST});
  return api.get(`${API_ROOT}/account/settings`).then((r) => {
    dispatch({type: FETCH_SETTINGS_SUCCESS, payload: r.data})
  }).catch(err => {
    dispatch({type: FETCH_SETTINGS_ERROR});
  })
};

export const saveI18nSettings = (translationLanguage, uiLanguage) => (dispatch) => {
  dispatch({type: UPDATE_I18N_SETTINGS_REQUEST});
  return api.put(`${API_ROOT}/account/settings/i18n`, {translationLanguage, uiLanguage}).then(r => {
    dispatch({type: UPDATE_I18N_SETTINGS_SUCCESS, payload: r.data});
  }).catch(err => {
    dispatch({type: UPDATE_I18N_SETTINGS_ERROR});
  });
};

export const changeUiLanguage = (lang) => (dispatch) => {
  i18n.changeLanguage(lang).then(() => {
    return dispatch({
      type: CHANGE_UI_LANGUAGE,
      data: lang
    });
  });
};

export const changeTranslationLanguage = (lang) => (dispatch) => ({
  type: CHANGE_TRANSLATION_LANGUAGE,
  data: lang
});

export const setSettings = (obj) => ({
  type: SET_SETTINGS,
  data: obj
});


