import React from "react";
import styles from "./ListItem.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@mdi/react";

const ListItem = ({icon, text, active, classes}) => {
  return (
    <div className={`${classes.listItem} ${active && classes.active}`}>
      <Icon path={icon} size={1}/>
      <span>{text}</span>
    </div>
  )
};

export default withStyles(styles)(ListItem)