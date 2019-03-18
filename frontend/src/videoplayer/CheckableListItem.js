import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./CheckableListItem.style";
import PropTypes from "prop-types";
import {mdiCheck} from "@mdi/js";
import {Icon} from "@mdi/react";
import Grid from "@material-ui/core/Grid/Grid";

class CheckableListItem extends React.Component {
  render() {
    const {checked, onChange, label, classes, value, key, icon} = this.props;
    return (
      <Grid key={key && key} container direction={"row"} wrap={"nowrap"} justify={"space-between"} alignItems={"center"} className={classes.wrapper} onClick={() => onChange(value, !checked)}>
        <Grid item className={classes.tick}>
          {checked && (icon ? <div className={classes.tickIcon}>{icon}</div> : <Icon path={mdiCheck} className={classes.tickIcon}/>)}
        </Grid>
        <Grid item className={classes.label}>
          {label}
        </Grid>
      </Grid>
    )
  }
}

CheckableListItem.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  classes: PropTypes.object,
  value: PropTypes.any,
  icon: PropTypes.node
};

export default withStyles(style)(CheckableListItem);