import React from "react";
import style from "./Locale.style";
import {withStyles, Grid} from "@material-ui/core";
import ButtonBase from "@material-ui/core/es/ButtonBase/ButtonBase";
import {ArrowDropDown} from "@material-ui/icons";
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {changeUiLanguage} from "../../settings/actions";
import {connect} from "react-redux";

const Locale = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);

  return (
    <React.Fragment>
      <ButtonBase classes={{root: props.classes.localeWrapper }} buttonRef={anchorEl} onClick={() => setOpen(true)}>
        <span style={{color: "#fff"}}>
          {props.uiLanguage}
        </span>
        <ArrowDropDown style={{fill: "#fff"}}/>
      </ButtonBase>
      <Popper open={open} anchorEl={anchorEl.current} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <MenuList>
                  <MenuItem onClick={() => {props.changeUiLanguage("RU"); setOpen(false)}}>RU</MenuItem>
                  <MenuItem onClick={() => {props.changeUiLanguage("EN"); setOpen(false)}}>EN</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  uiLanguage: state.settings.uiLanguage
});

const mapDispatchToProps = (dispatch) => ({
  changeUiLanguage: (lang) => dispatch(changeUiLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Locale));