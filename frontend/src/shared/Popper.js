import React from "react";
import {Popper as MuiPopper, Paper} from "@material-ui/core"
import {style} from "./Popper.style";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

class Popper extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowRef: null
    }
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  render() {
    const {open, classes, placement, children, anchorEl, disablePortal} = this.props;
    const {arrowRef} = this.state;
    return (
      <MuiPopper
        open={open}
        disablePortal={disablePortal}
        anchorEl={anchorEl}
        placement={placement}
        className={classes.popper}
        modifiers={{
          arrow: {
            enabled: true,
            element: arrowRef,
          },
          preventOverflow: {
            enabled: true,
            boundariesElement: 'window',
          },
          flip: {
            enabled: false,
          },
        }}
      >
        <span className={classes.arrow} ref={this.handleArrowRef} />
        <Paper className={classes.paper}>
          {children}
        </Paper>
      </MuiPopper>
    )
  }
}

Popper.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  placement: PropTypes.string,
  anchorEl: PropTypes.func,
};


export default withStyles(style)(Popper);