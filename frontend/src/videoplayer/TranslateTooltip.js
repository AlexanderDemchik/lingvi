import React from "react";
import {withStyles} from "@material-ui/core";
import {style} from "./TranslateTooltip.style";
import Grid from "@material-ui/core/Grid/Grid";
import {mdiVolumeHigh, mdiBookPlus, mdiBookRemove} from "@mdi/js";
import {Icon} from "@mdi/react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import api, {DICTIONARY_PATH, DICTIONARY_SOUND_PATH, USER_DICTIONARY_WORD_PATH} from "../api";
import {TRANSLATION_PATH} from "../api";
import Tooltip from '../shared/Tooltip';
import TooltipV2 from "../shared/TooltipV2";

class TranslateTooltip extends React.PureComponent {

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

  componentDidMount() {
    if (this.props.innerRef) this.props.innerRef(this);
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

  getTranslation = (word) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`${DICTIONARY_PATH}${TRANSLATION_PATH}?text=${word}&from=${this.props.language}&to=UA`)
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

  render() {
    const {classes, word} = this.props;
    const {isTranslationRequest, translatedWord} = this.state;

    return (
      <div className={classes.wrapper}>
        {!isTranslationRequest  && translatedWord ?
          <React.Fragment>
            <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} className={classes.header}
                  alignItems={"center"}>
              <Grid item className={classes.word}>
                <span>{word}</span>
              </Grid>
              <Grid item style={{alignSelf: "start"}}>
                <Grid container direction={"row"} alignItems={"center"} wrap={"nowrap"}>
                  <Tooltip placement={"top"} title={translatedWord.transcription}>
                    <Icon path={mdiVolumeHigh} size={1} className={classes.icon} onClick={this.playSound}/>
                  </Tooltip>

                    <Tooltip placement={"top"} title={!translatedWord.inUserDict ? "Add to dictionary" : "Remove from dictionary"}>
                      <div>
                        {!translatedWord.inUserDict ? (
                          <Icon path={mdiBookPlus} size={1} className={`${classes.icon} ${classes.dictionaryIcon}`} onClick={this.addToDictionary}/>
                        ) : (
                          <Icon path={mdiBookRemove} size={1} className={`${classes.icon} ${classes.dictionaryIcon} ${classes.inUserDict}`} onClick={this.removeFromDictionary}/>
                        )}
                      </div>
                    </Tooltip>
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
    )
  }
}

TranslateTooltip.propTypes = {
  classes: PropTypes.object,
  word: PropTypes.string,
  innerRef: PropTypes.func,
  language: PropTypes.string
};

export default withStyles(style)(TranslateTooltip);