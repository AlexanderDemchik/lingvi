import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import api from "./api";
import "./index.css";
import {EXPIRE_IN_FIELD, REFRESH_TOKEN_FIELD, TOKEN_FIELD} from "./constants";
import {refresh} from "./authorization/actions";
import i18n from "./i18n";

store.subscribe(() => {console.log(store.getState())});

/*interceptor to refresh token before request when current token has expired*/
api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language || localStorage.getItem("i18nextLng") || "";
  if(localStorage.getItem(EXPIRE_IN_FIELD) !== null && (parseInt(localStorage.getItem(EXPIRE_IN_FIELD)) + 5000) < Date.now() && !store.getState().authorization.isRefreshing) {
    return new Promise((resolve, reject) => {
      store.dispatch(refresh(localStorage.getItem(REFRESH_TOKEN_FIELD))).then(() => {
        const token = localStorage.getItem(TOKEN_FIELD);
        config.headers.Authorization = token ? token : '';
        resolve(config);
      });
    });
  } else {
    const token = localStorage.getItem(TOKEN_FIELD);
    config.headers.Authorization = token ? token : '';
    return config;
  }

},(error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => response, error => {
  if(error.response === undefined) console.log("Server is unavailable");
  return Promise.reject(error);
});


ReactDOM.render(<Suspense fallback={<div/>}><App /></Suspense>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
