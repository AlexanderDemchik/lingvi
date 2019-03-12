import React from "react";
import {Tooltip as MuiTooltip} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./Tooltip.style";

class Tooltip extends React.Component {
  state = {
    arrowRef: null,
  };

  handleArrowRef = node => {
    this.setState({
      arrowRef: node,
    });
  };

  render() {
    const {classes, title, children, ...other} = this.props;

    return (
      <MuiTooltip
        title={
          <React.Fragment>
            {title}
            <span className={classes.arrow} ref={this.handleArrowRef} />
          </React.Fragment>
        }
        classes={{
          tooltip: classes.bootstrapTooltip,
          popper: classes.bootstrapPopper,
          tooltipPlacementLeft: classes.bootstrapPlacementLeft,
          tooltipPlacementRight: classes.bootstrapPlacementRight,
          tooltipPlacementTop: classes.bootstrapPlacementTop,
          tooltipPlacementBottom: classes.bootstrapPlacementBottom,
        }}
        PopperProps={{
          popperOptions: {
            modifiers: {
              arrow: {
                enabled: Boolean(this.state.arrowRef),
                element: this.state.arrowRef,
              },
            },
          },
        }}
        {...other}
      >
        {children}
      </MuiTooltip>
    )
  }
}

export default withStyles(style)(Tooltip);
