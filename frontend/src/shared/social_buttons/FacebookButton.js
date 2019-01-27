import React from "react";
import SocialButton from "./SocialButton";
import {withStyles} from "@material-ui/core";
import {style} from "./FacebookButton.style";

const FacebookButton = ({classes, ...props}) => (
  <SocialButton classes={{root: classes.root}} src={require("../../assets/facebook.svg")} {...props}>
    {props.children}
  </SocialButton>
);

export default withStyles(style)(FacebookButton);