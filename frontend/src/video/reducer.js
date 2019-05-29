import {LANGUAGES} from "../constants";
import {GET_FILMS_ERROR, GET_FILMS_REQUEST, GET_FILMS_SUCCESS, SELECT_FILM} from "./actions";

const initialState = {
  filmsLoading: false,
  selectedFilm: {},
  films: []
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILMS_REQUEST: return {...state, filmsLoading: true};
    case GET_FILMS_SUCCESS: return {...state, filmsLoading: false, films: action.payload};
    case GET_FILMS_ERROR: return {...state, filmsLoading: false};
    case SELECT_FILM: return {...state, selectedFilm: action.payload};
    default: return state;
  }
};