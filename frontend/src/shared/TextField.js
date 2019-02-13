import React from "react";
import PropTypes from "prop-types";
import {style} from "./TextField.style";
import {withStyles} from "@material-ui/core";
import classNames from "classnames";

const TextField = ({classes, className, error, required, ...props}) => (
  <div className={classes.textFieldWrapper}>
    <input className={classNames(classes.textField, {[classes.error]:error}, className)} {...props}/>
    {required && <span className={classes.required}>*</span>}
  </div>
);

TextField.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.bool,
  required: PropTypes.bool
};

export default withStyles(style)(TextField);