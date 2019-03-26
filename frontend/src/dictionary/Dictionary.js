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
import {USER_DICTIONARY_PATH} from "../api";
import api from "../api";
import Select from "../shared/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";

class Dictionary extends Component {

  state = {
    meta: [],
    currentDict: ""
  };

  componentDidMount() {
    this.loadDictionaryMeta();
  }

  loadDictionaryMeta = async () => {
    let response = await api.get(USER_DICTIONARY_PATH + "/meta");
    this.setState({meta: response.data}, () => {

    });
  };

  render() {
    const {classes} = this.props;
    const {meta, currentDict} = this.state;
    return (
      <>
        <CssBaseline/>
        <Grid container direction={"row"} className={`${classes.wrapper} ${classes.container}`} justify={"space-between"}>
          <Grid item className={classes.meta}>
            <Grid container direction={"column"}>
              <Typography variant={"h5"}>Мой словарь</Typography>
              <Select value={currentDict} onChange={e => this.setState({currentDict: e.target.value})} className={classes.select}>
                {meta.map((el) => (
                  <MenuItem value={el}>{el.from + " → " + el.to + " (" + el.num + " слова)"}</MenuItem>
                ))}
              </Select>
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

// Dictionary.propTypes = {
//   records: PropTypes.array
// };

// const mapStateToProps = (state) => ({
//   allIds: state.dictionary.allIds,
//   records: state.dictionary.records,
//   hasMore: state.dictionary.hasMore,
//   loading: state.dictionary.loading,
//   currentPage: state.dictionary.currentPage
// });
//
// const mapDispatchToProps = (dispatch) => ({
//   getUserWords: (page) => dispatch(getUserWords(page, RECORDS_PER_PAGE)),
//   getAllUserWordIds: () => dispatch(getAllUserWordIds())
// });

export default withStyles(style)(Dictionary);
