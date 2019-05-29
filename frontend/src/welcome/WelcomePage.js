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
import {withTranslation} from "react-i18next";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class WelcomePage extends Component {

  render() {
    const {classes, openLoginForm, openRegisterForm} = this.props;
    return (
      <React.Fragment>
        <CssBaseline/>
        <RestoreForm/>
        <CreateAccountForm/>
        <LoginForm/>
        <RegisterForm/>
        <WelcomeBar openLoginForm={openLoginForm} openRegisterForm={openRegisterForm}/>
        <div className={classes.promo}>
          <div className={classes.promoText}>
            <div className={classes.promoTitle}>Английский с удовольствием!</div>
            <div className={classes.promoSubTitle}>смотрите видео в оригинале, наслаждайтесь, учите язык</div>
          </div>
        </div>
        <Grid container direction={"row"} className={classes.feature}>
          <Grid item sm={6} xs={12} className={classes.featureImg}>
            <img src={"/assets/promoVideo.png"} width={"100%"}/>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.featureDesc}>
            <Typography variant={"h4"} className={classes.featureTitle}>Субтитры и переводчик</Typography>
            <Typography variant={"body1"} className={classes.featureText}>Субтитры на английском и других языках.</Typography>
            <Typography variant={"body1"} className={classes.featureText}>Переводите незнакомые слова или целые предложения во время просмотра.</Typography>
          </Grid>
        </Grid>
        <Grid container direction={"row"} className={classes.feature}>
          <Grid item sm={6} xs={12} className={classes.featureDesc}>
            <Typography variant={"h4"} className={classes.featureTitle}>Словарь</Typography>
            <Typography variant={"body1"} className={classes.featureText}>Добавляйте слова или фразы в личный словарь.</Typography>
            <Typography variant={"body1"} className={classes.featureText}></Typography>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.featureImg}>
            <img src={"/assets/dictFeature.png"} width={"100%"}/>
          </Grid>
        </Grid>
        <Grid container direction={"row"} className={classes.feature}>
          <Grid item sm={6} xs={12} className={classes.featureImg}>
            <img src={"/assets/trainingsFeature.png"} width={"100%"}/>
          </Grid>
          <Grid item sm={6} xs={12} className={classes.featureDesc}>
            <Typography variant={"h4"} className={classes.featureTitle}>Тренировки</Typography>
            <Typography variant={"body1"} className={classes.featureText}>Тренируйте добавленные слова.</Typography>
          </Grid>
        </Grid>
        {/*<div className={classes.first}>*/}
          {/*<div className={classes.tagWrapper}>*/}
            {/*<span className={classes.title}>Английский с удовольствием!</span>*/}
            {/*<span className={classes.subtitle}>Смотрите видео в оригинале, наслаждайтесь, учите язык</span>*/}
          {/*</div>*/}
          {/*<div className={classes.howItWork}>*/}
            {/*<span>Как это работает?</span>*/}
            {/*<Icon path={ChevronDoubleDown} size={1} color={"inherit"}/>*/}
          {/*</div>*/}
        {/*</div>*/}
        {/*{t("key")}*/}
        {/*<VideoPlayer url={"https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8"} spritesUrl={"http://localhost/video/gameofthrones/season1/episode1/sprites"}/>*/}
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

export default compose( withTranslation(), withStyles(style), connect(null, mapDispatchToProps))(WelcomePage);