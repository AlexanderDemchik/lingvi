import api, {TRANSLATION_PATH, USER_DICTIONARY_PATH, USER_DICTIONARY_WORD_PATH, WORD_PATH} from "../api";
import {debounce} from "lodash";

export const USER_WORDS_REQUEST = "USER_WORDS_REQUEST";
export const USER_WORDS_SUCCESS = "USER_WORDS_SUCCESS";
export const USER_WORDS_ERROR = "USER_WORDS_ERROR";
export const USER_WORDS_CLEAR = "USER_WORDS_CLEAR";
export const USER_WORD_IDS_REQUEST = "USER_WORD_IDS_REQUEST";
export const USER_WORD_IDS_SUCCESS = "USER_WORD_IDS_SUCCESS";
export const USER_WORD_IDS_ERROR = "USER_WORD_IDS_ERROR";
export const DICTIONARY_META_REQUEST = "DICTIONARY_META_REQUEST";
export const DICTIONARY_META_SUCCESS = "DICTIONARY_META_SUCCESS";
export const DICTIONARY_META_ERROR = "DICTIONARY_META_ERROR";
export const DELETE_WORD_REQUEST = "DELETE_WORD_REQUEST";
export const DELETE_WORD_SUCCESS = "DELETE_WORD_SUCCESS";
export const DELETE_WORD_ERROR = "DELETE_WORD_ERROR";
export const FILTER_CHANGE = "FILTER_CHANGE";
export const DICTIONARY_CHANGE = "DICTIONARY_CHANGE";
export const ON_WORD_SELECT = "ON_WORD_SELECT";
export const ON_SELECT_ALL_WORD = "ON_SELECT_ALL_WORD";
export const CHANGE_WORD_CARD_OPEN = "CHANGE_WORD_CARD_OPEN";
export const CHANGE_WORD_CARD_INDEX = "CHANGE_WORD_CARD_INDEX";
export const ADD_TO_DICTIONARY = "ADD_TO_DICTIONARY";
export const DELETE_FROM_DICTIONARY = "DELETE_FROM_DICTIONARY";
export const DELETE_TRANSLATION_FROM_WORD_SUCCESS = "DELETE_TRANSLATION_FROM_WORD_SUCCESS";
export const ADD_TRANSLATION_TO_WORD_SUCCESS = "ADD_TRANSLATION_TO_WORD_SUCCESS";
export const BATCH_WORD_DELETE_REQUEST = "BATCH_WORD_DELETE_REQUEST";
export const BATCH_WORD_DELETE_SUCCESS = "BATCH_WORD_DELETE_SUCCESS";
export const BATCH_WORD_DELETE_ERROR = "BATCH_WORD_DELETE_ERROR";
export const CHANGE_WORD_IMAGE_REQUEST = "CHANGE_WORD_IMAGE_REQUEST";
export const CHANGE_WORD_IMAGE_SUCCESS = "CHANGE_WORD_IMAGE_SUCCESS";
export const CHANGE_WORD_IMAGE_ERROR = "CHANGE_WORD_IMAGE_ERROR";
export const ADD_USER_DICTIONARY_REQUEST = "ADD_USER_DICTIONARY_REQUEST";
export const ADD_USER_DICTIONARY_SUCCESS = "ADD_USER_DICTIONARY_SUCCESS";
export const ADD_USER_DICTIONARY_ERROR = "ADD_USER_DICTIONARY_ERROR";
export const DELETE_USER_DICTIONARY_REQUEST = "ADD_USER_DICTIONARY_REQUEST";
export const DELETE_USER_DICTIONARY_SUCCESS = "ADD_USER_DICTIONARY_SUCCESS";
export const DELETE_USER_DICTIONARY_ERROR = "ADD_USER_DICTIONARY_ERROR";


export const getUserWords = (page, limit) => (
  (dispatch, getState) => {
    const {filter, currentDict} = getState().dictionary;
    dispatch({type: USER_WORDS_REQUEST});
    api.get(`${USER_DICTIONARY_WORD_PATH}?page=${page}&limit=${limit}&filter=${filter}&from=${currentDict.from}&to=${currentDict.to}`)
      .then((r) => {
        dispatch({type: USER_WORDS_SUCCESS, data: r.data});
      })
      .catch(e => {
        dispatch({type: USER_WORDS_ERROR});
      })
  }
);

export const getAllUserWordIds = () => (
  (dispatch, getState) => {
    const {filter, currentDict} = getState().dictionary;
    dispatch({type: USER_WORD_IDS_REQUEST});
    return api.get(`${USER_DICTIONARY_WORD_PATH}/id?filter=${filter}&from=${currentDict.from}&to=${currentDict.to}`)
      .then(r => {
        dispatch({type: USER_WORD_IDS_SUCCESS, data: r.data});
      })
      .catch(e => {
        dispatch({type: USER_WORD_IDS_ERROR});
      })
  }
);

export const clearUserWords = () => ({
  type: USER_WORDS_CLEAR
});

export const loadDictionaryMeta = () => (
  (dispatch, getState) => {
    dispatch({type: DICTIONARY_META_REQUEST});
    return api.get(USER_DICTIONARY_PATH + "/meta")
      .then(r => {
        let currentDict = getState().dictionary.currentDict;
        dispatch({type: DICTIONARY_META_SUCCESS, data: r.data, currentDict: getDictByLangs(currentDict.from, currentDict.to, r.data)});
      }).catch(err => {
        dispatch({type: DICTIONARY_META_ERROR});
      });
  }
);

const getDictByLangs = (from, to, meta) => {
  return meta.find(el => el.from === from && el.to === to) || meta[0];
};

export const deleteWord = (id) => (
  (dispatch) => {
    dispatch({type: DELETE_WORD_REQUEST});
    return api.delete(`${USER_DICTIONARY_WORD_PATH}/${id}`)
      .then(() => {
        dispatch({type: DELETE_WORD_SUCCESS});
        dispatch(deleteFromDictionary(id));
      })
      .catch(err => {
        dispatch({type: DELETE_WORD_ERROR});
      });
  }
);

export const onChangeFilter = (value) => (
  (dispatch, getState) => {
    dispatch({type: FILTER_CHANGE, data: value});
    updateAfterFilter(dispatch, getState);
  }
);

const updateAfterFilter = debounce((dispatch, getState) => {
  const {filter, currentDict} = getState().dictionary;
  dispatch(clearUserWords());
  dispatch(getAllUserWordIds(filter, currentDict.from, currentDict.to));
}, 500);

export const clearFilter = () => (
  (dispatch, getState) => {
    const {currentDict} = getState().dictionary;
    dispatch({type: FILTER_CHANGE, data: ""});
    dispatch(clearUserWords());
    dispatch(getAllUserWordIds("", currentDict.from, currentDict.to));
  }
);

export const onDictionaryChange = (newDict) => (
  (dispatch, getState) => {
    const {filter, meta} = getState().dictionary;
    dispatch({type: DICTIONARY_CHANGE, currentDict: newDict, wordCardIndex: -1});
    localStorage.setItem("currentDict", `${newDict.from}-${newDict.to}`);
    dispatch(clearUserWords());

    if (meta.length === 0) {
      dispatch({type: DICTIONARY_META_SUCCESS, data: [newDict], currentDict: newDict});
    }

    return dispatch(getAllUserWordIds(filter, newDict.from, newDict.to))
  }
);

export const onSelect = (id) => (
  (dispatch, getState) => {
    const {selected, selectAll} = getState().dictionary;
    let index;
    let newSelectAll = selectAll;
    let currentSelected = selected;
    if ((index = currentSelected.indexOf(id)) === -1) {
      currentSelected.push(id);
    } else {
      currentSelected.splice(index, 1);
      if (selectAll && currentSelected.length === 0) newSelectAll = false;
    }
    dispatch({type: ON_WORD_SELECT, selected: [...currentSelected], selectAll: newSelectAll})
  }
);

export const onSelectAll = () => (
  (dispatch, getState) => {
    const {allIds, selectAll} = getState().dictionary;
    if (!selectAll) {
      dispatch({type: ON_SELECT_ALL_WORD, selected: allIds, selectAll: true});
    } else {
      dispatch({type: ON_SELECT_ALL_WORD, selected: [], selectAll: false});
    }
  }
);

export const changeWordCardOpen = (open) => ({
  type: CHANGE_WORD_CARD_OPEN, data: open
});

export const changeWordCardIndex = (i) => ({
  type: CHANGE_WORD_CARD_INDEX, data: i
});

export const addToDictionary = (word) => (
  (dispatch, getState) => {
    // const {records, allIds, meta, currentDict} = getState().dictionary;
    // let newCurrentDict = currentDict;
    // records.unshift(word);
    // allIds.push(word.id);
    // for (let m of meta) {
    //   if (m.from === currentDict.from && m.to === currentDict.to) {
    //     m.num += 1;
    //     newCurrentDict = m;
    //   }
    // }
    // dispatch({type: ADD_TO_DICTIONARY, records: [...records], currentDict: newCurrentDict, allIds: [...allIds], meta: [...meta]});
    dispatch(loadDictionaryMeta());
    dispatch(clearFilter());
  }
);

export const deleteFromDictionary = (id) => (
  (dispatch, getState) => {
    const {records, allIds, meta, currentDict, selected} = getState().dictionary;
    let newCurrentDict = currentDict;
    let newRecords = records.filter(record => record.id !== id);
    let newAllIds = allIds.filter(el => el !== id);
    let newSelected = selected.filter((el) => el !== id);
    for (let m of meta) {
      if (m.from === currentDict.from && m.to === currentDict.to) {
        m.num -= 1;
        newCurrentDict = m;
      }
    }
    dispatch({type: DELETE_FROM_DICTIONARY, records: newRecords, allIds: newAllIds, currentDict: newCurrentDict, meta: [...meta], selected: newSelected})
  }
);

export const batchWordDelete = (ids) => (
  (dispatch, getState) => {
    dispatch({type: BATCH_WORD_DELETE_REQUEST});
    api.delete(USER_DICTIONARY_WORD_PATH, {data: {ids: ids}})
      .then(r => {
        const {records, allIds, meta, currentDict, selected} = getState().dictionary;
        let newCurrentDict = currentDict;
        let newRecords = records.filter(record => !ids.includes(record.id));
        let newAllIds = allIds.filter(el => !ids.includes(el));
        let newSelected = selected.filter((el) => !ids.includes(el));
        for (let m of meta) {
          if (m.from === currentDict.from && m.to === currentDict.to) {
            m.num -= ids.length;
            newCurrentDict = m;
          }
        }
        dispatch({type: BATCH_WORD_DELETE_SUCCESS, records: newRecords, allIds: newAllIds, currentDict: newCurrentDict, meta: [...meta], selected: newSelected});
      })
      .catch(err => {
        dispatch({type: BATCH_WORD_DELETE_ERROR});
      })
  }
);

export const changeImage = (wordId, image) => (dispatch, getState) => {
  const {records} = getState().dictionary;
  dispatch({type: CHANGE_WORD_IMAGE_REQUEST});
  return api.post(`${USER_DICTIONARY_PATH}${WORD_PATH}/${wordId}/image`, {id: image.id}).then(response => {
    let values = records;
    let i = values.findIndex((el) => el.id === wordId);
    values[i].image = response.data;
    dispatch({type: CHANGE_WORD_IMAGE_SUCCESS, records: [...values]});
  }).catch(err => {
    dispatch({type: CHANGE_WORD_IMAGE_ERROR});
  });
};

export const deleteTranslationFromWord = (wordId, translationId) => (dispatch, getState) => {
  const {records} = getState().dictionary;
  return api.delete(`${USER_DICTIONARY_WORD_PATH}/${wordId}${TRANSLATION_PATH}/${translationId}`).then(r => {
    let values = records;
    let i = values.findIndex((el) => el.id === wordId);
    let translations = values[i].userTranslations;
    values[i].userTranslations = translations.filter((el) => el.id !== translationId);
    dispatch({type: DELETE_TRANSLATION_FROM_WORD_SUCCESS, records: [...values]})
  });
};

export const addTranslationToWord = (wordId, translation, translationId = null) => (dispatch, getState) => {
  const {records} = getState().dictionary;
  return api.post(`${USER_DICTIONARY_WORD_PATH}/${wordId}${TRANSLATION_PATH}`, {id: translationId, translation: translation})
    .then(r => {
      let values = records;
      let i = values.findIndex((el) => el.id === wordId);
      let translations = values[i].userTranslations;
      translations.push(r.data);
      dispatch({type: ADD_TRANSLATION_TO_WORD_SUCCESS, records: [...values]});
      return r.data;
    })
};

export const addDictionary = (from = null, to = null) => (dispatch) => {
  dispatch({type: ADD_USER_DICTIONARY_REQUEST});
  api.post("/userdictionary", {from, to})
    .then(r => {
      dispatch(loadDictionaryMeta());
      dispatch({type: ADD_USER_DICTIONARY_SUCCESS});
    }).catch(err => {
      dispatch({type: ADD_USER_DICTIONARY_ERROR});
    });
};

export const deleteDictionary = (from = null, to = null) => (dispatch, getState) => {
  dispatch({type: DELETE_USER_DICTIONARY_REQUEST});
  api.delete("/userdictionary", {data: {from, to}})
    .then(r => {
      dispatch(loadDictionaryMeta()).then(() => {
        dispatch(onDictionaryChange(getState().dictionary.currentDict));
      });
      dispatch({type: DELETE_USER_DICTIONARY_SUCCESS});
    }).catch(err => {
    dispatch({type: DELETE_USER_DICTIONARY_ERROR});
  });
};