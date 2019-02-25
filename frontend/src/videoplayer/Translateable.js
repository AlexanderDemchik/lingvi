import React from "react";
import Translate from "./Translate";
import {style} from "./Translateable.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {debounce} from "lodash";
import {elementContainsSelection} from "./utils";
import TouchAwayListener from "../shared/TouchAwayListener";

class Translateable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedText: ""
    };
    this.ref = null;
  }

  componentDidMount() {
    document.addEventListener("selectionchange", this.onSelectionChange);
    if(this.props.rootRef) {
      this.props.rootRef(this.ref);
    }
  };

  componentWillUnmount() {
    document.removeEventListener("selectionchange", this.onSelectionChange);
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

  onSelectionChange = debounce(() => {
    this.setState({selectedText: this.getSelectionText().replace("\n", "")}, () => {
      this.props.onSelectionChange && this.props.onSelectionChange(this.state.selectedText);
    });
  }, 50);

  render() {
    const {selectedText} = this.state;
    const {children, classes, onTouchAway} = this.props;
    return (
      <TouchAwayListener onTouchAway={onTouchAway}>
        <div ref={ref => this.ref = ref} style={{position: "relative"}} onContextMenu={(e) => (e.preventDefault())}>
          {children}
          {selectedText.length > 0 &&
            <div className={`${classes.popper} ${classes.popperTop}`}>
               <Translate text={selectedText} active={true}/>
            </div>
            }
        </div>
      </TouchAwayListener>
    )
  }
}

export default withStyles(style)(Translateable);