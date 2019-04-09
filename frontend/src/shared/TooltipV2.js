import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from "react-dom";
import Popper from "@material-ui/core/Popper/Popper";
import Paper from "@material-ui/core/Paper/Paper";
import {style} from "./TooltipV2.style";
import withStyles from "@material-ui/core/styles/withStyles";
import RootRef from '@material-ui/core/RootRef';
import {Grow} from "@material-ui/core";

class TooltipV2 extends Component {
  constructor(props) {
    super(props);
    this.node = null;

    this.state = {
      arrowRef: null,
      open: false,
    };
  }

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  onMouseEnter = (event) => {
    this.setState({open: true});

  };

  onMouseLeave = (event) => {
    this.setState({open: false});
  };


  render() {
    const {classes, placement, title, disablePortal, children} = this.props;
    const {arrowRef, open} = this.state;

    const childrenProps = {
      onMouseEnter: this.onMouseEnter,
      onMouseLeave: this.onMouseLeave
    };

    return (
      <React.Fragment>
        <RootRef rootRef={ref => this.node = ref}>{React.cloneElement(children, childrenProps)}</RootRef>
        <Popper
          open={this.node ? open : false}
          disablePortal={disablePortal}
          anchorEl={this.node}
          placement={placement}
          className={classes.popper}
          modifiers={{
            arrow: {
              enabled: true,
              element: arrowRef,
            },
            preventOverflow: {
              enabled: false,
              boundariesElement: 'window',
            },
            flip: {
              enabled: false,
            },
          }}
          transition
        >
          {({ TransitionProps, placement }) => (
          <Grow timeout={'auto'} {...TransitionProps} style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
            <div style={{userSelect: "none"}}>
              <span className={classes.arrow} ref={this.handleArrowRef} />
              <Paper className={classes.paper}>
                {title}
              </Paper>
            </div>
          </Grow>
          )}
        </Popper>
      </React.Fragment>
    );
  }
}

TooltipV2.propTypes = {};

export default withStyles(style)(TooltipV2);
