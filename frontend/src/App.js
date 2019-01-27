import React, { Component } from "react";
import {Provider} from "react-redux";
import {Route, Router, Switch} from "react-router";
import store from "./store";
import history from "./history";
import {API_ROOT, EXPIRE_IN_FIELD, TOKEN_FIELD} from "./constants";
import axios from "axios";
import {changeAuthState, clearAuthLocalStorage} from "./authorization/actions";
import WelcomePage from "./welcome/WelcomePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppInit: false
    }
  }

  appInit() {
    if(localStorage.getItem(TOKEN_FIELD) !== null && localStorage.getItem(EXPIRE_IN_FIELD) != null) {
      if((new Date().getTime() - localStorage.getItem(EXPIRE_IN_FIELD)) < 0) {

      } else {
        this.setState({isAppInit: true});
      }
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
              <Router history={history}>
                <Switch>
                  <Route exact={true} path={"/"} component={WelcomePage}/>
                </Switch>
              </Router>
          </Provider>
        )}
      </React.Fragment>
    )
  }
}

export default App;
