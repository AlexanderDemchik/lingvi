import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

class TouchAwayListener extends React.Component {

  constructor(props) {
    super(props);
    this.node = null;
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
    window.addEventListener("touchstart", this.onTouchAway);
  }

  componentWillUnmount() {
    window.removeEventListener("touchstart", this.onTouchAway);
  }

  onTouchAway = (e) => {
    if(!this.node.contains(e.target)) {
      this.props.onTouchAway(e);
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.props.children}
      </React.Fragment>
    )
  }
}

TouchAwayListener.propTypes = {
  onTouchAway: PropTypes.func.isRequired
};

export default TouchAwayListener;