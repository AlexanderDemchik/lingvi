import React, {useState, useEffect, useRef} from "react";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import api, {DICTIONARY_PATH, WORD_PATH} from "../../api";
import {styles} from "./CardImage.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Popper from "../../shared/Popper";
import {Icon} from "@mdi/react";
import {mdiPlus} from "@mdi/js";
import ButtonBase from "@material-ui/core/ButtonBase/ButtonBase";

const CardImage = ({classes, wordId, onChangeUserWordImage, userWordId, ...props}) => {

  const [showOthers, setShowOthers] = useState(false);
  const [others, setOthers] = useState([]);
  const ref = useRef(null);

  const onImageClick = () => {
    setOthers([]);
    getImagesForWord(wordId);
    setShowOthers(!showOthers);
  };

  const onClickAway = (event) => {
    if (ref.current.contains(event.target)) {
      return;
    }
    setShowOthers(false);
  };

  const getImagesForWord = (wordId) => {

    api.get(`${DICTIONARY_PATH}${WORD_PATH}/${wordId}/image?page=0&limit=20`).then(r => {
      setOthers(r.data.content);
    });
  };

  const onChangeImage = (wordId, img) => {
    onChangeUserWordImage(wordId, img).then(() => setShowOthers(false));
  };

  return (
    <React.Fragment>
      <div className={classes.wrapper} ref={ref}>
        <img {...props}  onClick={onImageClick}/>
      </div>
        <Popper open={showOthers} placement={"right"} anchorEl={() => ref.current} disablePortal={false} classes={{paper: classes.popperPaper, popper: classes.popperRoot}}>
          <ClickAwayListener onClickAway={onClickAway}>
          <div className={classes.result}>
            <div className={classes.addBtnWrapper}>
              <ButtonBase className={classes.addBtn}>
                <Icon path={mdiPlus} className={classes.addIcon}/>
              </ButtonBase>
            </div>
            {others.map(img => (
              <div key={img.id} className={classes.smallImageWrapper}>
                <img className={classes.smallImage} src={img.rootPath + img.relativePath} onClick={() => onChangeImage(userWordId, img)}/>
              </div>
            ))}
          </div>
          </ClickAwayListener>
        </Popper>
    </React.Fragment>
  )
};

export default withStyles(styles)(CardImage);