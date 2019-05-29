import api from "../api";

export const GET_FILMS_REQUEST = "GET_FILMS_REQUEST";
export const GET_FILMS_SUCCESS = "GET_FILMS_SUCCESS";
export const GET_FILMS_ERROR = "GET_FILMS_ERROR";

export const SELECT_FILM = "SELECT";

export const selectFilm = (film) => ({
  type: SELECT_FILM,
  payload: film
});

export const getFilms = () => (dispatch) => {
  dispatch({type: GET_FILMS_REQUEST});
  return api.get("/video/films").then(r => {
    dispatch({type: GET_FILMS_SUCCESS, payload: r.data});
  }).catch(e => {
    dispatch({type: GET_FILMS_ERROR});
  });
};