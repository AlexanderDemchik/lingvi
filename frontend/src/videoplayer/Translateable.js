import React from "react";
import TranslateTooltip from "./TranslateTooltip";
import {style} from "./Translateable.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import {clearSelection, elementContainsSelection} from "./utils";
import TouchAwayListener from "../shared/TouchAwayListener";
import api from "../api";
import PropTypes from "prop-types";

class Translateable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedText: "", // currently selected text
      isSelection: false, // mark if selection currently proceed
      isTranslationRequest: false,
      translationResult: null,
      isMouseDown: false
    };
    this.checkInterval = null;
    this.ref = null;
  }

  componentDidMount() {
    document.addEventListener("selectionchange", this.onSelectionChange);
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("mouseleave", this.onMouseLeave);
    if(this.props.rootRef) {
      this.props.rootRef(this.ref);
    }
  };

  componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mouseleave", this.onMouseLeave);
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

  getTranslation = (word) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`http://localhost:8080/dictionary/translation?text=${word}&from=EN&to=RU`)
        .then((r) => {
          this.setState({isTranslationRequest: false, translationResult: r.data});
        }).catch(() => {
          this.setState({isTranslationRequest: false});
      })
    });
  };

  onMouseDown = () => {
    clearSelection(this.ref);
    this.setState({isMouseDown: true}, () => {
      this.checkInterval = setInterval(() => {
        if (this.state.isMouseDown && this.state.selectedText.length > 0) {
          clearInterval(this.checkInterval);
          this.onChangeIsSelection(true)
        }
      }, 500);
    });
  };

  onMouseUp = () => {
    const {selectedText} = this.state;
    this.setState({isMouseDown: false});
    clearInterval(this.checkInterval);
    this.onChangeIsSelection(false, () => {
      if (selectedText.length > 0) {
        this.getTranslation(selectedText);
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
    this.setState({selectedText: this.getSelectionText().trim()}, () => {
      this.props.onSelectionChange && this.props.onSelectionChange(this.state.selectedText);
    });
  }, 10);

  render() {
    const {selectedText, isSelection, isTranslationRequest, translationResult} = this.state;
    const {children, classes, onTouchAway} = this.props;
    return (
      <TouchAwayListener onTouchAway={onTouchAway}>
        <div ref={ref => this.ref = ref} style={{position: "relative"}} onContextMenu={(e) => (e.preventDefault())} onMouseDown={this.onMouseDown} onMouseLeave={() => {
          if (!this.state.isSelection) {
            this.setState({isSelection: false});
            clearSelection(this.ref);
          }
        }}>
          {children}
          {!isSelection && selectedText.length > 0 &&
            <div className={`${classes.popper} ${classes.popperTop}`}>
               <TranslateTooltip word={selectedText} translatedWord={translationResult} loading={isTranslationRequest}/>
            </div>
            }
        </div>
      </TouchAwayListener>
    )
  }
}

Translateable.propTypes = {
  onSelectionChange: PropTypes.func,
  onIsSelectionChange: PropTypes.func
};

export default withStyles(style)(Translateable);