import React from "react";
import {withStyles, Button, Grid} from "@material-ui/core";
import style from "./WelcomeBar.style";
import Locale from "./Locale";
import MediaQuery from "react-responsive";
import AppBar from "@material-ui/core/AppBar/AppBar";
import {withTranslation} from "react-i18next";
const WelcomeBar = ({classes, t, ...props}) => (
  <Grid className={classes.wrapper} container alignItems={"center"} justify={"space-between"} wrap={"nowrap"}>
    <Grid item>
      {/*<div className={classes.logo}>*/}
      {/*  Lingvi*/}
      {/*</div>*/}
    </Grid>
    <Grid item>
        <Grid container spacing={8} alignItems={"stretch"} wrap={"nowrap"}>
          <MediaQuery query="(min-width: 500px)">
            <Grid item>
              <Button color="inherit" onClick={props.openLoginForm} style={{color: "#fff"}}>
                {t('welcome.login')}
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={props.openRegisterForm}>
                {t('welcome.register')}
              </Button>
            </Grid>
          </MediaQuery>

          <MediaQuery query="(max-width: 499px)">
            <Grid item>
              <Button color="secondary" variant="contained" onClick={props.openLoginForm}>
                Войти
              </Button>
            </Grid>
          </MediaQuery>

          <Grid item>
            <Locale/>
          </Grid>
        </Grid>
    </Grid>
  </Grid>
);

export default withStyles(style)(withTranslation()(WelcomeBar))