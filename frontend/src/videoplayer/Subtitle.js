import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import TranslateableWord from "./TranslateableWord";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import {styles} from "./Subtitle.style";
import Translateable from "./Translateable";
import {clearSelection, getSubtitleAtTime} from "./utils";

const Subtitle = ({classes, data, time}) => (
  <div className={classes.subtitle}>
    <Typography component={"div"} color={"inherit"} classes={{root: classes.text}}>
      {getSubtitleAtTime(data, time).map(sentence => (
        <React.Fragment>
          {sentence}<br/>
        </React.Fragment>
      ))}
    </Typography>
  </div>
);

Subtitle.propTypes = {
  data: PropTypes.array,//subtitles
  time: PropTypes.number,//current video time
  classes: PropTypes.object,
  paused: PropTypes.bool
};

export default withStyles(styles)(Subtitle);