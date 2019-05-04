import React, {Fragment, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Tooltip from "../../shared/Tooltip";
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import {style} from "./TableHeader.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid/Grid";
import {TextField} from "../../shared/BootstrapTextField";
import {mdiMagnify, mdiDelete} from "@mdi/js";
import {Icon} from "@mdi/react";
import Button from "@material-ui/core/Button/Button";
import Popper from "../../shared/Popper";
import TranslationTooltip from "../../shared/TranslationTooltip";
import RequestButton from "../../shared/RequestButton";

const TableHeader = ({selectAllDisabled, selectAll, classes, deleteDictionary, selected, onSelectAll, onFilterChange, currentDict, filterValue, onSearch, onDeleteAll, deleteAllProceed, onAddToDictionary, onDeleteFromDictionary}) => {

  const inputRef = useRef(null);
  const [showTranslationPopper, setShowTranslationPopper] = useState(false);

  const onAddBtnClick = () => {
    if (filterValue.trim().length > 0) {
      setShowTranslationPopper(true);
    }
  };

  return (
    <Grid container alignItems={"center"} className={classes.wrapper} wrap={"nowrap"}>
      <Grid container alignItems={"center"} wrap={"nowrap"}>
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
                <RequestButton variant={"contained"} color={"secondary"} onClick={() => onDeleteAll(selected)} isRequest={deleteAllProceed}>Удалить</RequestButton>
              </Grid>
            </>
          ) : (
            <Grid container alignItems={"center"} direction={"row"} wrap={"nowrap"} spacing={8}>
              <Grid item><TextField placeholder={"search..."} value={filterValue} onChange={(e) => {onFilterChange(e.target.value); setShowTranslationPopper(false)}} innerRef={inputRef}/></Grid>
              <Grid item><Button variant={"contained"} color={"secondary"} onClick={onAddBtnClick}>Добавить</Button></Grid>
              <TranslationTooltip anchorEl={() => inputRef.current} open={showTranslationPopper} onClickAway={() => setShowTranslationPopper(false)} text={filterValue} from={currentDict && currentDict.from} to={currentDict && currentDict.to} postAdd={(word) => {
                onAddToDictionary(word);
                setShowTranslationPopper(false);
              }} postDelete={(id) => {
                onDeleteFromDictionary(id);
              }}/>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Tooltip placement={"top"} title={"Удалить словарь"}>
        <Icon className={classes.deleteDict} path={mdiDelete} size={1} onClick={() => deleteDictionary(currentDict.from, currentDict.to)}/>
      </Tooltip>
    </Grid>
  );
};

TableHeader.propTypes = {
  selectAllDisabled: PropTypes.bool,
  classes: PropTypes.object,
  selectAll: PropTypes.bool,
  selected: PropTypes.array,
  onSelectAll: PropTypes.func,
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  onSearch: PropTypes.func,
  deleteAllProceed: PropTypes.bool,
  onDeleteAll: PropTypes.func,
};

export default withStyles(style)(TableHeader);
