import React, {PureComponent} from "react";
import classNames from "classnames";
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {fade} from "@material-ui/core/styles/colorManipulator";

const styles = (theme) => ({
    wrapper: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "15px",
        cursor: "pointer",
        userSelect: "none",
        position: "relative"
    },
    slider: {
        width: "100%",
        backgroundColor: fade(theme.palette.grey["300"], 0.1),
        height: "4px",
        display: "flex",
        alignItems: "center",
        position: "relative"
    },
    filled: {
        left: 0,
        position: "absolute",
        height: "100%",
        width: 0,
        backgroundColor: theme.palette.primary.main
    },
    thumb: {
        opacity: 1,
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        position: "absolute",
      transition: "visibility .2s ease-in-out, opacity .2s ease-in-out",
        backgroundColor: theme.palette.primary.main
    },
    hidden: {
        visibility: "hidden",
        opacity: 0,
    },
});

class VolumeSlider extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isMouseDown: false,
            isHover: false,
        };
        this.sliderRef = React.createRef();
        this.fillRef = React.createRef();
    }

    componentDidMount() {
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
            this.setState({isMouseDown: false});
        }
    };

    onTouchEnd = () => {
        this.setState({isMouseDown: false});
    };

    onMouseMove = (e) => {
        let offset = e.pageX - this.sliderRef.current.getBoundingClientRect().left;
        if(offset > this.sliderRef.current.getBoundingClientRect().width) offset = this.sliderRef.current.getBoundingClientRect().width;
        if(offset < 0) offset = 0;
        let percent = (offset)/this.sliderRef.current.getBoundingClientRect().width * 100;

        if(this.state.isMouseDown) {
            this.props.changeValue(offset/this.sliderRef.current.getBoundingClientRect().width*100);
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
            this.props.changeValue(offset/this.sliderRef.current.getBoundingClientRect().width * 100);
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
                <div className={classes.wrapper} onMouseDown={(e) => {this.onMouseDown(e)}} onTouchStart={(e) => {this.onTouchStart(e)}} onMouseEnter={() => this.onMouseEnter()} onMouseLeave={() => this.onMouseLeave()}>
                    <div ref={this.sliderRef} className={classes.slider} >
                        <div ref={this.fillRef} style = {{width: this.calculateWidth(this.props.value) + "px"}} className={classes.filled}/>
                        <div className={classNames(classes.thumb, {[classes.hidden]:!this.state.isHover})} style={{left: this.calculateWidth(this.props.value) - 5 + "px"}}/>
                    </div>
                </div>
            </div>
        );
    }
}

VolumeSlider.propTypes = {
    value: PropTypes.number,
    changeValue: PropTypes.func,
    convertTooltipValue: PropTypes.func
};

export default withStyles(styles)(VolumeSlider)
