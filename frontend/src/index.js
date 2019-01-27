import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from "./store";
import "./index.css";

store.subscribe(() => {console.log(store.getState())});

/*interceptor to refresh token before request when current token has expired*/
// axios.interceptors.request.use((config) => {
//   if(localStorage.getItem(EXPIRE_IN_FIELD) !== null && localStorage.getItem(EXPIRE_IN_FIELD) < Date.now() && !store.getState().auth.isRefreshing) {
//     store.dispatch(changeRefreshState(true));
//     return new Promise((resolve, reject) => {
//       axios.post(API_ROOT + "/auth/refresh", {[REFRESH_TOKEN_FIELD]: localStorage.getItem(REFRESH_TOKEN_FIELD)})
//         .then(r => {
//           store.dispatch(changeRefreshState(false));
//           fillAuthLocalStorage(r.data);
//           const token = localStorage.getItem(TOKEN_FIELD);
//           config.headers.Authorization = token ? token : '';
//           resolve(config);
//         })
//         .catch(err => {
//           store.dispatch(changeRefreshState(false));
//           clearAuthLocalStorage();
//           reject(err);
//         })
//     });
//   } else {
//     const token = localStorage.getItem(TOKEN_FIELD);
//     config.headers.Authorization =  token ? token : '';
//     return config;
//   }
// });


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
