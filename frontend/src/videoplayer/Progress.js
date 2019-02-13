import React, {PureComponent} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {fade} from "@material-ui/core/styles/colorManipulator";
import VideoPlayer from "./VideoPlayer";
import {throttle} from "lodash";

const styles = (theme) => ({
  wrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    height: "15px",
    paddingRight: "1px",
    cursor: "pointer",
    userSelect: "none",
    position: "relative"
  },
  slider: {
    width: "100%",
    backgroundColor: fade(theme.palette.grey["300"], 0.1),
    height: "5px",
    display: "flex",
    alignItems: "center",
    position: "relative"
  },
  filled: {
    left: 0,
    position: "absolute",
    height: "100%",
    width: 0,
    zIndex: 2,
    backgroundColor: theme.palette.primary.main
  },
  thumb: {
    userSelect: "none",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    position: "absolute",
    zIndex: 3,
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    opacity: 1,
    backgroundColor: theme.palette.primary.main
  },
  tooltip: {
    opacity: 1,
    visibility: "visible",
    transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
    borderRadius: 3,
    width: 150,
    height: 85,
    transformOrigin: "bottom",
    position: "absolute",
    bottom: "150%",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
    backgroundSize: "cover",
    // backgroundColor: theme.palette.primary.main,
    backgroundColor: "hsla(0, 0%, 6.7%, .8)",
    color: theme.palette.primary.contrastText,
    // "&:after": {
    //   position: "absolute",
    //   content: "' '",
    //   top: "100%",
    //   left: "50%",
    //   height: 0,
    //   width: 0,
    //   border: "5px solid transparent",
    //   // borderTopColor: theme.palette.primary.main,
    //   borderTopColor: "hsla(0, 0%, 6.7%, .8)",
    //   marginLeft: -5
    // }
  },
  tooltipTime: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "hsla(0, 0%, 6.7%, .8)",
    fontSize: 11,
    minWidth: 30,
    height: 20,
  },
  hidden: {
    visibility: "hidden",
    opacity: 0,
  },
  bufferFilled: {
    left: 0,
    zIndex: 1,
    position: "absolute",
    height: "100%",
    width: 0,
    transition: "width .2s linear",
    backgroundColor: fade(theme.palette.primary.main, 0.3)
  }
});

class Progress extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isMouseDown: false,
      isHover: false,
      tooltipValue: 0,
      fakeValue: 0,
      changed: false
    };
    this.sliderRef = React.createRef();
    this.fillRef = React.createRef();
    this.tooltipRef = React.createRef();
  }


  static getDerivedStateFromProps(props, state) {
    if (!state.isMouseDown && props.value && !state.changed) {
      return {fakeValue: props.value};
    } else if(state.changed) {
      if(Math.abs(props.value - state.fakeValue) < 0.1) {
        return {changed: false}
      }
    }
    return null;
  }

  componentDidMount() {
    //this.props.changeValue(this.props.value);
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('touchmove', this.onTouchMove);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchend", this.onTouchEnd);
    window.addEventListener("resize", this.resize);

  }

  componentWillUnmount() {
    document.removeEventListener('touchmove', this.onTouchMove);
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('touchend', this.onTouchEnd);
    document.removeEventListener("mouseup", this.onMouseUp);
    window.removeEventListener("resize", this.resize);
  }


  resize = () => {
    this.forceUpdate();
  };

  onMouseUp = () => {
    if(this.state.isMouseDown) {
      this.props.changeValue(this.state.fakeValue);
      this.setState({isMouseDown: false}, () => this.props.onMouseUp());
    }
  };

  onTouchEnd = () => {
    this.setState({isMouseDown: false});
  };

  onMouseMove = (e) => {
    if(this.state.isMouseDown || this.state.isHover) {

      let offset = e.pageX - this.sliderRef.current.getBoundingClientRect().left;
      if(offset > this.sliderRef.current.getBoundingClientRect().width) offset = this.sliderRef.current.getBoundingClientRect().width;
      if(offset < 0) offset = 0;
      let percent = (offset)/this.sliderRef.current.getBoundingClientRect().width * 100;

      if(offset < (this.tooltipRef.current.getBoundingClientRect().width/2)) {
        this.tooltipRef.current.style.left = 0;
      } else if((this.sliderRef.current.getBoundingClientRect().width - offset) < this.tooltipRef.current.getBoundingClientRect().width/2) {
        this.tooltipRef.current.style.left = this.sliderRef.current.getBoundingClientRect().width - this.tooltipRef.current.getBoundingClientRect().width + "px";
      } else {
        this.tooltipRef.current.style.left = offset - this.tooltipRef.current.getBoundingClientRect().width/2 + "px";
      }

      this.setState({tooltipValue: percent});

      if(this.state.isMouseDown) {
          this.setState({fakeValue: offset/this.sliderRef.current.getBoundingClientRect().width*100}, () => {
              this.props.onMouseDown(this.state.fakeValue);
          });
      }
    }
  };

  onTouchStart = (e) => {
    this.props.changeValue((e.touches[0].pageX - this.sliderRef.current.getBoundingClientRect().left)/this.sliderRef.current.getBoundingClientRect().width * 100);
    this.setState({isMouseDown: true})
  };

  onTouchMove = (e) => {
    if(this.state.isMouseDown) {
      let newPlace = e.touches[0].pageX - this.sliderRef.current.getBoundingClientRect().left;
      if(newPlace > this.sliderRef.current.getBoundingClientRect().width) newPlace = this.sliderRef.current.getBoundingClientRect().width;
      if(newPlace < 0) newPlace = 0;
      this.props.changeValue(newPlace/this.sliderRef.current.getBoundingClientRect().width*100);
    }
  };

  onMouseDown = (e) => {
    let offset = e.pageX - this.sliderRef.current.getBoundingClientRect().left;
    if(offset > this.sliderRef.current.getBoundingClientRect().width) offset = this.sliderRef.current.getBoundingClientRect().width;
    if(offset < 0) offset = 0;
    this.setState({isMouseDown: true}, () => {
      this.setState({fakeValue: offset/this.sliderRef.current.getBoundingClientRect().width * 100, changed: true}, () => this.props.onMouseDown(this.state.fakeValue));
    });

  };

  onMouseEnter = () => {
    this.setState({isHover: true});
  };

  onMouseLeave = () => {
    this.setState({isHover: false});
  };

  calculateWidth(width) {
    if(this.sliderRef.current !== null) {
      return this.sliderRef.current.getBoundingClientRect().width * width / 100;
    } else {
      return 0;
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <div style={{position: "relative", width: "100%"}}>
        <div ref={this.tooltipRef} className={classNames(classes.tooltip, {[classes.hidden]: !this.state.isHover && !this.state.isMouseDown})} >
          <div className={classes.tooltipTime}>
            {VideoPlayer.convertSeconds(this.props.convertTooltipValue(this.state.tooltipValue))}
          </div>
        </div>

        <div className={classes.wrapper} onMouseDown={(e) => {this.onMouseDown(e)}} onTouchStart={(e) => {this.onTouchStart(e)}} onMouseOver={() => this.onMouseEnter()} onMouseOut={() => this.onMouseLeave()}>
          <div ref={this.sliderRef} className={classes.slider} >
            <div ref={this.fillRef} style = {{width: this.calculateWidth(this.state.fakeValue) + "px"}} className={classes.filled}/>
            <div className={classNames(classes.thumb, {[classes.hidden]:!this.state.isHover})} style={{left: this.calculateWidth(this.state.fakeValue) - 5 + "px"}}/>
            {
              this.props.buffered.map(o => (
                <div key={o.start} className={classes.bufferFilled} style = {{width: this.calculateWidth(o.end - o.start) + "px", left: this.calculateWidth(o.start) + "px"}}/>
              ))
            }
          </div>
        </div>
      </div>
    );
  }
}

Progress.propTypes = {
  value: PropTypes.number,
  changeValue: PropTypes.func,
  convertTooltipValue: PropTypes.func,
  buffered: PropTypes.array,
  onMouseDown: PropTypes.func, //callback
  onMouseUp: PropTypes.func //callback
};

export default withStyles(styles)(Progress)
