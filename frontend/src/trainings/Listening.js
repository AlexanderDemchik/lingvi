import React, {Component} from 'react';
import {Button, Paper, withStyles} from "@material-ui/core";
import api, {DICTIONARY_SOUND_PATH} from "../api";
import Grid from "@material-ui/core/Grid";
import VoiceTranslation from "../shared/VoiceTranslation";
import ButtonBase from "@material-ui/core/ButtonBase";
import WordProgress from "../shared/WordProgress";
import {Icon} from "@mdi/react";
import {mdiVolumeHigh} from "@mdi/js";
import BootstrapTextField from "../shared/BootstrapTextField";

const styles = (theme) => ({
  root: {
    width: "500px",
    margin: "auto",
    overflow: "hidden",
    position: "relative"
  },
  word: {
    fontSize: 25,
    marginBottom: 10,
    position: "relative"
  },
  wordTranscription: {
    marginBottom: 10,
    color: theme.palette.grey[400]
  },
  answerButton: {
    padding: "5px 10px",
    fontWeight: 500,
    textAlign: "left",
    fontSize: 17,
    marginBottom: 10,
    justifyContent: "flex-start",
    minHeight: 30,
    lineHeight: 1,
    width: "100%",
    boxShadow: theme.shadows[1],
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    },
  },
  rightAnswer: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.success.main,
    },
  },
  wrongAnswer: {
    color: "#fff",
    backgroundColor: theme.palette.error.main,
    "&:hover": {
      backgroundColor: theme.palette.error.main,
    },
  },
  nextButton: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
  },
  progress: {
    width: "100%",
    height: 20,
    backgroundColor: theme.palette.grey[300],
    overflow: "hidden",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  progressFill: {
    height: "100%",
    top: 0,
    left: 0,
    bottom: 0,
    position: "absolute",
    transition: "all .2s linear",
    backgroundColor: theme.palette.success.main,
    color: "#fff"
  },
  progressText: {
    fontSize: 10,
    zIndex: 10,
    color: "#fff",
    textAlign: "center"
  },
  volume: {


  },
  volumeWrapper: {
    border: '1px solid ' + theme.palette.grey[400],
    borderRadius: "100%",
    margin: 20,
    padding: 10,
    cursor: "pointer",
    color: theme.palette.grey[400],
    fill: theme.palette.grey[400],
  },
  placeholderRow: {
    backgroundColor: theme.palette.grey[300],
    borderRadius: "20px",
    height: 20,
    marginBottom: 10
  },
  playing: {
    fill: theme.palette.secondary.main,
    color: theme.palette.secondary.main,
    border: '1px solid ' + theme.palette.secondary.main
  },
  statusWrong: {
    fontSize: 15,
    color: theme.palette.error.main
  },
  statusOk: {
    fontSize: 15,
    color: theme.palette.success.main
  }

});

const STAGE_STATUS = {
  NOT_ANSWERED: "NOT_ANSWERED",
  RIGHT: "RIGHT",
  WRONG: "WRONG"
};

class Listening extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: null,
      stage: 0,
      selectedAnswer: null,
      text: "",
      playing: false,
      stageStatus: STAGE_STATUS.NOT_ANSWERED
    };
    this.audio = null;
  }

  componentDidMount() {
    api.get("/trainings/listening").then((r) => {
      this.setState({gameData: r.data.words}, () => {
        this.playSound();
      });
    }).catch(e => {
      console.log("error")
    });
  }
  playSound = async () => {
    const {gameData, stage} = this.state;

    let word = gameData[stage].word;
    if (this.audio == null) {
      if (word.soundUrl == null) {
        let result = await api.get(`${DICTIONARY_SOUND_PATH}?text=${word.text}&lang=${word.language}`);
        this.audio = new Audio(result.data.url);
      } else {
        this.audio = new Audio(word.soundUrl);
      }
    }

    this.audio.onplaying = () => this.setState({playing: true});
    this.audio.onended = () => this.setState({playing: false});

    this.audio.play();
  };

  checkAnswer() {
    const {text, gameData, stage} = this.state;
    if (text.trim().toLowerCase() === gameData[stage].word.text) {
      this.setState({stageStatus: STAGE_STATUS.RIGHT})
    } else {
      this.setState({stageStatus: STAGE_STATUS.WRONG});
    }
  }

  next() {
    this.audio && this.audio.pause();
    this.audio = null;
    this.setState({stage: this.state.stage + 1, playing: false, stageStatus: STAGE_STATUS.NOT_ANSWERED}, () => {
      this.playSound();
    });
  }

  render() {
    const {classes} = this.props;
    const {gameData, stage, text, playing, stageStatus} = this.state;
    return (
      <Paper className={classes.root}>
        {
          gameData && gameData[stage] && (
            <>
              <div className={classes.progress}>
                <div className={classes.progressText}>{`${stage} / ${gameData.length}`}</div>
                <div className={classes.progressFill} style={{width: `${stage * 10}%`}}/>
              </div>

              <Grid container justify={"space-between"}>

                <div className={`${classes.volumeWrapper} ${playing && classes.playing}`}  onClick={() => this.playSound()}>
                  <Icon path={mdiVolumeHigh} size={4} className={classes.volume}/>
                </div>

                <Grid item>
                  <Grid container direction={"column"} justify={"center"} style={{height: "100%", padding: 20}}>
                    <BootstrapTextField placeholder={'type word'} style={{marginBottom: 10}} value={text} onChange={(e) => this.setState({text: e.target.value})}/>
                    {stageStatus === STAGE_STATUS.NOT_ANSWERED && <Button color={"secondary"} variant={"contained"} style={{marginBottom: 10}} onClick={() => this.checkAnswer()}>Проверить</Button>}
                    {stageStatus !== STAGE_STATUS.NOT_ANSWERED && <Button color={"secondary"} variant={"contained"} style={{marginBottom: 10}} onClick={() => this.next()}>Продолжить</Button>}
                    <div style={{height: 30}}>
                      <span className={classes.statusWrong}>{stageStatus === STAGE_STATUS.WRONG && "НЕВЕРНО"}</span>
                      <span className={classes.statusOk}>{stageStatus === STAGE_STATUS.RIGHT && "ВЕРНО"}</span>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <div style={{height: 100, margin: 15}}>
                {stageStatus !== STAGE_STATUS.NOT_ANSWERED ? (
                  <>
                    <div className={classes.word}>
                      {gameData[stage].word.text}
                      <WordProgress style={{position: "absolute", right: 10, top: 0, width: 50, height: 50}}/>
                    </div>
                    <div className={classes.wordTranscription}>
                      [{gameData[stage].word.transcription}]
                    </div>
                    <div className={classes.wordTranslations}>
                      {gameData[stage].userTranslations.map(el => el.translation).join(", ")}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={classes.placeholderRow} style={{width: "30%"}}/>
                    <div className={classes.placeholderRow}/>
                    <div className={classes.placeholderRow}/>
                  </>
                )}
              </div>

            </>
          )
        }
        {/*<WordProgress style={{position: "absolute", left: 10, bottom: 10, width: 50, height: 50}}/>*/}
      </Paper>
    );
  }
}

export default withStyles(styles)(Listening);