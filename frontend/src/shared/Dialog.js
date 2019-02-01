import React from "react";
import {Dialog as MuiDialog, withStyles} from "@material-ui/core";
import {Close} from "@material-ui/icons";
import Zoom from '@material-ui/core/Zoom';
import {style} from "./Dialog.style";

export const Transition = (props) => (
  <Zoom in={false} timeout={{enter: 1000, exit: 1000}} {...props}/>
);

const Dialog = ({classes, children, TransitionComponent, onClose, ...props}) => (
  <MuiDialog TransitionComponent={TransitionComponent ? TransitionComponent : Transition}
             classes={{paperScrollBody: classes.dialog}}
             onClose={onClose}
             {...props}>
    <Close className={classes.closeIcon} onClick={onClose}/>
    {children}
  </MuiDialog>
);

export default withStyles(style)(Dialog);
