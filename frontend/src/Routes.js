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
import VideoPlayer from "./videoplayer/VideoPlayer";

export const Routes = ({logged, ...props}) => (
  <Router history={history}>
    <Switch>
      {logged && <Route exact={true} path={"/"} children={()=>(
        <React.Fragment>
          <Button onClick={()=>store.dispatch(exit())}>exit</Button>
          <VideoPlayer url={"http://localhost/video/gameofthrones/season1/episode1/1080/test.m3u8"} spritesUrl={"http://localhost/video/gameofthrones/season1/episode1/sprites"}/>
        </React.Fragment>
      )}/>}
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