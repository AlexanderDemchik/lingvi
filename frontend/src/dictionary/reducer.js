// import {
//   USER_WORDS_CLEAR, USER_WORDS_ERROR, USER_WORDS_ID_ERROR, USER_WORDS_ID_REQUEST, USER_WORDS_ID_SUCCESS,
//   USER_WORDS_REQUEST,
//   USER_WORDS_SUCCESS
// } from "./actions";
//
// let initialState = {
//   currentPage: -1,
//   hasMore: true,
//   loading: false,
//   records: [],
//   allIds: []
// };
//
// const userDictionaryReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case USER_WORDS_REQUEST: return {...state, loading: true};
//     case USER_WORDS_SUCCESS:
//       let newRecords = state.records;
//       newRecords.push(...action.data.content);
//       return {...state, loading: false, currentPage: action.data.page, hasMore: !action.data.last, records: newRecords};
//     case USER_WORDS_ERROR: return {...state, loading: false};
//     case USER_WORDS_ID_REQUEST: return {...state};
//     case USER_WORDS_ID_SUCCESS:return {...state, allIds: action.data};
//     case USER_WORDS_ID_ERROR: return {...state};
//     case USER_WORDS_CLEAR: return {...state, hasMore: false, loading: false, records: []};
//     default: return state;
//   }
// };
//
// export default userDictionaryReducer;