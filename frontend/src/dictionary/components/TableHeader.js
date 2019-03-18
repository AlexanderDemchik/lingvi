import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Tooltip from "../../shared/Tooltip";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {style} from "./TableHeader.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";

const TableHeader = ({selectAllDisabled, selectAll, classes, selected, onSelectAll, ...props}) => (
  <Grid container alignItems={"center"}>
    <Grid item>
      <Tooltip placement={"top"} title={"Выделить все слова"}>
        <Checkbox checked={selectAll} onClick={onSelectAll} disabled={selectAllDisabled} classes={{root: classes.selectAllCheckbox}}/>
      </Tooltip>
    </Grid>
    <Grid item>
      {selected.length > 0 && selected.length}
    </Grid>
  </Grid>
);

TableHeader.propTypes = {
  selectAllDisabled: PropTypes.bool,
  classes: PropTypes.object,
  selectAll: PropTypes.bool,
  selected: PropTypes.array,
  onSelectAll: PropTypes.func
};

export default withStyles(style)(TableHeader);
