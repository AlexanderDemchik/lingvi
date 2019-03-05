import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import TranslateableWord from "./TranslateableWord";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import {styles} from "./Subtitle.style";
import Translateable from "./Translateable";
import {clearSelection} from "./utils";

class Subtitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      selectionValue: false,
      isSelectionProceed: false,
      left: null, //left subtitle position
      right: null //right subtitle position, used to correctly show translate popper
    };
    this.ref = null;
    this.translateableRef = null;
  }

  componentDidMount() {
    this.setState({left: this.ref.getBoundingClientRect().left});
    this.setState({right: this.ref.getBoundingClientRect().right});

    window.addEventListener("resize", this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  onResize = debounce(() => {
    this.setState({left: this.ref.getBoundingClientRect().left});
    this.setState({right: this.ref.getBoundingClientRect().right});
  }, 100);

  static getDerivedStateFromProps(props, state) {
    let content;
    if((content = Subtitle.getSubtitle(props.data, props.time)) !== state.content) {
      return {content: content}
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.content !== this.state.content) {
      this.onMouseLeave();
      clearSelection(this.translateableRef);
    }
  }

  static getSubtitle(subList, currentTime) {
    for(let i in subList) {
      if(subList[i].start <= currentTime && subList[i].end >= currentTime) {
        return subList[i].content;
      } else {
        if(subList[i].end > currentTime) return null
      }
    }
    return null;
  }

  //divide string to translateable words
  divide(str) {
    const {isSelectionProceed, selectionValue} = this.state;
    const DIVIDERS = ["?", ",", ".", " ", "<", ">", "\"", "!", "-", "«", "»", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"];
    let result = [];
    for(let i = 0; i < str.length; i++) {
      if(DIVIDERS.indexOf(str.charAt(i)) === -1) {
        let word = "";
        do {
            word += str.charAt(i);
            i++;
        } while (str.charAt(i) !== "" && DIVIDERS.indexOf(str.charAt(i)) === -1);
        result.push(<TranslateableWord key={i} left={this.state.left} right={this.state.right} disabled={isSelectionProceed || selectionValue.length > 0}>{word}</TranslateableWord>);
        result.push(str.charAt(i));
      } else {
        result.push(str.charAt(i))
      }
    }
    return result;
  }

  onSelectionChange = (selectionText) => {
    this.setState({selectionValue: selectionText});
    // if(state) this.props.changePausedState(true);
  };

  onIsSelectionChange = (state) => {
    this.setState({isSelectionProceed: state});
  };

  onMouseEnter = () => {
    this.props.changePausedState(true);
  };

  onMouseLeave = () => {
    this.props.changePausedState(false);
  };

  onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.changePausedState(true);
  };

  render() {
    const {classes} = this.props;
    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onTouchEnd={this.onTouchEnd}>
        <Translateable rootRef={ref => this.translateableRef = ref} onSelectionChange={this.onSelectionChange} onIsSelectionChange={this.onIsSelectionChange} onTouchAway={() => {clearSelection(this.translateableRef)}}>
          <div ref={ref => this.ref = ref} className={classes.subtitle}>
            {this.state.content &&
              <Typography component={"div"} color={"inherit"} classes={{root: classes.text}}>
                {this.state.content.map((el) => (
                  <React.Fragment key={el}>{this.divide(el)} <br style={{userSelect: "none"}}/></React.Fragment>
                ))}
              </Typography>
            }
          </div>
        </Translateable>
      </div>
    )
  }
}

Subtitle.propTypes = {
  data: PropTypes.array,//subtitles
  time: PropTypes.number,//current video time
  classes: PropTypes.object,
  changePausedState: PropTypes.func,
  paused: PropTypes.bool
};

export default withStyles(styles)(Subtitle);