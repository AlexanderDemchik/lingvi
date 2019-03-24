import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {style} from "./TableRow.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Checkbox from "@material-ui/core/Checkbox/Checkbox"
import {Icon} from "@mdi/react";
import {mdiDelete} from "@mdi/js";
import VoiceTranslation from "../../shared/VoiceTranslation";

class TableRow extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.row === undefined || this.props.row === null) return true;
    if ((nextProps.row.id !== this.props.row.id)) return true;
    if (nextProps.selected !== this.props.selected) return true;
    if (nextProps.i !== this.props.i) return true;
    return false;
  }

  render() {
    const {classes, row, onSelect, selected, onDelete, onRowClick} = this.props;
    return (
      <div className={classes.row}>
        <div className={classes.column}>
          <Checkbox checked={selected} onClick={onSelect}/>
        </div>
        <div className={`${classes.column} ${classes.volume}`}>
          <VoiceTranslation word={row.word}/>
        </div>
        <div style={{cursor: "pointer", display: "flex", flexDirection: "row", flexWrap: "nowrap"}} onClick={onRowClick}>
          <div className={`${classes.column} ${classes.word}`}>
            {row.word.text}
          </div>
          <div className={`${classes.column} ${classes.delimiter}`}>
            —
          </div>
          <div className={`${classes.column} ${classes.translation}`}>
            {row.userTranslations.map(tr => tr.translation).join(", ")}
          </div>
        </div>
        <div className={`${classes.column} ${classes.delete}`}>
          <Icon path={mdiDelete} size={1} className={classes.deleteIcon} onClick={onDelete}/>
        </div>
      </div>
    );
  }
}

TableRow.propTypes = {
  classes: PropTypes.object,
  word: PropTypes.object,
  onSelect: PropTypes.func,
  selected: PropTypes.bool,
  onDelete: PropTypes.func
};

export default withStyles(style)(TableRow);
