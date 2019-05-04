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
    const {open, classes, placement, children, anchorEl, disablePortal, className, flip} = this.props;
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
            enabled: flip,
          },
        }}
      >
        <span className={classes.arrow} ref={this.handleArrowRef} />
        <Paper className={`${classes.paper} ${className}`}>
          {children}
        </Paper>
      </MuiPopper>
    )
  }
}

Popper.defaultProps = {
  flip: false
};

Popper.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object,
  placement: PropTypes.string,
  anchorEl: PropTypes.func,
  className: PropTypes.string,
  flip: PropTypes.bool,
};


export default withStyles(style)(Popper);