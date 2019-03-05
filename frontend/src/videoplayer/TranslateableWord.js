import React from "react";
import classNames from "classnames";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import PropTypes from "prop-types";
import {styles} from "./TranslateableWord.style";
import TranslateTooltip from "./TranslateTooltip";
import TouchAwayListener from "../shared/TouchAwayListener";
import api from "../api";

class TranslateableWord extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
      isLeft: false,
      isRight: false,
      isTranslationRequest: false,
      translationResult: null
    };
    this.ref = null;
  }

  componentDidMount() {
    this.renderPopper();
  }

  componentDidUpdate(nextState, nextProps, nextSnapshot) {
    if(nextProps.left !== this.props.left || nextProps.right !== this.props.right) {
      this.renderPopper();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.disabled) {
      return {isMouseOver: false}
    }
    return null;
  }

  componentWillUnmount() {
    if(this.state.isMouseOver) {
      this.onMouseLeave();
    }
  };

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

  onTouchOutside = () => {
    if (this.state.isMouseOver) {
      this.onMouseLeave();
    }
  };

  onMouseEnter = () => {
    const {isTranslationRequest, translationResult} = this.state;
    const {disabled} = this.props;

    this.setState({isMouseOver: true}, () => {
      if (!isTranslationRequest && (translationResult == null) && !disabled) {
        this.getTranslation(this.props.children);
      }
    });
  };

  onMouseLeave = () => {
    this.setState({isMouseOver: false});
  };

  getTranslation = (word) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`http://localhost:8080/dictionary/translation?text=${word}&from=EN&to=RU`)
        .then((r) => {
          this.setState({isTranslationRequest: false, translationResult: r.data});
        }).catch((err) => {
          this.setState({isTranslationRequest: false});
        })
    });
  };

  render() {
    const {children, classes, disabled} = this.props;
    const {isMouseOver, isRight, isLeft, isTranslationRequest, translationResult} = this.state;
    return (
      <TouchAwayListener onTouchAway={this.onTouchOutside}>
        <span ref={ref => this.ref = ref} onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} onTouchEnd={this.onMouseEnter} className={classes.wordWrapper}>
          <span className={`${classes.word} ${isMouseOver && !disabled && classes.active}`}>{children}</span>
          {!this.props.disabled &&
            <div className={classNames({[classes.hidden]: !isMouseOver || disabled}, classes.popper, {[classes.left]: isLeft}, {[classes.right]: isRight}, classes.popperTop)}>
              {<TranslateTooltip word={children} translatedWord={translationResult} loading={isTranslationRequest}/>}
            </div>
          }
        </span>
      </TouchAwayListener>
    )
  }
}

TranslateableWord.defaultProps = {
  left: null,
  right: null,
  onMouseEnter: () => {},
  onMouseLeave: () => {}
};

TranslateableWord.propTypes = {
  left: PropTypes.number,//left video player edge
  right: PropTypes.number,//right video player edge
  classes: PropTypes.object,
  disabled: PropTypes.bool,//show or no translation
  onMouseEnter: PropTypes.func,//callback,
  onMouseLeave: PropTypes.func//callback
};



export default withStyles(styles)(TranslateableWord);