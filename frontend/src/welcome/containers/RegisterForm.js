import React from "react";
import Dialog from '../../shared/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {closeRegisterForm, openLoginForm} from "../actions";
import {compose} from "redux";
import {style} from "./RegisterForm.style";
import TextField from "../../shared/TextField";
import GoogleButton from "../../shared/social_buttons/GoogleButton";
import VkButton from "../../shared/social_buttons/VkButton";
import FacebookButton from "../../shared/social_buttons/FacebookButton";
import {Typography, Grid} from "@material-ui/core";
import {GOOGLE_REGISTER_REF, VK_REGISTER_REF} from "../../constants";
import {register} from "../../authorization/actions";
import RequestButton from "../../shared/RequestButton";

class RegisterForm extends React.PureComponent {

  state = {
    name: "",
    surname: "",
    email: "",
    password: ""
  };

  render() {
    const {name, surname, email, password} = this.state;
    const {open, handleClose, classes, openLoginForm, isRequest, register} = this.props;
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
      >
        <DialogTitle>
          {"Регистрация"}
        </DialogTitle>
        <DialogContent>
          <Grid container direction={"column"} spacing={8}>
            <Grid container item direction={"row"} spacing={8}>
              <Grid item xs={6}>
                <TextField placeholder={"Имя"} onChange={(e) => this.setState({name: e.target.value})}/>
              </Grid>
              <Grid item xs={6}>
                <TextField placeholder={"Фамилия"} onChange={(e) => this.setState({surname: e.target.value})}/>
              </Grid>
            </Grid>

            <Grid item>
              <TextField placeholder={"Email"} onChange={(e) => this.setState({email: e.target.value})}/>
            </Grid>

            <Grid item>
              <TextField placeholder={"Password"} type={"password"} onChange={(e) => this.setState({password: e.target.value})}/>
            </Grid>

            <Grid item>
              <RequestButton color={"secondary"} variant={"contained"} fullWidth isRequest={isRequest}
                             onClick={() => register(name, surname, email, password)}>СОЗДАТЬ АККАУНТ</RequestButton>
            </Grid>

            <Grid item>
              <div className={classes.orWrapper}>
                <div className={classes.orBefore}/>
                <div className={classes.or}>или</div>
                <div className={classes.orAfter}/>
              </div>
            </Grid>

            <Grid item>
              <GoogleButton href={GOOGLE_REGISTER_REF}>Войти через google</GoogleButton>
            </Grid>
            <Grid item>
              <VkButton href={VK_REGISTER_REF}>Войти через vk</VkButton>
            </Grid>
            <Grid item>
              <FacebookButton>Войти через facebook</FacebookButton>
            </Grid>

            <Grid item>
              <Typography onClick={openLoginForm} className={classes.link} variant={"caption"}>У МЕНЯ УЖЕ ЕСТЬ АККАУНТ</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

RegisterForm.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  fullScreen: PropTypes.bool
};

const mapStateToProps = (state) => ({
  open: state.welcomePageState.registerForm.open,
  isRequest: state.authorization.register.isRegisterRequest
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeRegisterForm()),
  openLoginForm: () => {
    dispatch(closeRegisterForm());
    dispatch(openLoginForm());
  },
  register: (name, surname, email, pass) => dispatch(register(email, pass, name, surname))
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(RegisterForm);