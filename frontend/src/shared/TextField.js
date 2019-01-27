import React from "react";
import PropTypes from "prop-types";
import {style} from "./TextField.style";
import {withStyles} from "@material-ui/core";
import classNames from "classnames";

const TextField = ({classes, className, ...props}) => (
  <input className={classNames(classes.textField, className)} {...props}/>
);

TextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
};

export default withStyles(style)(TextField);