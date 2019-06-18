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
import BootstrapTextField from "../shared/BootstrapTextField";
import FileChooser from "../shared/fileChooser/FileChooser";
import CssBaseline from "@material-ui/core/CssBaseline";

class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uiLanguage: "",
      translationLanguage: "",
      name: "",
      surname: ""
    }
  }

  componentWillMount() {
    const {getSettings, settings, uiLanguage, translationLanguage} = this.props;

    getSettings().then(() => {
      this.setState({uiLanguage, translationLanguage});
    });

    this.setState({name: settings.givenName, surname: settings.familyName});
  };

  onChangeUiLanguage = (lang) => {
    this.setState({uiLanguage: lang})
  };

  onChangeTranslationLanguage = (lang) => {
    this.setState({translationLanguage: lang})
  };

  render() {
    const {classes, isSavingI18nSettings, saveI18nSettings} = this.props;
    const {uiLanguage, translationLanguage, name, surname} = this.state;
    return (
      <>
      <CssBaseline/>
      <Grid container direction={"column"} justify={"center"} className={classes.container} style={{maxWidth: 400}}>
        <Typography variant={"h6"}>Язык и субтитры</Typography>
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
        <Grid container justify={"flex-end"} style={{marginTop: "10px"}}>
          <Button color={"secondary"}>Cancel</Button>
          <RequestButton color={"secondary"} variant={"contained"} isRequest={isSavingI18nSettings} onClick={() => saveI18nSettings(translationLanguage, uiLanguage)}>Save</RequestButton>
        </Grid>
        <Typography variant={"h6"}>Изменение пароля</Typography>
        <Typography variant={"body1"}>Текущий пароль</Typography>
        <BootstrapTextField type={"password"}/>
        <Typography variant={"body1"}>Новый пароль</Typography>
        <BootstrapTextField type={"password"}/>
        <Grid container justify={"flex-end"} style={{marginTop: "10px"}}>
          <Button color={"secondary"}>Cancel</Button>
          <RequestButton color={"secondary"} variant={"contained"} isRequest={isSavingI18nSettings} onClick={() => saveI18nSettings(translationLanguage, uiLanguage)}>Save</RequestButton>
        </Grid>
        <Typography variant={"h6"}>Персональные настройки</Typography>
        <Typography variant={"body1"}>Имя</Typography>
        <BootstrapTextField value={name} onChange={e => this.setState({name: e.target.name})}/>
        <Typography variant={"body1"}>Фамилия</Typography>
        <BootstrapTextField value={surname} onChange={e => this.setState({surname: e.target.name})}/>
        <Typography variant={"body1"}>Фото</Typography>
        <FileChooser rootRef={ref => this.userImg = ref}/>
        <Grid container justify={"flex-end"} style={{marginTop: "10px"}}>
          <Button color={"secondary"}>Cancel</Button>
          <RequestButton color={"secondary"} variant={"contained"} isRequest={isSavingI18nSettings} onClick={() => saveI18nSettings(translationLanguage, uiLanguage)}>Save</RequestButton>
        </Grid>
      </Grid>
      </>
    );
  }
}

Settings.propTypes = {};

const mapStateToProps = (state) =>  ({
  uiLanguage: state.settings.uiLanguage,
  translationLanguage: state.settings.translationLanguage,
  settings: state.settings,
  isSavingI18nSettings: state.settings.isSavingI18nSettings
});

const mapDispatchToProps = {
  getSettings,
  saveI18nSettings
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Settings));
