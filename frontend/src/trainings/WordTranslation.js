import React, {Component} from 'react';
import {Paper, withStyles} from "@material-ui/core";
import api from "../api";
import Grid from "@material-ui/core/Grid";
import VoiceTranslation from "../shared/VoiceTranslation";
import ButtonBase from "@material-ui/core/ButtonBase";
import WordProgress from "../shared/WordProgress";

const styles = (theme) => ({
  root: {
    width: "500px",
    margin: "auto",
    overflow: "hidden",
    position: "relative"
  },
  word: {
    fontSize: 25
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
  }

});

class WordTranslation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameData: null,
      stage: 0,
      selectedAnswer: null
    };
  }

  componentDidMount() {
    api.get("/trainings/wordTranslation").then((r) => {
      this.setState({gameData: r.data});
    }).catch(e => {
      console.log("error")
    });
  }

  selectAnswer(id) {
    if (!this.state.selectedAnswer) this.setState({selectedAnswer: id});
    if (this.state.stage === (this.state.gameData.length - 1)) this.setState({stage: 0})
  }

  next() {
    this.setState({selectedAnswer: null, stage: this.state.stage + 1});
  }

  render() {
    const {classes} = this.props;
    const {gameData, stage, selectedAnswer} = this.state;
    return (
      <Paper className={classes.root}>
        {
          gameData && gameData[stage].word && (
            <>
              <div className={classes.progress}>
                <div className={classes.progressText}>{`${stage} / ${gameData.length}`}</div>
                <div className={classes.progressFill} style={{width: `${stage * 10}%`}}/>
              </div>
              <Grid container direction={"row"} wrap={"nowrap"} justify={"space-between"} style={{padding: 30}}>
                <Grid item style={{flexGrow: 1}} xs={6}>
                  <Grid direction={"column"}>
                    <div className={classes.word}>{gameData[stage].word.word.text}</div>
                    <VoiceTranslation size={2} withLabel word={gameData[stage].word.word}/>
                    {
                      selectedAnswer && (
                        gameData[stage].word.userTranslations.map(el => el.translation).join(", ")
                      )
                    }
                  </Grid>
                </Grid>
                <Grid item style={{flexGrow: 1}} xs={6}>
                  {gameData[stage].answers.map(answer => {
                    const isRight = selectedAnswer && answer.id === gameData[stage].answer;
                    const isWrong = selectedAnswer && (selectedAnswer === answer.id && answer.id !== gameData[stage].answer);
                    return (
                      <ButtonBase className={`${classes.answerButton} ${isRight && classes.rightAnswer} ${isWrong && classes.wrongAnswer}`} onClick={() => this.selectAnswer(answer.id)}>
                        {answer.translation}
                      </ButtonBase>
                    )
                  })}
                  {selectedAnswer ? (
                    <ButtonBase className={`${classes.nextButton} ${classes.answerButton}`} style={{marginTop: 20}} onClick={() => this.next()}>
                      Следующее
                    </ButtonBase>
                  ) : (
                    <ButtonBase className={classes.answerButton} style={{marginTop: 20}} onClick={() => this.selectAnswer(-1)}>
                      Не знаю
                    </ButtonBase>
                  )}
                </Grid>
              </Grid>
            </>
          )
        }
        <WordProgress style={{position: "absolute", left: 10, bottom: 10, width: 50, height: 50}}/>
      </Paper>
    );
  }
}

export default withStyles(styles)(WordTranslation);