import React, {Component} from "react";
import WelcomeBar from "./components/WelcomeBar";
import {withStyles} from "@material-ui/core";
import {mdiChevronDoubleDown as ChevronDoubleDown} from "@mdi/js";
import Icon from "@mdi/react";
import {style} from "./WelcomePage.style";
import LoginForm from "./containers/LoginForm";
import {openLoginForm, openRegisterForm} from "./actions";
import {connect} from "react-redux";
import {compose} from "redux";
import RegisterForm from "./containers/RegisterForm";
import CreateAccountForm from "./containers/CreateAccountForm";
import RestoreForm from "./containers/RestoreForm";
import VideoPlayer from "../videoplayer/VideoPlayer";

class WelcomePage extends Component {

  render() {
    const {classes, openLoginForm, openRegisterForm} = this.props;
    return (
      <React.Fragment>
        <RestoreForm/>
        <CreateAccountForm/>
        <LoginForm/>
        <RegisterForm/>
        <WelcomeBar openLoginForm={openLoginForm} openRegisterForm={openRegisterForm}/>
        <div className={classes.first}>
          <div className={classes.tagWrapper}>
            <span className={classes.title}>Английский с удовольствием!</span>
            <span className={classes.subtitle}>Смотрите видео в оригинале, наслаждайтесь, учите язык</span>
          </div>
          <div className={classes.howItWork}>
            <span>Как это работает?</span>
            <Icon path={ChevronDoubleDown} size={1} color={"inherit"}/>
          </div>
        </div>
        <VideoPlayer url={"http://localhost/video/gameofthrones/season1/episode1/1080/test.m3u8"} spritesUrl={"http://localhost/video/gameofthrones/season1/episode1/sprites"}/>
        {/*<VideoPlayer url={"https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"}/>*/}
       {/*<VideoPlayer url={"http://pushzone-f13d.kxcdn.com/stream/test.m3u8"}/>*/}
        {/*https://youtu.be/L4K0lxVJweU*/}
        {/*"http://pushzone-f13d.kxcdn.com/stream/test.m3u8"*/}
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openLoginForm: () => dispatch(openLoginForm()),
  openRegisterForm: () => dispatch(openRegisterForm())
});

export default compose(withStyles(style), connect(null, mapDispatchToProps))(WelcomePage);