import React from "react";
import {connect} from "react-redux";
import WelcomePage from "./welcome/WelcomePage";
import {Route, Router, Switch} from "react-router";
import SocialLogin from "./authorization/components/SocialLogin";
import SocialRegister from "./authorization/components/SocialRegister";
import history from "./history";
import Button from "@material-ui/core/Button/Button";
import {exit} from "./authorization/actions";
import store from "./store";

export const Routes = ({logged, ...props}) => (
  <Router history={history}>
    <Switch>
      {logged && <Route exact={true} path={"/"} children={()=>(<Button onClick={()=>store.dispatch(exit())}>exit</Button>)}/>}
      {!logged &&
        [<Route key={"welcomepage"} exact={true} path={"/"} component={WelcomePage}/>,
        <Route key={"providerlogin"} path={"/login/:provider"} component={SocialLogin}/>,
        <Route key={"providerregister"} path={"/register/:provider"} component={SocialRegister}/>].map(route => route)
      }
      <Route path={"*"} exact={true} children={() => (<span>not found</span>)}/>
    </Switch>
  </Router>
);

const mapStateToProps = (state) => ({
  logged: state.authorization.logged
});

export default connect(mapStateToProps, null)(Routes);