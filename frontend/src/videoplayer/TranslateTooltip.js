import React from "react";
import {withStyles} from "@material-ui/core";
import {style} from "./TranslateTooltip.style";
import Grid from "@material-ui/core/Grid/Grid";
import {mdiVolumeHigh, mdiBookPlus} from "@mdi/js";
import {Icon} from "@mdi/react";
import PropTypes from "prop-types";
import ClipLoader from "react-spinners/ClipLoader";
import api from "../api";

class TranslateTooltip extends React.PureComponent {

  constructor(props) {
    super (props);
    this.audio = null;
  }

  playSound = async () => {
    const {translatedWord} = this.props;
    if (translatedWord.soundUrl == null) {
      let result = await api.get(`/dictionary/sound/path?text=${translatedWord.word}&lang=${translatedWord.language}`);
      this.audio = new Audio(result.url);
    } else {
      this.audio = new Audio(translatedWord.soundUrl);
    }

    this.audio.play();
  };

  render() {
    const {translatedWord, classes, word, loading} = this.props;

    return (
      <div className={classes.wrapper}>
        {!loading  && translatedWord ?
          <React.Fragment>
            <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} className={classes.header}
                  alignItems={"center"}>
              <Grid item>
                <span className={classes.word}>{word}</span>
              </Grid>
              <Grid item style={{alignSelf: "start"}}>
                <Grid container direction={"row"} alignItems={"center"} wrap={"nowrap"}>
                  <Icon path={mdiVolumeHigh} size={1} className={classes.icon} onClick={this.playSound}/>
                  <Icon path={mdiBookPlus} size={1} className={classes.icon}/>
                </Grid>
              </Grid>
            </Grid>

            <Grid container direction={"column"} spacing={8}>
              <Grid item>
                <div className={classes.defaultTranslation}>
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
  translatedWord: PropTypes.object,
  loading: PropTypes.bool
};

export default withStyles(style)(TranslateTooltip);