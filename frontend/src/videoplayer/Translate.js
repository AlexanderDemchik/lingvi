import React from "react";
import {withStyles} from "@material-ui/core";
import {style} from "./Translate.style";
import Grid from "@material-ui/core/Grid/Grid";
import {mdiVolumeHigh, mdiBookPlus} from "@mdi/js";
import {Icon} from "@mdi/react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import api from "./../api";

class Translate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      translated: null,
      loading: false,
      isInit: false
    }
  }

  componentDidUpdate() {
    if(!this.state.isInit) {
      if(this.props.active) {
        this.setState({isInit: true}, () => this.getTranslation(this.props.text));
      }
    }
  }

  componentDidMount() {
    if(this.props.active) {
      this.setState({isInit: true}, () => this.getTranslation(this.props.text));
    }
  }

  getTranslation = (word) => {
    this.setState({loading: true});
    api.get(`http://localhost:8080/dictionary/translation?text=${word}&from=EN&to=RU`)
      .then((r) => {
        this.setState({translated: r.data, loading: false})
      }).catch((err) => {
        this.setState({loading: false});
      })
  };

  render() {
    const {isInit, loading, translated} = this.state;
    const {classes, text} = this.props;
    return (
      <div className={classes.wrapper}>
        {isInit && !loading  ?
          <React.Fragment>
            <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} className={classes.header}
                  alignItems={"center"} spacing={8}>
              <Grid item>
                <span className={classes.word}>{text}</span>
              </Grid>
              <Grid item style={{alignSelf: "start"}}>
                <Grid container direction={"row"} alignItems={"center"} wrap={"nowrap"}>
                  <Icon path={mdiVolumeHigh} size={1} className={classes.icon}/>
                  <Icon path={mdiBookPlus} size={1} className={classes.icon}/>
                </Grid>
              </Grid>
            </Grid>
            <Grid container direction={"column"}>
              {translated && translated.translations.map((el) => (
                <div>{el.translation}</div>
              ))}
            </Grid>
          </React.Fragment> : <div className={classes.loader}><ClipLoader color="inherit"/></div>
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