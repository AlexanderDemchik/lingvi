import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {welcomeReducer} from "./welcome/reducer";


const rootReducer = combineReducers({
  welcomePageState: welcomeReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));