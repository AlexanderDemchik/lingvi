import axios from "axios";

export const ROOT = "http://localhost:3000";
export const API_ROOT = "http://localhost:8080";

export default axios.create({
  baseURL: API_ROOT
});

/*Api paths*/
export const DICTIONARY_PATH = "/dictionary";
export const DICTIONARY_SOUND_PATH = `${DICTIONARY_PATH}/sound/path`;
export const TRANSLATION_PATH = "/translation";
export const USER_DICTIONARY_PATH = "/userdictionary";
export const WORD_PATH = "/word";
export const USER_DICTIONARY_WORD_PATH = `${USER_DICTIONARY_PATH}${WORD_PATH}`;