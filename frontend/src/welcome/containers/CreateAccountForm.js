import React from "react";
import Dialog from "../../shared/Dialog";
import {compose} from "redux";
import {withStyles} from "@material-ui/core";
import {style} from "./CreateAccountForm.style";
import {connect} from "react-redux";
import {closeCreateAccountForm} from "../actions";
import {DialogContent, DialogTitle, Grid} from "@material-ui/core";
import RequestButton from "../../shared/RequestButton";

const CreateAccountForm = ({open, handleClose, ...props}) => (
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
            <RequestButton variant={"contained"} color={"secondary"}>
              Создать аккаунт
            </RequestButton>
          </Grid>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

const mapStateToProps = (state) => ({
  open: state.welcomePageState.createAccountForm.open,
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeCreateAccountForm())
});

export default compose(withStyles(style), connect(mapStateToProps, mapDispatchToProps))(CreateAccountForm);