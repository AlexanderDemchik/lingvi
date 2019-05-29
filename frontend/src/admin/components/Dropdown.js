import React, {useState, Fragment} from "react";
import Icon from "@mdi/react";
import {withStyles} from "@material-ui/core";
import styles from "./Dropdown.style";
import {mdiMenuDown} from "@mdi/js";
import Collapse from '@material-ui/core/Collapse';

const Dropdown = ({icon, text, active, classes, children}) => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <div className={`${classes.root} ${active && classes.active}`} onClick={() => setOpen(!open)}>
        <Icon path={icon} size={1} style={{marginRight: 7}}/>
        <span style={{lineHeight: 1, display: "flex", flexGrow: 1}}>{text}</span>
        <Icon path={mdiMenuDown} rotate={open ? 180 : 0} size={1} className={classes.downIcon}/>
      </div>
      <Collapse in={open}>
        {children}
      </Collapse>
    </Fragment>
  );
};

export default withStyles(styles)(Dropdown);