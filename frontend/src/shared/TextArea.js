import React, {forwardRef} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./TextArea.style";

const TextArea = forwardRef(({value, onChange, classes, required, ...props}, innerRef) => (
  <div className={classes.root}>
    <textarea value={value} onChange={onChange} ref={innerRef} className={classes.area} {...props}/>
    {required && <span className={classes.required}>*</span>}
  </div>
));

export default withStyles(styles)(TextArea);
