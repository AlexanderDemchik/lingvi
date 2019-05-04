import React, { useState }  from 'react';
import PropTypes from 'prop-types';
import {Icon} from "@mdi/react";
import {mdiClose} from "@mdi/js";
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./Translation.style";
import Tooltip from "../../shared/Tooltip";

const Translation = ({classes, value, onDelete, deletable}) => {

  const [hover, setHover] = useState(false);

  return (
    <div className={`${classes.wrapper} ${classes.translation}`} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <span style={{position: "relative"}} >
        <span >{value}</span>
        {
          (deletable && hover) &&
          <Tooltip title={"Удалить перевод"} placement={"top"}>
            <Icon path={mdiClose} onClick={onDelete} className={classes.cross}/>
          </Tooltip>
        }
      </span>

    </div>
  );
};

Translation.defaultProps = {
  deletable: true
};

Translation.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  onDelete: PropTypes.func,
  deletable: PropTypes.bool
};

export default withStyles(style)(Translation);
