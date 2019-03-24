import React, {Component} from 'react';
import {style} from "./Table.style";
import withStyles from "@material-ui/core/styles/withStyles";
import TableRow from "./TableRow";
import InfiniteScroll from '../../shared/InfiniteScroll';
import api, {TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../../api";
import TableHeader from "./TableHeader";
import CardCarousel from "./CardCarousel";

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
      wordCardOpen: false,
      wordCardIndex: -1,
      filter: ""
    };
    this.ref = null;
  }

  componentDidMount() {
    this.loadIds(this.state.filter);
  }

  loadIds = async (filter) => { //we need to load all ids, to know user dictionary length, and be able to select all
    try {
      await this.getAllUserWordIds(filter);
    } catch (e) {
      console.log("error to load ids")
    }
  };

  updateAfterFilter = () => {
    this.setState({records: [], allIds: [], hasMore: true, currentPage: -1}, () => {
      this.loadIds(this.state.filter);
    });
  };

  getUserWords = (page, limit, filter) => {
    let result;
    let currentRecords = this.state.records;
    this.setState({loading: true}, async () => {
      try {
        result = await api.get(`${USER_DICTIONARY_WORD_PATH}?page=${page}&limit=${limit}&filter=${filter}&from=${"EN"}&to=${"RU"}`);
        result = result.data;
        currentRecords.push(...result.content);
        this.setState({records: currentRecords, loading: false, currentPage: result.page, hasMore: !result.last});
      } catch (e) {
        this.setState({loading: false, hasMore: false});
      }
    });
  };

  getAllUserWordIds = (filter) => {
    return api.get(`${USER_DICTIONARY_WORD_PATH}/id?filter=${filter}&from=${"EN"}&to=${"RU"}`)
      .then(r => {
        this.setState({allIds: r.data});
      })
      .catch(e => {
        console.log(e);
      })
  };

  deleteWord = (id) => {
    const {selected, records, allIds} = this.state;
    return api.delete(`${USER_DICTIONARY_WORD_PATH}/${id}`).then(() => {
      this.setState({selected: selected.filter((el) => el !== id), records: records.filter((el) => el.id !== id), allIds: allIds.filter((el) => el !== id)});
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

  onRowClick = (i) => {
    this.setState({wordCardIndex: i, wordCardOpen: true});
  };

  onCardIndexChange = (index) => {
    const {records, currentPage, hasMore, filter} = this.state;
    this.setState({wordCardIndex: index});
    if (index === -1) return;
    if ((records.length - index) <= RECORDS_PER_PAGE && hasMore) {
      this.getUserWords(currentPage + 1, RECORDS_PER_PAGE, filter);
    }
  };

  onFilterChange = (val) => {
    this.setState({filter: val});
  };

  removeTranslationFromWord = (wordId, translationId) => {
    const {records} = this.state;
    api.delete(`${USER_DICTIONARY_WORD_PATH}/${wordId}${TRANSLATION_PATH}/${translationId}`).then(r => {
      let values = records;
      let i = values.findIndex((el) => el.id === wordId);
      let translations = values[i].userTranslations;
      values[i].userTranslations = translations.filter((el) => el.id !== translationId);
      this.setState({records: values});
    });
  };

  render() {
    const {classes} = this.props;
    const {selected, records, hasMore, loading, currentPage, selectAll, wordCardOpen, wordCardIndex, filter, allIds} = this.state;
    return (
      <div className={classes.wrapper}>
        <CardCarousel open={wordCardOpen} onClose={() => this.setState({wordCardOpen: false})} values={records} index={wordCardIndex} changeIndex = {this.onCardIndexChange} deleteTranslation={this.removeTranslationFromWord} deleteCard={this.deleteWord}/>
        <TableHeader selected={selected} selectAll={selectAll} onSelectAll={this.onSelectAll} selectAllDisabled={allIds.length === 0} onFilterChange={this.onFilterChange} filterValue={filter} onSearch={this.updateAfterFilter}/>
        <InfiniteScroll data={records} loadMore={() => this.getUserWords(currentPage + 1, RECORDS_PER_PAGE, filter)} hasMore={hasMore} isLoading={loading} threshold={300}>
          <div ref={ref => this.ref = ref}>
          {records.map((row, i) => (
            <TableRow row={row} key={row.id} i={i} selected={selected.indexOf(row.id) !== -1} onSelect={() => this.onSelect(row.id)} onDelete={() => this.deleteWord(row.id)} onRowClick={() => this.onRowClick(i)}/>
          ))}
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

Table.propTypes = {};

export default withStyles(style)(Table);
