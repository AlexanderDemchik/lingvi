import React from "react";
import ReactPlayer from 'react-player'
import Controls from "./Controls";
import {withStyles} from "@material-ui/core";
import {style} from "./VideoPlayer.style";
import {mdiPlayCircle} from "@mdi/js";
import {Icon} from "@mdi/react";
import {ClipLoader} from "react-spinners";
import {throttle} from "lodash";
import Subtitle from "./Subtitle";
import subList from "../assets/gots1e1";
import PropTypes from "prop-types";

const MOUSE_DOWNTIME = 5000;

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      started: false,
      played: 0,
      playedSeconds: 0,
      duration: 0,
      buffered: [],
      playing: false,
      loading: false,
      volume: 0,
      mouseActive: false,
      fullScreen: false,
      paused: false
    }
  }

  playerRef = null;
  hlsRef = null;
  wrapperRef = null;
  downtimeTimeout = null;

  componentDidMount() {
    document.addEventListener('webkitfullscreenchange', () => this.setState({fullScreen: document.webkitFullscreenElement}), false);
    document.addEventListener('mozfullscreenchange', () => this.setState({fullScreen: document.mozFullScreenElement}), false);
    document.addEventListener('fullscreenchange', () => this.setState({fullScreen: document.fullscreenElement}), false);
    document.addEventListener('MSFullscreenChange', () => this.setState({fullScreen: document.msFullscreenElement}), false);
  }

  componentDidUpdate() {
    if(this.state.initialized && this.state.started) {
      if(this.state.playing && !this.state.paused) {
        this.playerRef.getInternalPlayer().play();
      }
    }
  };

  onPosterPlayBtnClick = () => {
    this.setState({initialized: true, playing: true});
  };

  changeVolume = (volume) => {
    this.setState({volume: volume})
  };

  changePlaying = (state) => {
    state ? this.setState({playing: state, paused: false}) : this.setState({playing: state});
  };

  onStart = () => {

    const duration = this.playerRef.getDuration();
    this.hlsRef = this.playerRef.getInternalPlayer('hls');

    this.setState({duration});

    this.hlsRef.on(window.Hls.Events.ERROR, (event, { details }) => {
      if (details === window.Hls.ErrorDetails.BUFFER_STALLED_ERROR) {
        this.setState({loading: true})
      }
    });

    this.hlsRef.media.ontimeupdate = () => {
      this.setState({played: this.hlsRef.media.currentTime})
    };

    this.hlsRef.media.onclick = this.onVideoClick;
    this.hlsRef.media.ontouchend = (e) => {
      e.preventDefault();
      this.onVideoClick();
    };

    this.hlsRef.on(window.Hls.Events.FRAG_BUFFERED, () => {
      this.setState({loading: false})
    });

    this.hlsRef.on(window.Hls.Events.FRAG_CHANGED, () => {
      this.setState({loading: false})
    });


    this.hlsRef.on(window.Hls.Events.BUFFER_APPENDED, (e, data) => {
      let result = [];
      for(let i = 0; i < data.timeRanges.video.length; i++) {
        result.push({start: data.timeRanges.video.start(i) / duration, end: data.timeRanges.video.end(i) / duration});
      }
      this.setState({buffered: result});
    });

    this.setState({started: true});
  };

  onDuration = (duration) => {
    this.setState({duration})
  };

  enterFullScreen = () => {
    if (this.wrapperRef.requestFullscreen) {
      this.wrapperRef.requestFullscreen();
    } else if (this.wrapperRef.mozRequestFullScreen) {
      this.wrapperRef.mozRequestFullScreen();
    } else if (this.wrapperRef.webkitRequestFullscreen) {
      this.wrapperRef.webkitRequestFullscreen();
    } else if (this.wrapperRef.msRequestFullscreen) {
      this.wrapperRef.msRequestFullscreen();
    }
  };

  exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  updateActiveState = () => {
    if(!this.state.mouseActive) {
      this.setState({mouseActive: true});
    }
    clearTimeout(this.downtimeTimeout);
    this.downtimeTimeout = setTimeout(() => {
      // if(!this.state.controlsMouseDown && !this.state.controlsMouseOver) {
        this.setState({mouseActive: false});
      // } else {
      //   this.updateActiveState();
      // }
    }, MOUSE_DOWNTIME)
  };

  onWrapperMouseEnter = () => {
    this.setState({mouseOver: true});
    // this.downtimeTimeout = setTimeout(() => {this.setState({mouseActive: false})}, MOUSE_DOWNTIME)
  };

  onWrapperMouseLeave = () => {
    this.setState({mouseOver: false});
  };

  onWrapperMouseMove = throttle(() => {
    this.updateActiveState();
  }, MOUSE_DOWNTIME / 2);

  onVideoClick = () => {
    if(this.state.mouseActive || !this.state.playing || this.state.paused) {
      this.setState({playing: !(this.state.playing && !this.state.paused), paused: false})
    } else {
      this.updateActiveState();
    }
  };

  changePaused = (paused) => {
    this.setState({paused});
  };

  render() {
    const {classes, spritesUrl, url} = this.props;
    const {played, playing, loading, initialized, buffered, duration, volume, fullScreen, mouseActive, paused} = this.state;
    return (
      <div className={`${classes.wrapper} ${!mouseActive && classes.cursorHidden}`} ref={ref => this.wrapperRef = ref} onMouseEnter={this.onWrapperMouseEnter} onMouseLeave={this.onWrapperMouseLeave}
          onMouseMove={this.onWrapperMouseMove} onTouchEnd={this.updateActiveState} onTouchMove={this.onWrapperMouseMove}
      >
        {initialized ? (
          <React.Fragment>
            <ReactPlayer ref={ref => this.playerRef = ref} playing={playing && !paused} url={url} width={"100%"} height={"100%"}
                         style={{position: "absolute", top: 0, left: 0, backgroundColor: "#000"}}
                         onDuration={this.onDuration} onStart={this.onStart}
                         volume={volume}
            />
            <div className={`${classes.bottomSubWrapper} ${(this.state.mouseActive || !this.state.playing) && classes.bottomSubMargin}`}>
              <Subtitle data={subList} time={played} paused={paused} changePausedState={this.changePaused}/>
            </div>
            {loading && <div className={classes.loaderOverlay}>
              <ClipLoader color={"inherit"} size={70} />
            </div>}
              <Controls played={played} changePlayed = {(v) => {this.playerRef.seekTo(v);}} buffered={buffered} duration={duration}
                        changeVolume={this.changeVolume} volume={volume} playing={playing && !paused} changePlaying={this.changePlaying}
                        enterFullScreen={this.enterFullScreen} exitFullScreen={this.exitFullScreen} fullScreen={fullScreen}
                        className={`${(!mouseActive && playing) && classes.hidden} ${classes.controls}`} spritesUrl={spritesUrl}
              />
          </React.Fragment>
        ) : (
          <div className={classes.poster}>
            <Icon path={mdiPlayCircle} size={4} className={classes.posterPlayBtn} onClick={this.onPosterPlayBtnClick}/>
          </div>
        )}

      </div>
    )
  }
}

VideoPlayer.propTypes = {
  classes: PropTypes.object,
  url: PropTypes.string,
  spritesUrl: PropTypes.string
};

export default withStyles(style)(VideoPlayer);
