import React from "react";
import {withStyles} from "@material-ui/core";
import {style} from "./Translate.style";
import Grid from "@material-ui/core/Grid/Grid";
import {mdiVolumeHigh, mdiBookPlus} from "@mdi/js";
import {Icon} from "@mdi/react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";

class Translate extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      isInit: false
    }
  }

  componentDidUpdate() {
    if(!this.state.isInit) {
      if(this.props.active) {
        this.setState({isInit: true});
      }
    }
  }

  componentDidMount() {
    if(this.props.active) {
      this.setState({isInit: true});
    }
  }

  render() {
    const {isInit} = this.state;
    const {classes, text} = this.props;
    return (
      <div className={classes.wrapper}>
        {isInit ?
          <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} className={classes.header}
                alignItems={"center"}>
            <Grid item>
              <span className={classes.word}>{text}</span>
            </Grid>
            <Grid item style={{alignSelf: "start"}}>
              <Grid container direction={"row"} alignItems={"center"} wrap={"nowrap"}>
                <Icon path={mdiVolumeHigh} size={1} className={classes.icon}/>
                <Icon path={mdiBookPlus} size={1} className={classes.icon}/>
              </Grid>
            </Grid>
          </Grid> : <div className={classes.loader}><ClipLoader color="inherit"/></div>
        }
      </div>
    )
  }
}

Translate.propTypes = {
  classes: PropTypes.object,
  text: PropTypes.string,
  active: PropTypes.bool
};

export default withStyles(style)(Translate);