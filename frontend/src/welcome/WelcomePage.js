import React, {Component} from "react";
import WelcomeBar from "./components/WelcomeBar";
import {withStyles} from "@material-ui/core";
import {ChevronDoubleDown} from "mdi-material-ui";
import {style} from "./WelcomePage.style";
import LoginForm from "./containers/LoginForm";
import {openLoginForm, openRegisterForm} from "./actions";
import {connect} from "react-redux";
import {compose} from "redux";
import RegisterForm from "./containers/RegisterForm";
import CreateAccountForm from "./containers/CreateAccountForm";

class WelcomePage extends Component {

  render() {
    const {classes, openLoginForm, openRegisterForm} = this.props;
    return (
      <React.Fragment>
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
            <ChevronDoubleDown/>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  openLoginForm: () => dispatch(openLoginForm()),
  openRegisterForm: () => dispatch(openRegisterForm())
});

export default compose(withStyles(style), connect(null, mapDispatchToProps))(WelcomePage);