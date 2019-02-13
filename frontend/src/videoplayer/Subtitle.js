import React, {Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography/Typography";
import Translate from "./Translate";
import {debounce} from "lodash";
import PropTypes from "prop-types";

const styles = (theme) => ({
  subtitle: {
    color : "#fff",
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  text: {
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingLeft: 20,
    paddingRight: 20,
    [theme.breakpoints.up('sm')]: {
      fontSize: 25,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 15
    }
  },
  subSeq: {
    display: "flex"
  },
});

class Subtitle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      content: null,
      left: null, //left subtitle position
      right: null //right subtitle position, used to correctly show translate popper
    };
    this.ref = null;
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
    const DIVIDERS = ["?", ",", ".", " ", "<", ">", "\"", "!", "-", "«", "»", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    let result = [];
    for(let i = 0; i < str.length; i++) {
      if(DIVIDERS.indexOf(str.charAt(i)) === -1) {
        let word = "";
        do {
            word += str.charAt(i);
            i++;
        } while (str.charAt(i) !== "" && DIVIDERS.indexOf(str.charAt(i)) === -1);
        result.push(<Translate key={i} left={this.state.left} right={this.state.right} popperPosition={this.props.position === "top"?"bottom":"top"}>{word}</Translate>);
        result.push(str.charAt(i));
      } else {
        result.push(str.charAt(i))
      }
    }
    return result;
  }

  render() {
    const {classes} = this.props;
    return (
      <div ref={ref => this.ref = ref} className={classes.subtitle}>
        {this.state.content && this.state.content.map((el) => (
          <Typography component={"div"} key={el} color={"inherit"} classes={{root: classes.text}}>
            {this.divide(el)}
          </Typography>
        ))}
      </div>
    )
  }
}

Subtitle.defaultProps = {
  position: "top"
};

Subtitle.propTypes = {
  position: PropTypes.oneOf(["top", "bottom"])
};

export default withStyles(styles)(Subtitle);