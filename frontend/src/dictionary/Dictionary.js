import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import withStyles from "@material-ui/core/styles/withStyles";
import {style} from "./Dictionary.style";
// import {connect} from "react-redux";
// import {clearUserWords, getAllUserWordIds, getUserWords} from "./actions";
import Table from "./components/Table";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";


class Dictionary extends Component {

  render() {
    return (
      <>
        <CssBaseline/>
        <Table/>
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
