import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from "redux-thunk";
import {welcomeReducer} from "./welcome/reducer";
import authReducer from "./authorization/reducer";
import settingsReducer from "./settings/reducer";
import userDictionaryReducer from "./dictionary/reducer";
import {videoReducer} from "./video/reducer";


const rootReducer = combineReducers({
  welcomePageState: welcomeReducer,
  authorization: authReducer,
  settings: settingsReducer,
  dictionary: userDictionaryReducer,
  video: videoReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));