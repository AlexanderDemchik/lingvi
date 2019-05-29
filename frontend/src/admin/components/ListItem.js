import React, {cloneElement, Fragment} from "react";
import styles from "./ListItem.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@mdi/react";

const ListItem = ({icon, text, active, classes, component, customIcon, ...other}) => {
  return (
    cloneElement(component, {
      ...component.props,
      children: <Fragment><div className={classes.icon}>{icon ? <Icon path={icon} size={1}/> : customIcon}</div><span style={{lineHeight: 1}}>{text}</span></Fragment>,
      className: `${classes.root} ${active && classes.active}`,
      ...other

    })
  )
};

ListItem.defaultProps = {
  component: <div/>,
  customIcon: ""
};

export default withStyles(styles)(ListItem)