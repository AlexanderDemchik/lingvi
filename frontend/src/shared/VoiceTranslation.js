import React, {Fragment} from "react";
import Tooltip from "./Tooltip";
import {style} from "./VoiceTranslation.style";
import withStyles from "@material-ui/core/styles/withStyles";
import SvgIcon from "./icons/SvgIcon";
import {DICTIONARY_SOUND_PATH} from "../api";
import api from "../api";
import PropTypes from "prop-types";

class VoiceTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {playing: false};
    this.audio = null;
  }

  playSound = async () => {
    const {word} = this.props;
    if (this.audio == null) {
      if (word.soundUrl == null) {
        let result = await api.get(`${DICTIONARY_SOUND_PATH}?text=${word.text}&lang=${word.language}`);
        this.audio = new Audio(result.data.url);
      } else {
        this.audio = new Audio(word.soundUrl);
      }
    }

    this.audio.onplaying = () => this.setState({playing: true});
    this.audio.onended = () => this.setState({playing: false});

    this.audio.play();
  };

  componentDidUpdate(prevProps) {
    if (prevProps.word.id !== this.props.word.id) {
      this.clearAudio();
      this.setState({playing: false});
    }
  }

  componentWillUnmount() {
    this.clearAudio();
  };

  clearAudio() {
    if (this.audio) {
      this.audio.onplaying = null;
      this.audio.onended = null;
      this.audio = null;
    }
  }

  onClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.playSound();
  };

  render() {
    const {playing} = this.state;
    const {classes, word, children, withLabel} = this.props;
    return (
      <Fragment>
        {withLabel ? (
          <div className={`${classes.icon} ${playing && classes.playing}`} onClick={this.onClick}>
            {children ? children : <SvgIcon name={"volume"} size={24} style={{marginRight: 5}}/>}
            <span className={`${playing && classes.playing}`}>[{word.transcription}]</span>
          </div>
        ) : (
          <Fragment>
            {word.transcription ? (
              <Tooltip placement={"top"} title={word.transcription}>
                <div className={`${classes.icon} ${playing && classes.playing}`} onClick={this.onClick}>
                  {children ? children : <SvgIcon name={"volume"} size={24}/>}
                </div>
              </Tooltip>
            ) : (
              <div className={`${classes.icon} ${playing && classes.playing}`} onClick={this.onClick}>
                {children ? children : <SvgIcon name={"volume"} size={24}/>}
              </div>
            )}
          </Fragment>
        )}
      </Fragment>
    )
  }
}

VoiceTranslation.defaultProps = {
  withLabel: false
};

VoiceTranslation.propTypes = {
  word: PropTypes.object,
  children: PropTypes.element,
  classes: PropTypes.object,
  size: PropTypes.number, //default icon size
  withLabel: PropTypes.bool
};

export default withStyles(style)(VoiceTranslation);