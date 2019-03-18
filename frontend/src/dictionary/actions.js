// import api, {USER_DICTIONARY_PATH, USER_DICTIONARY_WORD_PATH} from "../api";
//
// export const getUserWords = (page, limit) => (
//   dispatch => {
//     dispatch({type: USER_WORDS_REQUEST});
//     api.get(`${USER_DICTIONARY_WORD_PATH}?page=${page}&limit=${limit}`)
//       .then((r) => {
//         dispatch({type: USER_WORDS_SUCCESS, data: r.data});
//       })
//       .catch(e => {
//         dispatch({type: USER_WORDS_ERROR});
//       })
//   }
// );
//
// export const getAllUserWordIds = () => (
//   dispatch => {
//     dispatch({type: USER_WORDS_ID_REQUEST});
//     return api.get(`${USER_DICTIONARY_WORD_PATH}/id`)
//       .then(r => {
//         dispatch({type: USER_WORDS_ID_SUCCESS, data: r.data});
//       })
//       .catch(e => {
//         dispatch({type: USER_WORDS_ID_ERROR});
//       })
//   }
// );
//
// export const clearUserWords = () => ({
//   type: USER_WORDS_CLEAR
// });
