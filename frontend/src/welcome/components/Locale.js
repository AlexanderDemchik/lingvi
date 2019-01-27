import React from "react";
import style from "./Locale.style";
import {withStyles, Grid} from "@material-ui/core";
import ButtonBase from "@material-ui/core/es/ButtonBase/ButtonBase";
import {ArrowDropDown} from "@material-ui/icons";

const Locale = (props) => (
  <ButtonBase classes={{root: props.classes.localeWrapper }}>
      <span>
        RU
      </span>
      <ArrowDropDown/>
  </ButtonBase>
);

export default withStyles(style)(Locale);