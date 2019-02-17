import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import {styles} from "./TranslateableWord.style";
import Translate from "./Translate";

class TranslateableWord extends React.PureComponent {
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

  onMouseEnter = () => {
    this.setState({isMouseOver: true});
  };

  onMouseLeave = () => {
    this.setState({isMouseOver: false})
  };

  render() {
    const {children, classes, disabled} = this.props;
    const {isMouseOver, isRight, isLeft} = this.state;
    return (
      <span ref={ref => this.ref = ref} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} className={classes.wordWrapper}>
        <span className={classes.word}>{children}</span>
        <div className={classNames({[classes.hidden]: !isMouseOver || disabled}, classes.popper, {[classes.left]: isLeft}, {[classes.right]: isRight}, classes.popperTop)}>
          {<Translate text={children} active={isMouseOver}/>}
        </div>
      </span>
    )
  }
}

TranslateableWord.defaultProps = {
  left: null,
  right: null
};

TranslateableWord.propTypes = {
  left: PropTypes.number,//left video player edge
  right: PropTypes.number,//right video player edge
  classes: PropTypes.object,
  disabled: PropTypes.bool//show or no translation
};



export default withStyles(styles)(TranslateableWord);