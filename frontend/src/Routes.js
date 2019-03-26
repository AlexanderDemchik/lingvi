import React, {Fragment} from "react";
import {connect} from "react-redux";
import WelcomePage from "./welcome/WelcomePage";
import {Router, Route, Switch} from "react-router-dom";
import SocialLogin from "./authorization/components/SocialLogin";
import SocialRegister from "./authorization/components/SocialRegister";
import history from "./history";
import Button from "@material-ui/core/Button/Button";
import store from "./store";
import VideoPlayer from "./videoplayer/VideoPlayer";
import Dictionary from "./dictionary/Dictionary";
import AppBar from "./appbar/AppBar";
import WithAppBar from "./layout/WithAppBar";
import Home from "./home/Home";

export const Routes = ({logged, ...props}) => (
  <Router history={history}>
    {logged &&
      <>
        <AppBar/>
        <Switch>
          <Route exact path={"/"} children={() => <Home/>}/>
          <Route path={"/dictionary"} component={Dictionary}/>
          <Route path={"*"} exact={true} children={() => (<span>not found</span>)}/>
        </Switch>
      </>
    }
    {!logged &&
      <Switch>
        {console.log("here")}
        <Route key={"welcomepage"} exact={true} path={"/"} component={WelcomePage}/>
        <Route key={"providerlogin"} path={"/login/:provider"} component={SocialLogin}/>
        <Route key={"providerregister"} path={"/register/:provider"} component={SocialRegister}/>
        {console.log("here2")}
        <Route path={"*"} exact={true} children={() => (<span>not found</span>)}/>
      </Switch>
    }
  </Router>
);

const mapStateToProps = (state) => ({
  logged: state.authorization.logged
});

export default connect(mapStateToProps, null)(Routes);