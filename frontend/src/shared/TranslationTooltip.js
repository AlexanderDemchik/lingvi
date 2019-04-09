import React, {Fragment} from "react";
import {style} from "./TranslationTooltip.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Popper from "./Popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener/ClickAwayListener";
import PropTypes from "prop-types";
import api, {DICTIONARY_PATH, DICTIONARY_SOUND_PATH, TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../api";
import {ClipLoader} from "react-spinners";
import Grid from "@material-ui/core/es/Grid/Grid";
import {mdiBookPlus, mdiBookRemove, mdiVolumeHigh} from "@mdi/js";
import Tooltip from "./Tooltip";
import {Icon} from "@mdi/react";
class TranslationTooltip extends React.Component {

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
      api.post(`${USER_DICTIONARY_WORD_PATH}`, {from: this.props.from, to: this.props.to, word: this.props.text})
        .then(r => {
          this.setState({translatedWord: {...this.state.translatedWord, inUserDict: true, userDictId: r.data.id}, isAddToDictionaryRequest: false})
        })
        .catch(() => {
          this.setState({isAddToDictionaryRequest: false})
        })
    })
  };

  getTranslation = (word) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`${DICTIONARY_PATH}${TRANSLATION_PATH}?text=${word}&from=${this.props.from}&to=${this.props.to}`)
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
    if (this.props.innerRef) this.props.innerRef(this);
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
          <div className={classes.wrapper}>
            {!isTranslationRequest  && translatedWord ?
              <React.Fragment>
                <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} className={classes.header}
                      alignItems={"center"}>
                  <Grid item className={classes.word}>
                    <span>{text}</span>
                  </Grid>
                  <Grid item style={{alignSelf: "start"}}>
                    <Grid container direction={"row"} alignItems={"center"} wrap={"nowrap"}>
                      <Tooltip placement={"top"} title={translatedWord.transcription} tooltipPosition={"top-center"}>
                        <Icon path={mdiVolumeHigh} size={1} className={classes.icon} onClick={this.playSound}/>
                      </Tooltip>
                      {!translatedWord.inUserDict ? (
                        <Tooltip placement={"top"} title={"Add to dictionaryt"}>
                          <Icon path={mdiBookPlus} size={1} className={`${classes.icon} ${classes.dictionaryIcon}`} onClick={this.addToDictionary}/>
                        </Tooltip>
                      ) : (
                        <Tooltip placement={"top"} title={"Remove from dictionary"}>
                          <Icon path={mdiBookRemove} size={1} className={`${classes.icon} ${classes.dictionaryIcon} ${classes.inUserDict}`} onClick={this.removeFromDictionary}/>
                        </Tooltip>
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid container direction={"column"} spacing={8}>
                  <Grid item>
                    <div className={`${classes.defaultTranslation} ${translatedWord.inUserDict && classes.inUserDict}`}>
                      {translatedWord.defaultTranslation.translation}
                    </div>
                  </Grid>
                  {
                    translatedWord.translations && Object.keys(translatedWord.translations).map(partOfSpeech => (
                      <Grid item key={partOfSpeech}>
                        <Grid container direction={"row"} wrap={"nowrap"} spacing={8} justify={"space-between"} alignContent={"flex-start"} style={{textAlign: "left"}}>
                          <Grid item>
                            <span className={classes.translations}>{translatedWord.translations[partOfSpeech].map(translation => translation.translation).slice(0, 3).join(", ")}</span> {/*May more better slice translations on the server*/}
                          </Grid>
                          <Grid item>
                            <span className={classes.partOfSpeech}>{partOfSpeech}</span>
                          </Grid>
                        </Grid>
                      </Grid>
                    ))
                  }
                </Grid>
              </React.Fragment> : <div className={classes.loader}><ClipLoader color="inherit" size={14}/></div>
            }
          </div>
        </ClickAwayListener>
      </Popper>
    )
  }
}

TranslationTooltip.propTypes = {
  onClickAway: PropTypes.func,
  open: PropTypes.bool,
  text: PropTypes.string,
  from: PropTypes.string,
  to: PropTypes.string,
};


export default withStyles(style)(TranslationTooltip)