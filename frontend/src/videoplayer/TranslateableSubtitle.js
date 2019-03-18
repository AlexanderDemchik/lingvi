import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import TranslateableWord from "./TranslateableWord";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import {styles} from "./TranslateableSubtitle.style";
import Translateable from "./Translateable";
import {clearSelection, getSubtitleAtTime} from "./utils";

class TranslateableSubtitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
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
    if ((content = getSubtitleAtTime(props.data, props.time)) !== state.content) {
      return {content: content}
    } else {
      return null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (JSON.stringify(prevState.content) !== JSON.stringify(this.state.content)) {
      this.onMouseLeave();
      clearSelection(this.translateableRef);
    }
  }

  //divide string to translateable words
  divide(str) {
    const {isSelectionProceed, selectionValue} = this.state;
    const {language} = this.props;
    const DIVIDERS = ["?", ",", ".", " ", "<", ">", "\"", "!", "-", "«", "»", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ":"];
    let result = [];
    for(let i = 0; i < str.length; i++) {
      if(DIVIDERS.indexOf(str.charAt(i)) === -1) {
        let word = "";
        do {
          word += str.charAt(i);
          i++;
        } while (str.charAt(i) !== "" && DIVIDERS.indexOf(str.charAt(i)) === -1);
        result.push(<TranslateableWord key={i} left={this.state.left} right={this.state.right} disabled={isSelectionProceed || selectionValue.length > 0} language={language}>{word}</TranslateableWord>);
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
    const {classes, language} = this.props;
    const {content} = this.state;
    return (
      <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onTouchEnd={this.onTouchEnd}>
        <Translateable rootRef={ref => this.translateableRef = ref} onSelectionChange={this.onSelectionChange} onIsSelectionChange={this.onIsSelectionChange} onTouchAway={() => {clearSelection(this.translateableRef)}} language={language}>
          <div ref={ref => this.ref = ref} className={classes.subtitle}>
            {(content && content.length > 0) &&
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

TranslateableSubtitle.propTypes = {
  data: PropTypes.array,//subtitles
  time: PropTypes.number,//current video time
  classes: PropTypes.object,
  changePausedState: PropTypes.func,
  paused: PropTypes.bool,
  language: PropTypes.string
};

export default withStyles(styles)(TranslateableSubtitle);