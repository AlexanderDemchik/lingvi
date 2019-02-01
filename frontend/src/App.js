import React, { Component } from "react";
import {Provider} from "react-redux";
import store from "./store";
import {API_ROOT, EXPIRE_IN_FIELD, REFRESH_TOKEN_FIELD, TOKEN_FIELD} from "./constants";
import {changeAuthState, clearAuthLocalStorage, me, refresh} from "./authorization/actions";
import Routes from "./Routes";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppInit: false
    }
  }

  appInit() {
    if(localStorage.getItem(TOKEN_FIELD) !== null && localStorage.getItem(EXPIRE_IN_FIELD) !== null && localStorage.getItem(REFRESH_TOKEN_FIELD) !== null) {
      me().then((r) => {
        console.log("r");
        store.dispatch(changeAuthState(true));
        this.setState({isAppInit: true});
      }).catch(err => {
        console.log(err);
        this.setState({isAppInit: true});
      });
    } else {
      this.setState({isAppInit: true});
    }
  }

  componentDidMount() {
    this.appInit();
  }

  render() {
    const {isAppInit} = this.state;
    return (
      <React.Fragment>
        {(isAppInit) && (
          <Provider store={store}>
            <Routes/>
          </Provider>
        )}
      </React.Fragment>
    )
  }
}

export default (App);
