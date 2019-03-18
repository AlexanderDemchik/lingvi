import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {style} from "./Table.style";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "./TableRow";
import InfiniteScroll from '../../shared/InfiniteScroll';
import Checkbox from "@material-ui/core/Checkbox/Checkbox";
import Tooltip from "../../shared/Tooltip";
import api, {USER_DICTIONARY_WORD_PATH} from "../../api";
import TableHeader from "./TableHeader";

const RECORDS_PER_PAGE = 10;

class Table extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1,
      hasMore: true,
      loading: false,
      records: [],
      allIds: [],
      selected: [],//array of ids
      selectAll: false,
      isInit: false
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    try {
      await this.getAllUserWordIds();
    } catch (e) {
      console.log("error to load ids")
    }
    this.setState({isInit: true});
  };

  getUserWords = (page, limit) => {
    let result;
    let currentRecords = this.state.records;
    this.setState({loading: true}, async () => {
      try {
        result = await api.get(`${USER_DICTIONARY_WORD_PATH}?page=${page}&limit=${limit}`);
        result = result.data;
        currentRecords.push(...result.content);
        this.setState({records: currentRecords, loading: false, currentPage: result.page, hasMore: !result.last});
      } catch (e) {
        this.setState({loading: false, hasMore: false});
      }
    });
  };

  getAllUserWordIds = () => {
    return api.get(`${USER_DICTIONARY_WORD_PATH}/id`)
      .then(r => {
        this.setState({allIds: r.data});
      })
      .catch(e => {
        console.log(e);
      })
  };

  deleteWord = (id) => {
    const {selected, records} = this.state;
    return api.delete(`${USER_DICTIONARY_WORD_PATH}/${id}`).then(r => {
      this.setState({selected: selected.filter((el) => el.id !== id), records: records.filter((el) => el.id !== id)});
    });
  };

  onSelect = (id) => {
    const {selected, selectAll} = this.state;
    let index;
    let currentSelected = selected;
    if ((index = currentSelected.indexOf(id)) === -1) {
      currentSelected.push(id);
    } else {
      currentSelected.splice(index, 1);
      if (selectAll && currentSelected.length === 0) this.setState({selectAll: false});
    }
    this.setState({selected: currentSelected})
  };

  onSelectAll = () => {
    const {selectAll, allIds} = this.state;
    if (!selectAll) {
      this.setState({selected: allIds, selectAll: true});
    } else {
      this.setState({selected: [], selectAll: false});
    }
  };

  render() {
    const {classes} = this.props;
    const {selected, records, hasMore, loading, currentPage, isInit, selectAll} = this.state;
    return (
      <div className={classes.wrapper}>
        <TableHeader selected={selected} selectAll={selectAll} onSelectAll={this.onSelectAll} selectAllDisabled={!isInit}/>
        <InfiniteScroll data={records} loadMore={() => this.getUserWords(currentPage + 1, RECORDS_PER_PAGE)} hasMore={hasMore} isLoading={loading} threshold={300}>
          {records.map(row => (
            <TableRow row={row} key={row.id} selected={selected.indexOf(row.id) !== -1} onSelect={() => this.onSelect(row.id)} onDelete={() => this.deleteWord(row.id)}/>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

Table.propTypes = {};

export default withStyles(style)(Table);
