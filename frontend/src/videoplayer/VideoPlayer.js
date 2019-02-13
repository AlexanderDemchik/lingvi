import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {mdiPlay, mdiPause, mdiFullscreen, mdiSettings, mdiSubtitles, mdiFullscreenExit, mdiVolumeHigh} from "@mdi/js";
import Icon from "@mdi/react/Icon";
import Progress from "./Progress";
import VolumeSlider from "../videoplayerv2/VolumeSlider";
import Loader from "react-spinners/GridLoader";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography/Typography";
// import subList from "../images/res.json";
// import subListRus from "../images/resrus.json";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import {throttle} from "lodash";


const styles = (theme) => ({
  videoWrapper: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    paddingBottom: "56.25%",
    height: 0,
    margin: "0 auto",
    backgroundColor: "#000"
  },
  controls: {
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    opacity: 1,
    width: "100%",
    position: "absolute",
    display: "flex",
    height: 60,
    // backgroundColor: "rgba(0,0,0,0.6)",
    bottom: 0,
    backgroundImage: "linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))",
    // backgroundColor: "rgba(15,12,20,0.7)",
    // backgroundColor: "rgba(15,12,20,0.7)",
    //hsla(0, 0%, 6.7%, .8)
    flexDirection: "column",
    zIndex: 6,
    // boxShadow: "inset 0 4px 2px -2px #000"
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  volumeWrapper: {
    marginLeft: 4,
    marginRight: 4,
    width: "60px",
    display: "flex",
    alignItems: "center"
  },
  progressWrapper: {
    display: "flex",
    flexDirection: "row",
    padding: "5px 10px 5px 10px",
  },
  otherControlsWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 10px 0 10px"
  },
  flex: {
    display: "flex"
  },
  icon: {
    width: "1.6em",
    height: "1.6em",
    cursor: "pointer",
    marginLeft: 3,
    marginRight: 3,
    "& path": {
      fill: "#fff",
    },
  },
  loader: {
    top: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 5
  },
  timeWrapper: {
    display: "flex",
    alignItems: "center",
    marginLeft: 5,
    color: "#fff"
  },
  hidden: {
    visibility: "hidden",
    opacity: 0
  },
  hiddenCursor: {
    cursor: "none"
  },
  bottomSubWrapper: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    transition: "all .2s ease-in-out"
  },
  bottomSubMargin: {
    bottom: 60,
  },
  topSubWrapper: {
    position: "absolute",
    top: 0,
    marginTop: 10,
    width: "100%"
  },
  menu: {
    display: "flex",
    flexDirection: "column",
    transition: "all .2s ease-in-out",
    backgroundColor: "hsla(0, 0%, 6.7%, .8)",
    position: "absolute",
    left: 0,
    padding: 2,
    bottom: 55,
  },
  menuItem: {
    cursor: "pointer",
    padding: 5,
    paddingLeft: 10,
    borderRadius: 3,
    margin: 3,
    paddingRight: 10,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.primary.main
    },
  },
  menuWrapper: {
    userSelect: "none",
    position: "relative",
  },
  seekImage: {
    position: "absolute",
    backgroundSize: "cover",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 5
  }
});

const  MOUSE_DOWNTIME = 3000;

class VideoPlayer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      playing : false,
      volume : 1,
      buffered : [],
      currentTime : 0,
      duration : 0,
      seeking : false,
      seeked : true,
      waiting : false,
      canplay : false,
      fullScreen : false,
      mouseOver : false,
      mouseActive : true,
      subtitlesMenuOpen : false,
      settingsMenuOpen : false,
      controlsMouseDown : false,
      controlsMouseOver : false,
      progressMouseDown : false,
      seekValue : 0,
    };
    this.downtimeTimeout = null;
    this.wrapperRef = null;
    this.videoRef = null;
    this.updateInterval = null;
  }

  static convertSeconds(s) { //convert seconds to hh:mm:ss format
    let m = Math.floor(s/60);
    s = Math.floor(s%60);
    if(s < 10) s = "0" + s;
    if(m < 60) {
      return m + ":" + s
    } else {
      let h = Math.floor(m/60);
      m = Math.floor(m%60);
      return h + ":" + ((m<10)?("0" + m):(m)) + ":" + s;
    }
  }

  static compare(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2)
  }

  play = () => {
    return this.videoRef.play();
  };

  pause = () => {
    this.videoRef.pause();
  };

  changeVolume = (val) => {
    this.videoRef.volume = val;
  };

  toggleFullScreen = () => {
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
      if(!this.state.controlsMouseDown && !this.state.controlsMouseOver) {
        this.setState({mouseActive: false});
      } else {
        this.updateActiveState();
      }
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

  onProgressMouseMove = throttle((seek)=>{
    this.setState({progressMouseDown: true, seekValue: seek})}, 500);

  componentDidMount() {
    this.videoRef.volume = 1;

    document.addEventListener('webkitfullscreenchange', () => this.setState({fullScreen: document.webkitFullscreenElement}), false);
    document.addEventListener('mozfullscreenchange', () => this.setState({fullScreen: document.mozFullScreenElement}), false);
    document.addEventListener('fullscreenchange', () => this.setState({fullScreen: document.fullscreenElement}), false);
    document.addEventListener('MSFullscreenChange', () => this.setState({fullScreen: document.msFullscreenElement}), false);

    this.videoRef.addEventListener("pause", () => this.setState({playing: false}));
    this.videoRef.addEventListener("play", () => this.setState({playing: true}));
    this.videoRef.addEventListener("volumechange", () => this.setState({volume: this.videoRef.volume}));
    this.videoRef.addEventListener("loadedmetadata", () => {
      this.setState({duration: this.videoRef.duration});
      this.updateInterval = setInterval(() => {
        if(this.videoRef.buffered.length > 0) {
          let result = [];
          for(let i = 0; i < this.videoRef.buffered.length; i++) {
            result.push({start: this.videoRef.buffered.start(i) * 100 / this.videoRef.duration, end: this.videoRef.buffered.end(i) * 100 / this.videoRef.duration});
          }

          if(!VideoPlayer.compare(result, this.buffered)) this.setState({buffered: result});
        }
      }, 1000);
    });
    this.videoRef.addEventListener("timeupdate", () => {
      this.setState({currentTime: this.videoRef.currentTime});
    });
    this.videoRef.addEventListener("seeking", () => {
      this.setState({seeking: true});
    });
    this.videoRef.addEventListener("seeked", () => {this.setState({seeking: false, seeked: true})});
    this.videoRef.addEventListener("waiting", () => {this.setState({waiting: true, canplay: false})});
    this.videoRef.addEventListener("canplay", () => {this.setState({waiting: false, canplay: true})});
  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  render() {
    const {src, classes, theme} = this.props;
    return (
      <div className={classNames(classes.videoWrapper, {[classes.hiddenCursor]: this.state.fullScreen && !this.state.mouseActive})} ref={r => {this.wrapperRef = r}}
           onMouseEnter={this.onWrapperMouseEnter} onMouseLeave={this.onWrapperMouseLeave} onMouseMove={this.onWrapperMouseMove}>
        <video preload="metadata" ref={r => {this.videoRef = r}} className={classes.video} src={src}
               onClick={this.videoRef && this.videoRef.paused?this.play:this.pause} onDoubleClick={this.toggleFullScreen}/>

        {(this.state.waiting || !this.state.canplay || this.state.seeking) && <div className={classes.seekImage} />}

        {/*<div className={classNames(classes.bottomSubWrapper, {[classes.bottomSubMargin]:this.state.mouseActive || !this.state.playing})}>*/}
          {/*<Subtitle data={subList} time={this.state.currentTime} position={"bottom"}/>*/}
        {/*</div>*/}

        {/*<div className={classes.topSubWrapper}>*/}
          {/*<Subtitle data={subListRus} time={this.state.currentTime} position={"top"}/>*/}
        {/*</div>*/}

        {(this.state.waiting && !this.state.canplay || this.state.seeking) &&
        <div className={classes.loader}>
          <Loader margin={"2px"} size={15} color={theme.palette.primary.main}/>
        </div>}

        <div className={classNames(classes.controls, {[classes.hidden]:!this.state.mouseActive && this.state.playing})}
             onMouseDown={() => this.setState({controlsMouseDown: true})} onMouseUp={() => this.setState({controlsMouseDown: false})}
             onMouseEnter={()=>{this.setState({controlsMouseOver: true})}} onMouseLeave={()=>{this.setState({controlsMouseOver: false})}}>
          <div className={classes.progressWrapper}>
            <Progress value={this.state.currentTime / this.state.duration * 100}
                      changeValue={(val) => {
                        this.videoRef.currentTime = val / 100 * this.state.duration;
                      }} convertTooltipValue={e => Math.floor(e * this.state.duration / 100)}
                      buffered={this.state.buffered} onMouseDown={this.onProgressMouseMove} onMouseUp={() => this.setState({progressMouseDown: false})}/>
          </div>
          <div className={classNames(classes.otherControlsWrapper)}>
            <div className={classes.flex}>
              {!this.state.playing || this.state.seeking?(
                <Icon path={mdiPlay} className={classes.icon} onClick={this.play}/>
              ):(
                <Icon path={mdiPause} className={classes.icon} onClick={this.pause}/>
              )}
              <Icon path={mdiVolumeHigh} className={classes.icon}/>
              <div className={classes.volumeWrapper}>
                <VolumeSlider value={this.state.volume * 100} changeValue={(val) => this.changeVolume(val/100)}/>
              </div>
              <div className={classes.timeWrapper}>
                <Typography color={"inherit"}>{VideoPlayer.convertSeconds(this.state.currentTime) + "/" + VideoPlayer.convertSeconds(this.state.duration)}</Typography>
              </div>
            </div>
            <div className={classes.flex}>

              <ClickAwayListener onClickAway={() => this.setState({subtitlesMenuOpen: false})}>
                <div className={classes.menuWrapper}>
                  <Icon path={mdiSubtitles} className={classes.icon} onClick={() => this.setState({subtitlesMenuOpen: !this.state.subtitlesMenuOpen})}/>
                  <div className={classNames(classes.menu, {[classes.hidden]:!this.state.subtitlesMenuOpen})}>
                    <div className={classes.menuItem}>
                      <Typography color={"inherit"}>RU</Typography>
                    </div>
                    <div className={classes.menuItem}>
                      <Typography color={"inherit"}>EN</Typography>
                    </div>
                  </div>
                </div>
              </ClickAwayListener>

              <ClickAwayListener onClickAway={() => this.setState({settingsMenuOpen: false})}>
                <div className={classes.menuWrapper}>
                  <Icon path={mdiSettings} className={classes.icon} onClick={() => this.setState({settingsMenuOpen: !this.settingsMenuOpen})}/>
                  <div className={classNames(classes.menu, {[classes.hidden]:!this.settingsMenuOpen})}>
                    <div className={classes.menuItem}>
                      <Typography color={"inherit"}>360p</Typography>
                    </div>
                    <div className={classes.menuItem}>
                      <Typography color={"inherit"}>720p</Typography>
                    </div>
                  </div>
                </div>
              </ClickAwayListener>

              {
                !this.state.fullScreen?(
                  <Icon path={mdiFullscreen} className={classes.icon} onClick={this.toggleFullScreen}/>
                ):(
                  <Icon path={mdiFullscreenExit} className={classes.icon} onClick={this.exitFullScreen}/>
                )
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles, {withTheme: true})(VideoPlayer);