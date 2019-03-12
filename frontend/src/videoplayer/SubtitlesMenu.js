import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import PropsTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./SubtitlesMenu.style";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import CheckableListItem from "./CheckableListItem";

const SubtitlesMenu = ({changeOpenState, open, children, classes, availableSubtitles, selectedSubtitles, changeSubtitles}) => (
  <ClickAwayListener onClickAway={() => changeOpenState(false)}>
    <div className={classes.wrapper}>
    {children}
      <div className={`${classes.menu} ${!open && classes.hidden}`}>
        <CheckableListItem label={"Выкл"} value={"off"} checked={selectedSubtitles.length === 0} onChange={changeSubtitles}/>
        {availableSubtitles.map((sub) => (
          <div key={sub}>
            <CheckableListItem label={sub} value={sub} checked={selectedSubtitles.indexOf(sub) !== -1} onChange={changeSubtitles}/>
          </div>
        ))}
      </div>
    </div>
  </ClickAwayListener>
);

SubtitlesMenu.propTypes = {
  open: PropsTypes.bool,
  changeOpenState: PropsTypes.func,
  availableSubtitles: PropsTypes.array,
  changeSubtitles: PropsTypes.func,
  selectedSubtitles: PropsTypes.array
};

export default withStyles(style)(SubtitlesMenu)

