import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import PropTypes from "prop-types";

const styles = {
  hidden: {
    opacity: 0,
    visibility: "hidden",
  },
  popper: {
    fontSize: 15,
    position: "absolute",
    left: "calc(50% - 100px)",
    width: "200px",
    backgroundColor: "red"
  },
  popperBottom: {
    marginTop: 10,
    top: "100%"
  },
  popperTop: {
    bottom: "100%",
    marginBottom: 10
  },
  right: {
    right: 0,
    left: "unset"
  },
  left: {
    left: 0
  },
  word: {
    position: "relative",
    "&:hover": {
      backgroundColor: "red"
    }
  }
};

class Translate extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
      isLeft: false,
      isRight: false
    };
    this.ref = null;
  }

  componentDidMount() {
    this.renderPopper();
  }

  componentWillUpdate(nextState, nextProps, nextSnapshot) {
    if(nextProps.left !== this.props.left || nextProps.right !== this.props.right) {
      this.renderPopper();
    }
  }

  renderPopper = () => {
    if (this.props.right !== null && this.props.left !== null) {
      let isRight = false;
      let isLeft = false;

      if ((this.props.right - this.ref.getBoundingClientRect().right) < 100) isRight = true;
      if ((this.ref.getBoundingClientRect().left - this.props.left) < 100) isLeft = true;

      if (!(isRight && isLeft)) {
        this.setState({isLeft: isLeft, isRight: isRight});
      } else {
        this.setState({isLeft: false, isRight: false});
      }
    }
  };

  onMouseOver = () => {
    this.setState({isMouseOver: true});
  };

  onMouseOut = () => {
    this.setState({isMouseOver: false})
  };

  render() {
    const {children, classes, popperPosition} = this.props;
    const {isMouseOver, isRight, isLeft} = this.state;
    return (
      <span ref={ref => this.ref = ref} onMouseOver={this.onMouseOver} onMouseOut={this.onMouseOut} className={classes.word}>{children}
        <div className={classNames({[classes.hidden]: !isMouseOver}, classes.popper, {[classes.left]: isLeft}, {[classes.right]: isRight}, {[classes.popperBottom]:popperPosition === "bottom"}, {[classes.popperTop]:popperPosition === "top"})}>
          text
        </div>
      </span>
    )
  }
}

Translate.defaultProps = {
  popperPosition: "top",
  left: null,
  right: null
};

Translate.propTypes = {
  popperPosition: PropTypes.oneOf(["top", "bottom"]),
  left: PropTypes.number,
  right: PropTypes.number
};



export default withStyles(styles)(Translate);