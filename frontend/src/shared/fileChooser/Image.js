import React, {useState} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import Icon from "@mdi/react";
import {mdiImage, mdiCloseBox} from "@mdi/js";
import LinearProgress from "@material-ui/core/LinearProgress";
import Tooltip from "@material-ui/core/Tooltip";

const Image = ({classes, upload, cancel}) => {
  const [hover, setHover] = useState(false);
  const backgroundImage = upload.result && (upload.result.path);
  const percent = (upload._offset / upload._size) * 100;
  return (
    <div className={`${classes.image} ${!backgroundImage && classes.imageWidth}`}  onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} onClick={(e) => {e.preventDefault(); e.stopPropagation(); console.log("click")}}>
  {backgroundImage && <img src={backgroundImage} alt={"preview"} width={"auto"} height={"100%"}/>}
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

export default withStyles(styles)(Image)