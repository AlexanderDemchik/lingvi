import React from "react";
import ReactPlayer from 'react-player'
import Controls from "./Controls";
import {withStyles} from "@material-ui/core";
import {style} from "./VideoPlayer.style";
import {mdiPlayCircle} from "@mdi/js";
import {Icon} from "@mdi/react";
import {ClipLoader} from "react-spinners";
import {throttle} from "lodash";

const MOUSE_DOWNTIME = 3000;

class VideoPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      initialized: false,
      played: 0,
      playedSeconds: 0,
      duration: 0,
      buffered: [],
      playing: false,
      loading: false,
      volume: 0.5,
      mouseActive: false,
      fullScreen: false,

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

  onPosterPlayBtnClick = () => {
    this.setState({initialized: true, playing: true});
  };

  changeVolume = (volume) => {
    this.setState({volume: volume})
  };

  changePlaying = (state) => {
    this.setState({playing: state});
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

    this.hlsRef.on(window.Hls.Events.FRAG_BUFFERED, () => {
      // this.setState({loading: false})
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
    })
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
    this.setState({playing: !this.state.playing})
  };

  render() {
    const {classes} = this.props;
    const {played, playing, loading, initialized, buffered, duration, volume, fullScreen, mouseActive} = this.state;
    return (
      <div className={`${classes.wrapper} ${!mouseActive && classes.cursorHidden}`} ref={ref => this.wrapperRef = ref} onMouseEnter={this.onWrapperMouseEnter} onMouseLeave={this.onWrapperMouseLeave}
          onMouseMove={this.onWrapperMouseMove}
      >
        {initialized ? (
          <React.Fragment>
            <ReactPlayer ref={ref => this.playerRef = ref} playing={playing} {...this.props} width={"100%"} height={"100%"}
                         style={{position: "absolute", top: 0, left: 0, backgroundColor: "#000"}}
                         onDuration={this.onDuration} onStart={this.onStart}
                         volume={volume} onClick={this.onVideoClick}
            />
            {loading && <div className={classes.loaderOverlay}>
              <ClipLoader color={"inherit"} size={70} />
            </div>}
              <Controls played={played} changePlayed = {(v) => {this.playerRef.seekTo(v);}} buffered={buffered} duration={duration}
                        changeVolume={this.changeVolume} volume={volume} playing={playing} changePlaying={this.changePlaying}
                        enterFullScreen={this.enterFullScreen} exitFullScreen={this.exitFullScreen} fullScreen={fullScreen}
                        className={`${(!mouseActive && playing) && classes.hidden} ${classes.controls}`}
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

export default withStyles(style)(VideoPlayer);
