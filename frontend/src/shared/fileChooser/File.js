import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import Icon from "@mdi/react";
import {mdiCloseBox, mdiFile, mdiImage} from "@mdi/js";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";

const File = ({classes, upload, cancel}) => {
  const [hover, setHover] = useState(false);
  const percent = (upload._offset / upload._size) * 100;
  return (
    <div className={`${classes.image}`}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={(e) => {e.preventDefault(); e.stopPropagation(); console.log("click")}}>
      <Icon path={mdiFile} size={2}/>
      {hover &&
      <div className={classes.cancelOverlay}>
        <Icon path={mdiCloseBox} size={0.8} className={classes.closeIcon} onClick={(e) => {e.preventDefault(); e.stopPropagation(); cancel(upload.id); }}/>
      </div>}
      {!upload.result && <Icon path={mdiImage} size={2} className={classes.imageIcon}/>}
      {!upload.isComplete() && <LinearProgress color="secondary" variant="determinate" value={percent} className={classes.progress}/>}
      {/*<span className={classes.fileSize}>{file.size}</span>*/}
    </div>
  );
};

export default withStyles(styles)(File)