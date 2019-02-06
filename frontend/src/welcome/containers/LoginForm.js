import React from "react";
import Dialog from '../../shared/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {closeLoginForm, openRegisterForm, openRestoreForm, setLoginFormErrorState} from "../actions";
import {compose} from "redux";
import TextField from "../../shared/TextField";
import {withStyles} from "@material-ui/core";
import {style} from "./LoginForm.style";
import GoogleButton from "../../shared/social_buttons/GoogleButton";
import classNames from "classnames";
import VkButton from "../../shared/social_buttons/VkButton";
import FacebookButton from "../../shared/social_buttons/FacebookButton";
import {Typography} from "@material-ui/core";
import {GOOGLE_LOGIN_REF, VK_LOGIN_REF} from "../../constants";
import {login} from "../../authorization/actions";
import RequestButton from "../../shared/RequestButton";
import Grid from "@material-ui/core/Grid/Grid";

class LoginForm extends React.PureComponent {

  state = {
    email: "",
    password: ""
  };

  render() {
    const {email, password} = this.state;
    const {open, handleClose, classes, openRegisterForm, isLoginRequest, login, isError, setLoginFormError, openRestoreForm} = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
      >
        <DialogTitle>
          {"Вход"}
        </DialogTitle>
        <DialogContent>
          {isError && <div className={classes.errorBlock}>
            {"Incorrect login or password"}
          </div>}
          <TextField placeholder={"Email"} error={isError} className={classes.bottomIntend} value={email} onChange={
            isError ? (
              (e) => {
                setLoginFormError(false);
                this.setState({email: e.target.value});
              }
            ) : (
              (e) => this.setState({email: e.target.value})
            )
          }/>
          <TextField placeholder={"Password"} error={isError} type={"password"} className={classes.bottomIntend} value={password} onChange={
            isError ? (
              (e) => {
                setLoginFormError(false);
                this.setState({password: e.target.value});
              }
            ) : (
              (e) => this.setState({password: e.target.value})
            )
          }/>
          <RequestButton color={"secondary"} variant={"contained"} fullWidth className={classes.bottomIntend} onClick={() => login(email, password)} isRequest={isLoginRequest}>ВОЙТИ</RequestButton>

          <div className={classNames(classes.orWrapper, classes.bottomIntend)}>
            <div className={classes.orBefore}/>
            <div className={classes.or}>или</div>
            <div className={classes.orAfter}/>
          </div>
          <GoogleButton className={classes.bottomIntend} href={GOOGLE_LOGIN_REF}>Войти через google</GoogleButton>
          <VkButton className={classes.bottomIntend} href={VK_LOGIN_REF}>Войти через vk</VkButton>
          <FacebookButton className={classes.bottomIntend}>Войти через facebook</FacebookButton>
          <Grid container direction={"row"} justify={"space-between"}>
            <Typography onClick={openRestoreForm} className={classes.link} variant={"caption"}>ЗАБЫЛИ ПАРОЛЬ?</Typography>
            <Typography onClick={openRegisterForm} className={classes.link} variant={"caption"}>СОЗДАТЬ АККАУНТ</Typography>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

LoginForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  openRegisterForm: PropTypes.func,
  isLoginRequest: PropTypes.bool,
  fullScreen: PropTypes.bool
};

const mapStateToProps = (state) => ({
  open: state.welcomePageState.loginForm.open,
  isError: state.welcomePageState.loginForm.isError,
  isLoginRequest: state.authorization.login.isLoginRequest
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeLoginForm()),
  openRegisterForm: () => {
    dispatch(closeLoginForm());
    dispatch(openRegisterForm());
  },
  openRestoreForm: () => {
    dispatch(closeLoginForm());
    dispatch(openRestoreForm());
  },
  login: (email, password) => dispatch(login(email, password)),
  setLoginFormError: (state) =>  dispatch(setLoginFormErrorState(state)),
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(LoginForm);