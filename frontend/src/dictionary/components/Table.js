import React, {Component} from 'react';
import {style} from "./Table.style";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "./TableRow";
import InfiniteScroll from '../../shared/InfiniteScroll';
import api, {TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../../api";
import TableHeader from "./TableHeader";
import CardCarousel from "./CardCarousel";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {
  addToDictionary, addTranslationToWord, batchWordDelete, changeImage,
  changeWordCardIndex, changeWordCardOpen, deleteDictionary, deleteFromDictionary, deleteTranslationFromWord,
  deleteWord, getUserWords,
  onChangeFilter, onSelect,
  onSelectAll,
} from "../actions";
import {ClipLoader} from "react-spinners";

class Table extends Component {

  constructor(props) {
    super(props);
  }

  onRowClick = (i) => {
    const {changeWordCardIndex, changeWordCardOpen} = this.props;
    changeWordCardIndex(i);
    changeWordCardOpen(true);
  };

  onCardIndexChange = (index) => {
    const {records, currentPage, hasMore, filter, recordsPerPage, changeWordCardIndex, getUserWords} = this.props;
    changeWordCardIndex(index);
    if (index === -1) return;
    if ((records.length - index) <= recordsPerPage && hasMore) {
      getUserWords(currentPage + 1, recordsPerPage, filter);
    }
  };

  render() {
    const {classes, allIds, records, hasMore, loading, currentPage, filter, recordsPerPage, onFilterChange, selectAll, onDelete, getUserWords, onSelectAll, onSelect, selected, changeWordCardOpen, batchWordDelete, wordCardOpen, wordCardIndex, addToDictionary, deleteFromDictionary, batchDeleteProceed, changeImage, deleteTranslationFromWord, addTranslationToWord, currentDict, deleteDictionary} = this.props;
    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <CardCarousel open={wordCardOpen} onClose={() => changeWordCardOpen(false)} values={records} index={wordCardIndex} changeIndex = {this.onCardIndexChange} deleteTranslation={deleteTranslationFromWord} deleteCard={onDelete} onChangeUserWordImage={changeImage} addTranslation={addTranslationToWord}/>
          <TableHeader selected={selected} selectAll={selectAll} onSelectAll={onSelectAll} selectAllDisabled={allIds.length === 0} onFilterChange={onFilterChange} filterValue={filter} onDeleteAll={batchWordDelete} deleteAllProceed={batchDeleteProceed} onAddToDictionary={addToDictionary} onDeleteFromDictionary={deleteFromDictionary} currentDict={currentDict} deleteDictionary={deleteDictionary}/>
          <InfiniteScroll data={records} loadMore={() => getUserWords(currentPage + 1, recordsPerPage, filter)} hasMore={hasMore} isLoading={loading} threshold={300} loaderComponent={<div className={classes.loaderWrapper}><ClipLoader size={50} color={"inherit"}/></div>}>
            {records.map((row, i) => (
              <TableRow row={row} key={row.id} i={i} selected={selected.indexOf(row.id) !== -1} onSelect={() => onSelect(row.id)} onDelete={() => onDelete(row.id)} onRowClick={() => this.onRowClick(i)}/>
            ))}
          </InfiniteScroll>
        </div>
        {loading && <div className={classes.loaderWrapper}><ClipLoader size={50} color={"inherit"}/></div>}
      </React.Fragment>
  );
  }
}

Table.defaultProps = {
  recordsPerPage: 20
};

Table.propTypes = {
  allIds: PropTypes.array,
  getUserWords: PropTypes.func,
  records: PropTypes.array,
  hasMore: PropTypes.bool,
  currentPage: PropTypes.number,
  filter: PropTypes.string,
  loading: PropTypes.bool,
  recordsPerPage: PropTypes.number,
  onFilterChange: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteTranslation: PropTypes.func,
  selected: PropTypes.array,
  onSelectAll: PropTypes.func,
  onSelect: PropTypes.func,
  onRowClick: PropTypes.func,
  selectAll: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  allIds: state.dictionary.allIds,
  records: state.dictionary.records,
  hasMore: state.dictionary.hasMore,
  currentPage: state.dictionary.currentPage,
  filter: state.dictionary.filter,
  loading: state.dictionary.loading,
  selected: state.dictionary.selected,
  selectAll: state.dictionary.selectAll,
  wordCardIndex: state.dictionary.wordCardIndex,
  wordCardOpen: state.dictionary.wordCardOpen,
  batchDeleteProceed: state.dictionary.batchDeleteProceed,
  currentDict: state.dictionary.currentDict
});

const mapDispatchToProps = {
  getUserWords: getUserWords,
  onDelete: deleteWord,
  onSelectAll: onSelectAll,
  onSelect: onSelect,
  onFilterChange: onChangeFilter,
  changeWordCardIndex,
  changeWordCardOpen,
  addToDictionary,
  deleteFromDictionary,
  batchWordDelete,
  deleteTranslationFromWord,
  changeImage,
  addTranslationToWord,
  deleteDictionary
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(style)(Table));
