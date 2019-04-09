import React, {Fragment} from "react";
import {style} from "./TranslationTooltipV2.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Popper from "./Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import PropTypes from "prop-types";
import api, {DICTIONARY_PATH, DICTIONARY_SOUND_PATH, TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../api";
import {ClipLoader} from "react-spinners";
import Grid from "@material-ui/core/es/Grid/Grid";
import VoiceTranslation from "./VoiceTranslation";
import { Scrollbars } from 'react-custom-scrollbars';

class TranslationTooltipV2 extends React.Component {

  constructor(props) {
    super (props);
    this.state = {
      isTranslationRequest: false,
      translatedWord: null,
      isAddToDictionaryRequest: false,
      isRemoveFromDictionaryRequest: false
    };
    this.audio = null;
  }

  playSound = async () => {
    const {translatedWord} = this.state;
    if (this.audio == null) {
      if (translatedWord.soundUrl == null) {
        let result = await api.get(`${DICTIONARY_SOUND_PATH}?text=${translatedWord.text}&lang=${translatedWord.language}`);
        this.audio = new Audio(result.data.url);
      } else {
        this.audio = new Audio(translatedWord.soundUrl);
      }
    }

    this.audio.play();
  };

  addToDictionary =  () => {
    this.setState({isAddToDictionaryRequest: true}, () => {
      api.post(`${USER_DICTIONARY_WORD_PATH}`, {from: this.props.language, to: "UA", word: this.props.word})
        .then(r => {
          this.setState({translatedWord: {...this.state.translatedWord, inUserDict: true, userDictId: r.data.id}, isAddToDictionaryRequest: false})
        })
        .catch(() => {
          this.setState({isAddToDictionaryRequest: false})
        })
    })
  };

  getTranslation = (word, from, to) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`${DICTIONARY_PATH}${TRANSLATION_PATH}/v2?text=${word}&from=${from}&to=${to}`)
        .then((r) => {
          this.setState({isTranslationRequest: false, translatedWord: r.data});
        }).catch(() => {
        this.setState({isTranslationRequest: false});
      })
    });
  };

  removeFromDictionary = () => {
    this.setState({isRemoveFromDictionaryRequest: true}, () => {
      api.delete(`${USER_DICTIONARY_WORD_PATH}/${this.state.translatedWord.userDictId}`)
        .then(() => {
          this.setState({isRemoveFromDictionaryRequest: false, translatedWord: {...this.state.translatedWord, inUserDict: false}});
        })
        .catch(() => {
          this.setState({isRemoveFromDictionaryRequest: false});
        })
    })
  };

  componentDidUpdate(prevProps) {
    const {text, open, from, to} = this.props;

    if (open === true && open !== prevProps.open && text !== "") {
      this.getTranslation(text, from, to)
    }
    // if (prevProps.text !== text) {
    //   this.getTranslation(text);
    // }
  };

  render() {
    const {onClickAway, open, anchorEl, classes, text} = this.props;
    const {isTranslationRequest, translatedWord} = this.state;
    return (
      <Popper placement={"bottom"} open={open} anchorEl={anchorEl}>
        <ClickAwayListener onClickAway={onClickAway}>
          <div>
          {!isTranslationRequest && translatedWord ? (
            <Fragment>
              <Grid container direction={"row"} className={classes.header} wrap={"nowrap"} alignItems={"center"} justify={"space-between"}>
                <Grid item className={classes.word}>
                  <span>{text}</span>
                </Grid>
                <Grid item>
                  <VoiceTranslation word={translatedWord}/>
                </Grid>
              </Grid>
              <Scrollbars autoHide autoHeight autoHeightMin={0} autoHeightMax={100}>
              <div className={classes.body}>
              {
                translatedWord.translations.map((tr) => (
                  <div className={`${tr.inUserDict && classes.inDictTranslation} ${classes.translation}`}>{tr.translation}</div>
                ))
              }
              </div>
              </Scrollbars>
            </Fragment>
          ) : (<div className={classes.loader}><ClipLoader color="inherit" size={14}/></div>)}
          </div>
        </ClickAwayListener>
      </Popper>
    )
  }
}

TranslationTooltipV2.propTypes = {
  onClickAway: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
};


export default withStyles(style)(TranslationTooltipV2)