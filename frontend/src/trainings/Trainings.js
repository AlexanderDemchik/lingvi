import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import {Grid} from "@material-ui/core";
import {containerStyle} from "../shared/styles/containerStyle";
import {Link, Switch, Route} from "react-router-dom";
import WordTranslation from "./WordTranslation";
import history from "../history";
import CssBaseline from "@material-ui/core/CssBaseline";
import TranslationWord from "./TranslationWord";
import Listening from "./Listening";

const styles = (theme) => ({
  root: {
    marginTop: 50,
    ...containerStyle
  },
  card: {
    minHeight: 100,
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    cursor: "pointer",
    fontSize: 20,
    padding: 10,
    color: theme.palette.grey[500],
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      color: "#fff"
    }
  },
  cardActive: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff"
  },
  trainingsList: {
    borderBottom: `1px solid ${theme.palette.grey[400]}`,
    marginBottom: 50
  }
});

class Trainings extends Component {
  render() {
    const {classes, location} = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline/>
        <Grid container direction={"row"} spacing={32} className={classes.trainingsList}>
          <Grid item>
            <Paper className={`${classes.card} ${location.pathname.startsWith('/trainings/wordTranslation') && classes.cardActive}`} onClick={() => history.push('/trainings/wordTranslation')}>
              Слово-перевод
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={`${classes.card} ${location.pathname.startsWith('/trainings/translationWord') && classes.cardActive}`} onClick={() => history.push('/trainings/translationWord')}>
              Перевод-слово
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={`${classes.card} ${location.pathname.startsWith('/trainings/listening') && classes.cardActive}`} onClick={() => history.push('/trainings/listening')}>
              Аудирование
            </Paper>
          </Grid>
        </Grid>

        <Switch>
          <Route path={"/trainings/wordTranslation"} component={WordTranslation}/>
          <Route path={"/trainings/translationWord"} component={TranslationWord}/>
          <Route path={"/trainings/listening"} component={Listening}/>
        </Switch>

      </div>
    );
  }
}

Trainings.propTypes = {};

export default withStyles(styles)(Trainings);