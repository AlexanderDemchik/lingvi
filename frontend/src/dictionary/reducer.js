import {
  DELETE_WORD_SUCCESS,
  DICTIONARY_META_ERROR,
  DICTIONARY_META_REQUEST, DICTIONARY_META_SUCCESS,
  USER_WORDS_CLEAR, USER_WORDS_ERROR, USER_WORD_IDS_ERROR, USER_WORD_IDS_REQUEST, USER_WORD_IDS_SUCCESS,
  USER_WORDS_REQUEST,
  USER_WORDS_SUCCESS, ON_WORD_SELECT, ON_SELECT_ALL_WORD, DICTIONARY_CHANGE, FILTER_CHANGE, CHANGE_WORD_CARD_OPEN,
  CHANGE_WORD_CARD_INDEX, ADD_TO_DICTIONARY, DELETE_FROM_DICTIONARY, BATCH_WORD_DELETE_SUCCESS,
  BATCH_WORD_DELETE_REQUEST, BATCH_WORD_DELETE_ERROR, CHANGE_WORD_IMAGE_REQUEST, CHANGE_WORD_IMAGE_SUCCESS,
  CHANGE_WORD_IMAGE_ERROR, DELETE_TRANSLATION_FROM_WORD_SUCCESS, ADD_TRANSLATION_TO_WORD_SUCCESS
} from "./actions";

let initialState = {
  meta: [],
  currentDict: {},
  currentPage: -1,
  hasMore: false,
  loading: false,
  records: [],
  allIds: [],
  filter: "",
  selected: [],//array of ids
  selectAll: false,
  wordCardOpen: false,
  wordCardIndex: -1,
  batchDeleteProceed: false
};

const userDictionaryReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_WORDS_REQUEST: return {...state, loading: true};
    case USER_WORDS_SUCCESS: {
      let newRecords = [...state.records];
      newRecords.push(...action.data.content);
      return {...state, loading: false, currentPage: action.data.page, hasMore: !action.data.last, records: newRecords};
    }
    case USER_WORDS_ERROR: return {...state, hasMore: false, loading: false};

    case USER_WORD_IDS_REQUEST: return {...state};
    case USER_WORD_IDS_SUCCESS:return {...state, allIds: action.data};
    case USER_WORD_IDS_ERROR: return {...state};
    case USER_WORDS_CLEAR: return {...state, records: [], allIds: [], hasMore: true, currentPage: -1};

    case DICTIONARY_META_REQUEST: return {...state};
    case DICTIONARY_META_SUCCESS: return {...state, meta: action.data, currentDict: action.currentDict};
    case DICTIONARY_META_ERROR: return {...state};

    case DICTIONARY_CHANGE: return {...state, currentDict: action.currentDict};
    case DELETE_WORD_SUCCESS: return state;
    case ON_WORD_SELECT: return {...state, selected: action.selected, selectAll: action.selectAll};
    case ON_SELECT_ALL_WORD: return {...state, selected: action.selected, selectAll: action.selectAll};
    case FILTER_CHANGE: return {...state, filter: action.data};

    case CHANGE_WORD_CARD_OPEN: return {...state, wordCardOpen: action.data};
    case CHANGE_WORD_CARD_INDEX: return {...state, wordCardIndex: action.data};

    case ADD_TO_DICTIONARY: return {...state, records: action.records, allIds: action.allIds, meta: action.meta, currentDict: action.currentDict}
    case DELETE_FROM_DICTIONARY: return {...state, records: action.records, allIds: action.allIds, meta: action.meta, currentDict: action.currentDict, selected: action.selected};

    case BATCH_WORD_DELETE_REQUEST: return {...state, batchDeleteProceed: true};
    case BATCH_WORD_DELETE_ERROR: return {...state, batchDeleteProceed: false};
    case BATCH_WORD_DELETE_SUCCESS: return {...state, batchDeleteProceed: false, records: action.records, allIds: action.allIds, meta: action.meta, currentDict: action.currentDict, selected: action.selected};

    case CHANGE_WORD_IMAGE_REQUEST: return state;
    case CHANGE_WORD_IMAGE_SUCCESS: return {...state, records: action.records};
    case CHANGE_WORD_IMAGE_ERROR: return state;

    case DELETE_TRANSLATION_FROM_WORD_SUCCESS: return {...state, records: action.records};
    case ADD_TRANSLATION_TO_WORD_SUCCESS: return {...state, records: action.records};
    default: return state;
  }
};

export default userDictionaryReducer;