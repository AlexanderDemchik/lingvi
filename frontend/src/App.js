import React, {Component} from "react";
import {Provider} from "react-redux";
import store from "./store";
import {EXPIRE_IN_FIELD, REFRESH_TOKEN_FIELD, TOKEN_FIELD} from "./constants";
import {changeAuthState, me} from "./authorization/actions";
import Routes from "./Routes";
import { MuiThemeProvider } from '@material-ui/core/styles';
import {theme} from "./theme";
import {getSettings} from "./settings/actions";
import i18n from "./i18n";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAppInit: false
    }
  }

  appInit() {
    if(localStorage.getItem(TOKEN_FIELD) !== null && localStorage.getItem(EXPIRE_IN_FIELD) !== null && localStorage.getItem(REFRESH_TOKEN_FIELD) !== null) {
      store.dispatch(me()).then((r) => {
        store.dispatch(getSettings()).then(() => {
          store.dispatch(changeAuthState(true));
          if (store.getState().settings.uiLanguage) i18n.changeLanguage(store.getState().settings.uiLanguage);
          this.setState({isAppInit: true});
        });
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
            <MuiThemeProvider theme={theme}>
              <Routes/>
            </MuiThemeProvider>
          </Provider>
        )}
      </React.Fragment>
    )
  }
}

export default (App);
