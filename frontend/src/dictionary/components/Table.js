import React, {Component} from 'react';
import {style} from "./Table.style";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "./TableRow";
import InfiniteScroll from '../../shared/InfiniteScroll';
import api, {TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../../api";
import TableHeader from "./TableHeader";
import CardCarousel from "./CardCarousel";
import PropTypes from "prop-types";



class Table extends Component {

  constructor(props) {
    super(props);
    this.ref = null;
  }

  render() {
    const {classes, allIds, records, hasMore, loading, currentPage, filter, recordsPerPage, onFilterChange, selectAll, onDelete, updateAfterFilter, getUserWords, onSelectAll, onSelect, selected, onRowClick} = this.props;
    return (
      <div className={classes.wrapper}>
        <TableHeader selected={selected} selectAll={selectAll} onSelectAll={onSelectAll} selectAllDisabled={allIds.length === 0} onFilterChange={onFilterChange} filterValue={filter} onSearch={updateAfterFilter}/>
        <InfiniteScroll data={records} loadMore={() => getUserWords(currentPage + 1, recordsPerPage, filter)} hasMore={hasMore} isLoading={loading} threshold={300}>
          <div ref={ref => this.ref = ref}>
          {records.map((row, i) => (
            <TableRow row={row} key={row.id} i={i} selected={selected.indexOf(row.id) !== -1} onSelect={() => onSelect(row.id)} onDelete={() => onDelete(row.id)} onRowClick={() => onRowClick(i)}/>
          ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

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
  updateAfterFilter: PropTypes.func,
  onDelete: PropTypes.func,
  onDeleteTranslation: PropTypes.func,
  selected: PropTypes.array,
  onSelectAll: PropTypes.func,
  onSelect: PropTypes.func,
  onRowClick: PropTypes.func,
  selectAll: PropTypes.bool,
};

export default withStyles(style)(Table);
