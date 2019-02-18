import React, {PureComponent} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {throttle} from "lodash";
import {styles} from "./Progress.style";


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
      if(Math.abs(props.value - state.fakeValue) < 0.0001) {
        return {changed: false, fakeValue: props.value}
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
      this.setState({isMouseDown: false, changed: true}, () => {
        this.props.changeValue(this.state.fakeValue);
      })
    }
  };

  onMouseMove = (e) => {
    if(this.state.isMouseDown || this.state.isHover) {

      let offset = e.pageX - this.sliderRef.current.getBoundingClientRect().left;
      if(offset > this.sliderRef.current.getBoundingClientRect().width) offset = this.sliderRef.current.getBoundingClientRect().width;
      if(offset < 0) offset = 0;
      let percent = (offset)/this.sliderRef.current.getBoundingClientRect().width;

      this.setTooltipPosition(offset);
      this.setState({tooltipValue: percent});

      if(this.state.isMouseDown) {
          this.setState({fakeValue: offset/this.sliderRef.current.getBoundingClientRect().width}, () => {
              // this.props.onMouseDown(this.state.fakeValue);
          });
      }
    }
  };

  onTouchStart = (e) => {
    let offset = (e.touches[0].pageX - this.sliderRef.current.getBoundingClientRect().left);
    let boundingClientRectWidth = this.sliderRef.current.getBoundingClientRect().width;
    this.setState({fakeValue: offset / boundingClientRectWidth, isMouseDown: true, tooltipValue: offset / boundingClientRectWidth});
    this.setTooltipPosition(offset);
  };

  onTouchMove = (e) => {
    if(this.state.isMouseDown) {
      let newPlace = e.touches[0].pageX - this.sliderRef.current.getBoundingClientRect().left;
      if(newPlace > this.sliderRef.current.getBoundingClientRect().width) newPlace = this.sliderRef.current.getBoundingClientRect().width;
      if(newPlace < 0) newPlace = 0;
      this.setState({fakeValue: newPlace/this.sliderRef.current.getBoundingClientRect().width});

      this.setTooltipPosition(newPlace);
      this.setState({tooltipValue: newPlace / this.sliderRef.current.getBoundingClientRect().width});
    }
  };

  onTouchEnd = (e) => {
    e.preventDefault();
    this.onMouseUp();
    this.setState({isHover: false});
  };

  onMouseDown = (e) => {
    let offset = e.pageX - this.sliderRef.current.getBoundingClientRect().left;
    if(offset > this.sliderRef.current.getBoundingClientRect().width) offset = this.sliderRef.current.getBoundingClientRect().width;
    if(offset < 0) offset = 0;
    this.setState({isMouseDown: true}, () => {
      this.setState({fakeValue: offset/this.sliderRef.current.getBoundingClientRect().width});
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
      return this.sliderRef.current.getBoundingClientRect().width * width;
    } else {
      return 0;
    }
  }

  setTooltipPosition = (position) => {
    if(position < (this.tooltipRef.current.getBoundingClientRect().width/2)) {
      this.tooltipRef.current.style.left = 0;
    } else if((this.sliderRef.current.getBoundingClientRect().width - position) < this.tooltipRef.current.getBoundingClientRect().width/2) {
      this.tooltipRef.current.style.left = this.sliderRef.current.getBoundingClientRect().width - this.tooltipRef.current.getBoundingClientRect().width + "px";
    } else {
      this.tooltipRef.current.style.left = position - this.tooltipRef.current.getBoundingClientRect().width/2 + "px";
    }
  };

  render() {
    const imagesPerSprite = 20;
    const secondsPerImage = 5;
    const spritesExt = "jpg";
    const {classes, convertTooltipValue, spritesUrl, duration} = this.props;
    const {tooltipValue, fakeValue, isHover, isMouseDown} = this.state;
    let spritesN = Math.ceil((duration * tooltipValue)/secondsPerImage/imagesPerSprite + 0.01);
    let numInSprite = (Math.ceil(((duration * tooltipValue)%(imagesPerSprite * secondsPerImage))/secondsPerImage) - 1);

    if(numInSprite === -1) numInSprite+=1;

    return (
      <div style={{position: "relative", width: "100%"}}>
        <div ref={this.tooltipRef} className={classNames(classes.tooltip, {[classes.hidden]: !this.state.isHover && !this.state.isMouseDown})}
             style={{backgroundImage: `url(${spritesUrl}/sprite${spritesN}.${spritesExt})`, backgroundPosition: `0 -${numInSprite * 100}%`, backgroundSize: `100% ${imagesPerSprite}00%`}}>
          <div className={classes.tooltipTime}>
            {convertTooltipValue(tooltipValue)}
          </div>
        </div>

        <div className={classes.wrapper} onMouseDown={this.onMouseDown} onTouchStart={this.onTouchStart} onMouseOver={this.onMouseEnter} onMouseOut={this.onMouseLeave} onTouchEnd={this.onTouchEnd} onTouchMove={this.onTouchMove}>
          <div ref={this.sliderRef} className={classes.slider} >
            <div ref={this.fillRef} style = {{width: this.calculateWidth(fakeValue) + "px"}} className={classes.filled}/>
            <div className={classNames(classes.thumb, {[classes.hidden]:!isHover && !isMouseDown})} style={{left: this.calculateWidth(fakeValue) - 5 + "px"}}/>
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
  /*From 0 to 1*/
  value: PropTypes.number,
  changeValue: PropTypes.func,
  /*Convert state.tooltipValue to readable format*/
  convertTooltipValue: PropTypes.func,
  /*Array with values from 0 to 1*/
  buffered: PropTypes.array,
  spritesUrl: PropTypes.string,
  duration: PropTypes.number
};

export default withStyles(styles)(Progress)
