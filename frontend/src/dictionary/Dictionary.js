import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./Dictionary.style";
// import {connect} from "react-redux";
// import {clearUserWords, getAllUserWordIds, getUserWords} from "./actions";
import Table from "./components/Table";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Grid from "@material-ui/core/Grid/Grid";
import {Typography} from "@material-ui/core";
import {TRANSLATION_PATH, USER_DICTIONARY_PATH, USER_DICTIONARY_WORD_PATH, WORD_PATH} from "../api";
import api from "../api";
import Select from "../shared/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import CardCarousel from "./components/CardCarousel";
import {debounce} from "lodash";
import {connect} from "react-redux";
import {addDictionary, getAllUserWordIds, getUserWords, loadDictionaryMeta, onDictionaryChange} from "./actions";
import RequestButton from "../shared/RequestButton";
import Tooltip from "../shared/Tooltip";

class Dictionary extends Component {

  state = {
   newDict: {
     from: "EN",
     to: ""
   }
  };

  componentDidMount() {
    const {loadDictionaryMeta, onDictionaryChange, currentPage, getUserWords, account} = this.props;
    loadDictionaryMeta().then(() => {
      const {meta} = this.props;
      let currentDict;
      if (localStorage.getItem("currentDict") !== null) {
        let splitted = localStorage.getItem("currentDict").split("-");
        let filtered = meta.filter((el) => (el.from === splitted[0] && el.to === splitted[1]));
        if (filtered.length > 0) {
          currentDict = filtered[0];
        } else {
          currentDict = meta[0];
        }
      } else {
        currentDict = meta[0];
      }

      if (!currentDict) currentDict = {from: "EN", to: account.translationLanguage, num: 0};

      onDictionaryChange(currentDict);
    });
  }

  render() {
    const {classes, currentDict, meta, onDictionaryChange, addDictionary} = this.props;
    const {newDict} = this.state;
    return (
      <>
        <CssBaseline/>
        <Grid container direction={"row"} className={`${classes.wrapper} ${classes.container}`} justify={"space-between"}>
          <Grid item className={classes.meta}>
            <Grid container direction={"column"}>
              <Typography variant={"h5"}>Мой словарь</Typography>
              <Select value={currentDict || {}} onChange={(e) => onDictionaryChange(e.target.value)} className={classes.select}>
                {meta.map((el) => (
                  <MenuItem value={el}>{el.from + " → " + el.to + " (" + el.num + " слова)"}</MenuItem>
                ))}
              </Select>
              <Grid container justify={"space-between"} alignContent={"center"}>
                {/*<Tooltip title={"Language of words"} placement={"top"}>*/}
                  <Select className={classes.langSelect} value={newDict.from} style={{marginRight: 10}} onChange={e => this.setState({newDict: {...newDict, from: e.target.value}})} disabled>
                    <MenuItem disabled value="">
                      <em>words language</em>
                    </MenuItem>
                    {["EN"].map((el) => <MenuItem value={el}>{el}</MenuItem>)}
                  </Select>
                {/*</Tooltip>*/}
                {/*<Tooltip title={"Translation language"} placement={"top"}>*/}
                  <Select className={classes.langSelect} value={newDict.to} onChange={e => this.setState({newDict: {...newDict, to: e.target.value}})}>
                    <MenuItem disabled value={""}>
                      <em>translation language</em>
                    </MenuItem>
                    {["EN", "RU", "UA"].map((el) => <MenuItem value={el}>{el}</MenuItem>)}
                  </Select>
                {/*</Tooltip>*/}
              </Grid>
              <RequestButton isRequest={false} style={{marginBottom: 20}} variant={"contained"} color={"secondary"} onClick={() => addDictionary(newDict.from, newDict.to)}>Add new dictionary</RequestButton>
            </Grid>
          </Grid>
          <Grid item className={classes.dictionary}>
            <Table/>
          </Grid>
        </Grid>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentDict: state.dictionary.currentDict,
  meta: state.dictionary.meta,
  records: state.dictionary.records,
  currentPage: state.dictionary.currentPage,
  account: state.settings
});

const mapDispatchToProps = {
  loadDictionaryMeta,
  getUserWords,
  getAllUserWordIds,
  onDictionaryChange,
  addDictionary
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Dictionary));
