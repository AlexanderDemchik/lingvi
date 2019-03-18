import React from "react";
import TranslateTooltip from "./TranslateTooltip";
import {style} from "./Translateable.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import {clearSelection, elementContainsSelection, getSelectionCoords} from "./utils";
import TouchAwayListener from "../shared/TouchAwayListener";
import api from "../api";
import PropTypes from "prop-types";

const POPPER_WIDTH = 400;
class Translateable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedText: "", // currently selected text
      isSelection: false, // mark if selection currently proceed
      isMouseDown: false,
      popperLeftOffset: 0
    };
    this.checkInterval = null;
    this.prevSelectedText = "";
    this.ref = null;
    this.tooltipRef = null;
  }

  componentDidMount() {
    document.addEventListener("selectionchange", this.onSelectionChange);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mouseleave", this.onMouseLeave);
    window.addEventListener("resize", this.onResize);
    if(this.props.rootRef) {
      this.props.rootRef(this.ref);
    }
  };

  componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mouseleave", this.onMouseLeave);
    window.addEventListener("resize", this.onResize);
    clearInterval(this.checkInterval);
  }

  getSelectionText = () => {
    if (elementContainsSelection(this.ref)) {
      if (window.getSelection) {
        return window.getSelection().toString();
      } else if (document.selection && document.selection.type !== "Control") {
        return document.selection.createRange().text;
      }
    }
    return "";
  };

  onResize = debounce(() => {
    this.setState({left: this.ref.getBoundingClientRect().left});
    this.setState({right: this.ref.getBoundingClientRect().right});
  }, 100);

  onMouseDown = () => {
    this.setState({isMouseDown: true}, () => {
      this.prevSelectedText = this.state.selectedText;
      this.checkInterval = setInterval(() => {
        if (this.state.isMouseDown && (this.state.selectedText.length > 0) && this.state.selectedText !== this.prevSelectedText) {
          clearInterval(this.checkInterval);
          this.onChangeIsSelection(true)
        }
      }, 100);
    });
  };

  onMouseUp = () => {
    const {selectedText} = this.state;
    this.setState({isMouseDown: false});
    clearInterval(this.checkInterval);
      this.onChangeIsSelection(false, () => {
        if (selectedText.length > 0 && selectedText !== this.prevSelectedText) {
          this.tooltipRef.getTranslation(selectedText);
        }
      });
  };

  onMouseLeave = () => {
    this.onChangeIsSelection(false);
  };

  onChangeIsSelection = (state, callback) => {
    this.setState({isSelection: state}, () => {
      this.props.onIsSelectionChange && this.props.onIsSelectionChange(state);
      callback && callback();
    });
  };

  onSelectionChange = debounce(() => {
    let selectionCoords = getSelectionCoords(window);
    let resultLeftOffset = (selectionCoords.left + (selectionCoords.right - selectionCoords.left) / 2 - POPPER_WIDTH / 2);
    this.setState({selectedText: this.getSelectionText().trim(), popperLeftOffset: resultLeftOffset}, () => {
      this.props.onSelectionChange && this.props.onSelectionChange(this.state.selectedText);
    });
  }, 10);

  render() {
    const {selectedText, isSelection} = this.state;
    const {children, classes, onTouchAway, language} = this.props;
    return (
      <TouchAwayListener onTouchAway={onTouchAway}>
        <div ref={ref => this.ref = ref} style={{position: "relative"}} onMouseDown={this.onMouseDown} onMouseLeave={() => {
          if (!this.state.isSelection) {
            this.setState({isSelection: false});
            clearSelection(this.ref);
          }
        }}>
          {children}
          {!isSelection && selectedText.length > 0 &&
            <div className={`${classes.popper} ${classes.popperTop}`} style={{left: this.state.popperLeftOffset}}>
               <TranslateTooltip word={selectedText} innerRef={ref => this.tooltipRef = ref} language={language}/>
            </div>
            }
        </div>
      </TouchAwayListener>
    )
  }
}

Translateable.propTypes = {
  onSelectionChange: PropTypes.func,
  onIsSelectionChange: PropTypes.func,
  language: PropTypes.string
};

export default withStyles(style)(Translateable);