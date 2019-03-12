import React from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import PropsTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./Settings.style";
import {mdiSettings} from "@mdi/js";
import {Icon} from "@mdi/react";
import CheckableListItem from "./CheckableListItem";

class Settings extends React.Component {
  render() {

    const {classes, availableQualities, changeOpenState, open, changeQuality, currentQuality, qualityAutoSwitch} = this.props;
    return (
      <ClickAwayListener onClickAway={() => changeOpenState(false)}>
        <div className={classes.wrapper}>
          <Icon path={mdiSettings} className={`${classes.icon} ${open && classes.iconOpen}`} onClick={() => changeOpenState(!open)}/>
          <div className={`${classes.menu} ${!open && classes.hidden}`}>
            <CheckableListItem label={"Авто"} value={-1} checked={qualityAutoSwitch} onChange={changeQuality}/>
            {availableQualities.map((quality) => (
              <CheckableListItem key={quality} label={`${quality}p`} value={quality} checked={currentQuality === quality} onChange={changeQuality} icon={qualityAutoSwitch && "*"}/>
            ))}
          </div>
        </div>
      </ClickAwayListener>
    )
  }
}

Settings.propTypes = {
  open: PropsTypes.bool,
  changeOpenState: PropsTypes.func,
  availableQualities: PropsTypes.array,
  currentQuality: PropsTypes.number,
  changeQuality: PropsTypes.func,
  qualityAutoSwitch: PropsTypes.bool
};

export default withStyles(style)(Settings);