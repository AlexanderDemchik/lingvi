import React from 'react';
import PropTypes from 'prop-types';
import Tooltip from "../../shared/Tooltip";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {style} from "./TableHeader.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import SearchField from "./CombinedTextField";
import {mdiMagnify} from "@mdi/js";
import {Icon} from "@mdi/react";
import Button from "@material-ui/core/Button/Button";

const TableHeader = ({selectAllDisabled, selectAll, classes, selected, onSelectAll, onFilterChange, filterValue, onSearch}) => (
  <Grid container alignItems={"center"} className={classes.wrapper}>
    <Grid item>
      <Tooltip placement={"top"} title={"Выделить все слова"}>
        <Checkbox checked={selectAll} onClick={onSelectAll} disabled={selectAllDisabled} classes={{root: classes.selectAllCheckbox}}/>
      </Tooltip>
    </Grid>
    <Grid item>
      {selected.length > 0 ? (
        <>
          <Grid container alignItems={"center"}>
            <span className={classes.selected}>Выбрано: {selected.length}</span>
            <Button variant={"contained"} color={"primary"}>Удалить</Button>
          </Grid>
        </>
      ) : (
        <SearchField placeholder={"search..."} value={filterValue} onChange={(e) => onFilterChange(e.target.value)} onClick={onSearch} icon={<Icon path={mdiMagnify} size={1}/>}/>
      )}
    </Grid>
  </Grid>
);

TableHeader.propTypes = {
  selectAllDisabled: PropTypes.bool,
  classes: PropTypes.object,
  selectAll: PropTypes.bool,
  selected: PropTypes.array,
  onSelectAll: PropTypes.func,
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
};

export default withStyles(style)(TableHeader);
