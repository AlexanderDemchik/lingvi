import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';
import {style} from "./BootstrapTextField.style";
import {withStyles} from "@material-ui/core";

const BootstrapTextField = forwardRef(({value, onChange, classes, ...props}, innerRef) => {
  return (
    <input value={value} onChange={onChange} className={classes.textField} ref={innerRef} {...props}/>
  );
});

BootstrapTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  classes: PropTypes.object,
  innerRef: PropTypes.func,
};

export const TextField = withStyles(style)(BootstrapTextField);
export default withStyles(style)(BootstrapTextField);
