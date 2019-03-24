import React from 'react';
import {Link as RouterLink} from "react-router-dom";
import PropTypes from 'prop-types';
import {style} from "./Link.style";
import withStyles from "@material-ui/core/styles/withStyles";

const Link = ({classes, to, children, active}) => {
  return (
    <RouterLink className={`${classes.link} ${active && classes.active}`} to={to}>
      {children}
      {active && <span className={classes.line}/>}
    </RouterLink>
  );
};

Link.propTypes = {
  to: PropTypes.string,
  active: PropTypes.bool,
};

export default withStyles(style)(Link);
