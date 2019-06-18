import React, {useState} from 'react';
import PropTypes from 'prop-types';
import placeholder from "../assets/acc-placeholder.png";
import {style} from "./AccountMenu.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {Icon} from "@mdi/react";
import {mdiChevronDown, mdiSettings} from "@mdi/js";
import {ClickAwayListener, List, ListItem, ListItemIcon, Divider} from "@material-ui/core";
import {mdiLogout, mdiViewDashboard} from "@mdi/js";
import {exit} from "../authorization/actions";
import {connect} from "react-redux";
import history from "../history";

const AccountMenu = ({classes, name, exit, role, email, givenName}) => {
  const [active, setActive] = useState(false);
  return (
    <ClickAwayListener onClickAway={() => {setActive(false);}}>
      <div className={`${classes.wrapper} ${active && classes.active}`}>

        <div onClick={() => setActive(!active)} className={classes.block}>
          <span className={classes.name}>{email || givenName}</span>
          <img src={placeholder} className={classes.profilePhoto} alt={"profile"}/>
          <Icon path={mdiChevronDown} size={1}/>
        </div>
        <div className={`${classes.menu} ${!active && classes.hidden}`}>
          <span className={classes.arrow}/>
          <List>
            <ListItem button className={classes.listItem} onClick={() => {history.push("/settings"); setActive(false)}}>
              <ListItemIcon>
                <Icon path={mdiSettings} size={1} className={classes.icon}/>
              </ListItemIcon>
              <span>Настройки</span>
            </ListItem>
            <Divider/>
            {role === "ADMIN" &&
              <ListItem button className={classes.listItem} onClick={() => {
                history.push("/admin");
                setActive(false)
              }}>
                <ListItemIcon>
                  <Icon path={mdiViewDashboard} size={1} className={classes.icon}/>
                </ListItemIcon>
                <span>Администрирование</span>
              </ListItem>
            }
            <Divider/>
            <ListItem button onClick={exit} className={classes.listItem}>
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

const mapStateToProps = (state) => ({
  role: state.settings.role,
  email: state.settings.email,
  givenName: state.settings.givenName
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(AccountMenu));
