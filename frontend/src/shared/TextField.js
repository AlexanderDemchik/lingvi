import React from "react";
import PropTypes from "prop-types";
import {style} from "./TextField.style";
import {withStyles} from "@material-ui/core";
import classNames from "classnames";

const TextField = ({classes, className, error, ...props}) => (
  <input className={classNames(classes.textField, {[classes.error]:error}, className)} {...props}/>
);

TextField.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool
};

export default withStyles(style)(TextField);