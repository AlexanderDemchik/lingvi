import React from "react";
import styles from "./Progress.style";
import {withStyles} from "@material-ui/core";

const Progress = ({value, classes}) => {

  return (
    <div className={classes.root}>
      <span style={{width: `${value}%`}} className={classes.stripped}/>
    </div>
  );
};

export default withStyles(styles)(Progress);