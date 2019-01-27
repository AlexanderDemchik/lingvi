import React from "react";
import {style} from "./VkButton.style";
import {withStyles} from "@material-ui/core";
import SocialButton from "./SocialButton";

const VkButton = ({classes, ...props}) => (
  <SocialButton classes={{root: classes.root}} src={require("../../assets/vk.svg")} {...props}>
    {props.children}
  </SocialButton>
);

export default withStyles(style)(VkButton);