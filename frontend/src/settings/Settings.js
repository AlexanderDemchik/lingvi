import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Select from "../shared/Select";
import Typography from "@material-ui/core/Typography/Typography";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import RequestButton from "../shared/RequestButton";
import Grid from "@material-ui/core/Grid/Grid";
import Button from "@material-ui/core/Button/Button";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/es/styles/withStyles";
import {styles} from "./Settings.style";
import {getSettings, saveI18nSettings} from "./actions";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uiLanguage: "",
      translationLanguage: ""
    }
  }

  componentWillMount() {
    const {getSettings, uiLanguage, translationLanguage} = this.props;

    getSettings().then(() => {
      this.setState({uiLanguage, translationLanguage});
    });
  };

  onChangeUiLanguage = (lang) => {
    this.setState({uiLanguage: lang})
  };

  onChangeTranslationLanguage = (lang) => {
    this.setState({translationLanguage: lang})
  };

  render() {
    const {classes, isSavingI18nSettings, saveI18nSettings} = this.props;
    const {uiLanguage, translationLanguage} = this.state;
    return (
      <Grid container direction={"column"} justify={"center"} className={classes.container}>
        <Typography variant={"h6"}>Интернационализация</Typography>
        <Typography variant={"body1"}>Язык пользовательского интерфейса</Typography>
        <Select value={uiLanguage} onChange={(e) => this.onChangeUiLanguage(e.target.value)}>
          {["EN", "RU", "UA"].map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
        <Typography variant={"body1"}>Направление перевода</Typography>
        <Select value={translationLanguage} onChange={(e) => this.onChangeTranslationLanguage(e.target.value)}>
          {["RU", "UA"].map((el) => (
            <MenuItem value={el}>{el}</MenuItem>
          ))}
        </Select>
        <Button color={"primary"}>Cancel</Button>
        <RequestButton color={"primary"} variant={"contained"} isRequest={isSavingI18nSettings} onClick={() => saveI18nSettings(translationLanguage, uiLanguage)}>Save</RequestButton>
      </Grid>
    );
  }
}

Settings.propTypes = {};

const mapStateToProps = (state) =>  ({
  uiLanguage: state.settings.uiLanguage,
  translationLanguage: state.settings.translationLanguage,
  isSavingI18nSettings: state.settings.isSavingI18nSettings
});

const mapDispatchToProps = {
  getSettings,
  saveI18nSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings));
