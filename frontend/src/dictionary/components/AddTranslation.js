import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {style} from "./AddTranslation.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {Fade, Paper, Popper, ClickAwayListener} from "@material-ui/core";
import CombinedTextField from "./CombinedTextField";
import {mdiPlaylistPlus} from "@mdi/js/mdi";
import {Icon} from "@mdi/react";

class AddTranslation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.anchor = null;
  }

  onClick = (value) => {
    this.setState({open: value})
  };

  render() {
    const {classes, hover} = this.props;
    const {open} = this.state;
    return (
      <div>
        {<span ref={ref => this.anchor = ref} className={`${classes.addTranslation} ${!hover && classes.hidden}`} onClick={() => this.onClick(true)}>Добавить перевод</span>}
        <Popper open={open} anchorEl={this.anchor} className={classes.popper}>
          <ClickAwayListener onClickAway={() => this.onClick(false)}>
            <Paper className={classes.popperBody}>
              <CombinedTextField icon={<Icon path={mdiPlaylistPlus} size={1}/>} placeholder={"Введите перевод"}/>
            </Paper>
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

AddTranslation.propTypes = {};

export default withStyles(style)(AddTranslation);
