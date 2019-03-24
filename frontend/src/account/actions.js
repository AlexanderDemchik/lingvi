import i18n from "../i18n";

export const CHANGE_UI_LANGUAGE = "CHANGE_UI_LANGUAGE";
export const CHANGE_TRANSLATION_LANGUAGE = "CHANGE_TRANSLATION_LANGUAGE";

export const changeUiLanguage = (lang) => (dispatch) => {
  i18n.changeLanguage(lang).then(() => {
    return dispatch({
      type: "CHANGE_UI_LANGUAGE",
      data: lang
    });
  });
};

export const changeTranslationLanguage = (lang) => (dispatch) => ({
  type: CHANGE_TRANSLATION_LANGUAGE,
  data: lang
});
