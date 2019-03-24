import React from "react";
import style from "./Locale.style";
import {withStyles, Grid} from "@material-ui/core";
import ButtonBase from "@material-ui/core/es/ButtonBase/ButtonBase";
import {ArrowDropDown} from "@material-ui/icons";
import {ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper} from "@material-ui/core";
import {changeUiLanguage} from "../../account/actions";
import {connect} from "react-redux";

const Locale = (props) => {
  const [open, setOpen] = React.useState(false);
  const anchorEl = React.useRef(null);

  return (
    <React.Fragment>
      <ButtonBase classes={{root: props.classes.localeWrapper }} buttonRef={anchorEl} onClick={() => setOpen(true)}>
        <span>
          {props.uiLanguage}
        </span>
        <ArrowDropDown/>
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
                  <MenuItem onClick={() => props.changeUiLanguage("ru")}>RU</MenuItem>
                  <MenuItem onClick={() => props.changeUiLanguage("en")}>EN</MenuItem>
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
  uiLanguage: state.account.uiLanguage
});

const mapDispatchToProps = (dispatch) => ({
  changeUiLanguage: (lang) => dispatch(changeUiLanguage(lang))
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Locale));