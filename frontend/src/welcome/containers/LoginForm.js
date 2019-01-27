import React from "react";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {closeLoginForm, openRegisterForm} from "../actions";
import {compose} from "redux";
import TextField from "../../shared/TextField";
import {withStyles} from "@material-ui/core";
import {style} from "./LoginForm.style";
import GoogleButton from "../../shared/social_buttons/GoogleButton";
import classNames from "classnames";
import VkButton from "../../shared/social_buttons/VkButton";
import FacebookButton from "../../shared/social_buttons/FacebookButton";
import {Close} from "@material-ui/icons";
import {Typography} from "@material-ui/core";

class LoginForm extends React.PureComponent {

  Transition = (props) => (
    <Zoom in={false} timeout={{enter: 1000, exit: 1000}} {...props}/>
  );

  render() {
    const {open, handleClose, fullScreen, classes, openRegisterForm} = this.props;
    return (
      <Dialog
        open={open}
        fullScreen={fullScreen}
        TransitionComponent={this.Transition}
        onClose={handleClose}
        classes={{paperScrollBody: classes.dialog}}
        scroll={"body"}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {"Вход"}
          <Close className={classes.closeIcon} onClick={handleClose}/>
        </DialogTitle>
        <DialogContent>
          <TextField placeholder={"Email"} className={classes.bottomIntend}/>
          <TextField placeholder={"Password"} type={"password"} className={classes.bottomIntend}/>
          <Button color={"secondary"} variant={"contained"} fullWidth className={classes.bottomIntend}>ВОЙТИ</Button>
          <div className={classNames(classes.orWrapper, classes.bottomIntend)}>
            <div className={classes.orBefore}/>
            <div className={classes.or}>или</div>
            <div className={classes.orAfter}/>
          </div>
          <GoogleButton className={classes.bottomIntend}>Войти через google</GoogleButton>
          <VkButton className={classes.bottomIntend}>Войти через vk</VkButton>
          <FacebookButton className={classes.bottomIntend}>Войти через facebook</FacebookButton>
          <Typography onClick={openRegisterForm} className={classes.link} variant={"caption"}>СОЗДАТЬ АККАУНТ</Typography>
        </DialogContent>
      </Dialog>
    )
  }
}

LoginForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fullScreen: PropTypes.bool
};

const mapStateToProps = (state) => ({
  open: state.welcomePageState.loginForm.open
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeLoginForm()),
  openRegisterForm: () => {
    dispatch(closeLoginForm());
    dispatch(openRegisterForm());
  }
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(LoginForm);