import React from "react";
import SocialButton from "./SocialButton";

const GoogleButton = ({...props}) => (
  <SocialButton src={require("../../assets/google.svg")} {...props}>
    {props.children}
  </SocialButton>
);

export default GoogleButton;