import React, {useState} from 'react';
import PropTypes from 'prop-types';
import placeholder from "../assets/acc-placeholder.png";
import {style} from "./AccountMenu.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {Icon} from "@mdi/react";
import {mdiChevronDown, mdiSettings} from "@mdi/js";
import {ClickAwayListener, List, ListItem, ListItemIcon, Divider} from "@material-ui/core";
import {mdiLogout} from "@mdi/js";
import {exit} from "../authorization/actions";
import {connect} from "react-redux";

const AccountMenu = ({classes, name, exit}) => {
  const [active, setActive] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => {setActive(false);}}>
      <div className={`${classes.wrapper} ${active && classes.active}`}>

        <div onClick={() => setActive(!active)} className={classes.block}>
          <span className={classes.name}>Alexander</span>
          <img src={placeholder} className={classes.profilePhoto} alt={"profile"}/>
          <Icon path={mdiChevronDown} size={1}/>
        </div>
        <div className={`${classes.menu} ${!active && classes.hidden}`}>
          <span className={classes.arrow}/>
          <List>
            <ListItem button>
              <ListItemIcon>
                <Icon path={mdiSettings} size={1} className={classes.icon}/>
              </ListItemIcon>
              <span>Настройки</span>
            </ListItem>
            <Divider/>
            <ListItem button onClick={exit}>
              <ListItemIcon>
                <Icon path={mdiLogout} size={1} className={classes.icon}/>
              </ListItemIcon>
              <span>Выйти</span>
            </ListItem>
          </List>
        </div>
      </div>
    </ClickAwayListener>
  );
};

AccountMenu.propTypes = {

};

const mapDispatchToProps = (dispatch) => ({
  exit: () => dispatch(exit())
});

export default connect(null, mapDispatchToProps)(withStyles(style)(AccountMenu));
