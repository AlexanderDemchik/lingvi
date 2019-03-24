import React from 'react';
import PropTypes from 'prop-types';
import {AppBar as Bar} from "@material-ui/core"
import Button from "@material-ui/core/Button/Button";
import {style} from "./AppBar.style";
import withStyles from "@material-ui/core/styles/withStyles";
import logo from "../assets/logov2.png";
import Toolbar from "@material-ui/core/es/Toolbar/Toolbar";
import Link from "./Link";
import {withRouter} from 'react-router-dom';
import AccountMenu from "./AccountMenu";
import Grid from "@material-ui/core/Grid/Grid";

const AppBar = ({classes, location}) => {
  return (
    <Bar position={"sticky"} color={"inherit"} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Link to={"/"} active={location.pathname === "/"}>Домой</Link>
        <Link to={"/video"} active={location.pathname.startsWith("/video")}>Видео</Link>
        <Link to={"/dictionary"} active={location.pathname.startsWith("/dictionary")}>Словарь</Link>
        <Grid container alignItems={"center"} justify={"flex-end"} style={{height: "100%"}}>
          <AccountMenu/>
        </Grid>
      </Toolbar>
    </Bar>
  );
};

AppBar.propTypes = {

};


export default withRouter(withStyles(style)((AppBar)));
