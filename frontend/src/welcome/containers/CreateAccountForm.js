import React from "react";
import Dialog from "../../shared/Dialog";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {closeCreateAccountForm} from "../actions";
import {DialogContent, DialogTitle, Grid} from "@material-ui/core";
import RequestButton from "../../shared/RequestButton";
import {providerRegisterWithToken} from "../../authorization/actions";

class CreateAccountForm extends React.Component {

  timeout = null;

  componentDidUpdate(prevProps) {
    const {open, expireIn, handleClose} = this.props;
    if(prevProps.open !== this.props.open) {
      if (open) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(handleClose, expireIn - new Date().getTime());
      } else {
        clearTimeout(this.timeout);
      }
    }
  }

  render() {
    const {open, handleClose, isRegisterRequest, provider, accessToken, register, expireIn, ...props} = this.props;
    return (
      <Dialog open={open} onClose={handleClose} {...props}>
        <DialogTitle>
          Подтверждение создания аккаунта
        </DialogTitle>
        <DialogContent>
          <Grid container direction={"column"} spacing={8}>
            <Grid item>
              Еще ни один аккаунт не привязан к вашей учётной записи.
              Вы хотите создать аккаунт?
            </Grid>
            <Grid item>
              <Grid container justify={"flex-end"}>
                <RequestButton variant={"contained"} color={"secondary"} isRequest={isRegisterRequest}
                               onClick={() => {
                                 register(accessToken, provider);
                               }}>
                  Создать аккаунт
                </RequestButton>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.welcomePageState.createAccountForm.open,
  accessToken: state.welcomePageState.createAccountForm.accessToken,
  expireIn: state.welcomePageState.createAccountForm.expireIn,
  provider: state.welcomePageState.createAccountForm.provider,
  isRegisterRequest: state.authorization.register.isRegisterRequest
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeCreateAccountForm()),
  register: (token, provider) => dispatch(providerRegisterWithToken(token, provider))
});

export default compose(connect(mapStateToProps, mapDispatchToProps))(CreateAccountForm);