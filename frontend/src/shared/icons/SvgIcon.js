import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Volume from "./Volume";



class SvgIcon extends Component {

  getIcon(name, width, other) {
    switch (name) {
      case "volume": return <Volume width={width} {...other}/>
    }
  }

  render() {
    const {name, size, ...other} = this.props;
    return (
      this.getIcon(name, size, other)
    );
  }
}

SvgIcon.defaultProps = {
  size: 24
};

SvgIcon.propTypes = {
  name: PropTypes.string,
  size: PropTypes.number
};

export default SvgIcon;
