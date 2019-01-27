import React from "react";
import Button from "@material-ui/core/Button/Button";
import {style} from "./SocialButton.style";
import {withStyles} from "@material-ui/core";

const SocialButton = ({classes, src, ...props}) => (
  <Button variant={"contained"} classes={{root: classes.root}} {...props}>
    <img className={classes.icon} src={src}/>
    <span className={classes.text}>{props.children}</span>
  </Button>
);

export default withStyles(style)(SocialButton);