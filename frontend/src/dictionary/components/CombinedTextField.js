import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {style} from "./CombinedTextField.style";
import {withStyles, Button} from "@material-ui/core";

const CombinedTextField = ({value, onChange, classes, onClick, icon, ...props}) => {
  return (
    <div className={classes.wrapper}>
      <input value={value} onChange={onChange} className={classes.textField} {...props}/>
      <Button variant={"contained"} color={"secondary"} classes={{root: classes.button}} onClick={onClick}>
        {icon}
      </Button>
    </div>
  );
};

CombinedTextField.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
  classes: PropTypes.object,
  icon: PropTypes.element
};

export default withStyles(style)(CombinedTextField);
