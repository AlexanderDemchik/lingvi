import React from "react";
import Dialog from "../../shared/Dialog";
import {DialogTitle, DialogContent} from "@material-ui/core";
import TextField from "../../shared/TextField";
import {closeRestoreForm} from "../actions";
import {connect} from "react-redux";
import RequestButton from "../../shared/RequestButton";
import Grid from "@material-ui/core/Grid/Grid";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./RestoreForm.style";

class RestoreForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    }
  }

  render() {
    const {email} = this.state;
    const {open, handleClose, isRequest, classes} = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Восстановление</DialogTitle>
        <DialogContent>
          <Grid container direction={"column"} spacing={8}>
            <Grid item>
              <div className={classes.textContent}>
                Введите ваш email и мы вышлем на него инструкции по восстановлению пароля
              </div>
            </Grid>
            <Grid item>
              <TextField value={email} onChange={e => this.setState({email: e.target.value})} placeholder={"Email"}/>
            </Grid>
            <Grid item>
              <RequestButton color={"secondary"} variant={"contained"} fullWidth={true}>ВОССТАНОВИТЬ</RequestButton>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }
}

const mapStateToProps = (state) => ({
  open: state.welcomePageState.restoreForm.open
});

const mapDispatchToProps = (dispatch) => ({
  handleClose: () => dispatch(closeRestoreForm())
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(RestoreForm));
