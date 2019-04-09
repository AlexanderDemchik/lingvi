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

const RECORDS_PER_PAGE = 10;

class Dictionary extends Component {

  state = {
    meta: [],
    currentDict: {},
    currentPage: -1,
    hasMore: false,
    loading: false,
    records: [],
    allIds: [],
    filter: "",
    selected: [],//array of ids
    selectAll: false,
    wordCardOpen: false,
    wordCardIndex: -1,
  };

  componentDidMount() {
    const {currentPage, filter} = this.state;
    this.loadDictionaryMeta().then(() => {
      const {meta} = this.state;
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
      this.setState({currentDict}, () => {
        this.getAllUserWordIds(this.state.filter).then(r => {
          this.setState({allIds: r.data});
          this.getUserWords(currentPage + 1, RECORDS_PER_PAGE, filter);
        });
      });
    });
  }

  loadDictionaryMeta = () => {
    return new Promise(async (resolve) => {
      let response;
      try {
        response = await api.get(USER_DICTIONARY_PATH + "/meta");
      } catch (e) {
        resolve(false);
      }

      this.setState({meta: response.data}, () => {
        resolve(true);
      });
    })
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

  resetWords = () => {
    this.setState({records: [], allIds: [], hasMore: true, currentPage: -1}, () => {
      this.getAllUserWordIds(this.state.filter).then((r) => {
        this.setState({allIds: r.data})
      });
    });
  };

  getUserWords = (page, limit, filter, from, to) => {
    const {currentDict} = this.state;
    let result;
    let currentRecords = this.state.records;
    this.setState({loading: true}, async () => {
      try {
        result = await api.get(`${USER_DICTIONARY_WORD_PATH}?page=${page}&limit=${limit}&filter=${filter}&from=${currentDict.from}&to=${currentDict.to}`);
        result = result.data;
        currentRecords.push(...result.content);
        this.setState({records: currentRecords, loading: false, currentPage: result.page, hasMore: !result.last});
      } catch (e) {
        this.setState({loading: false, hasMore: false});
      }
    });
  };

  getAllUserWordIds = (filter) => {
    const {currentDict} = this.state;
    return api.get(`${USER_DICTIONARY_WORD_PATH}/id?filter=${filter}&from=${currentDict.from}&to=${currentDict.to}`);
  };

  deleteWord = (id) => {
    const {selected, records, allIds} = this.state;
    return api.delete(`${USER_DICTIONARY_WORD_PATH}/${id}`).then(() => {
      this.setState({selected: selected.filter((el) => el !== id), records: records.filter((el) => el.id !== id), allIds: allIds.filter((el) => el !== id)});
    });
  };

  onFilterChange = (val) => {
    this.setState({filter: val});
    this.updateAfterFilter();
  };

  updateAfterFilter = debounce(() => {
    this.resetWords();
  }, 1000);

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

  onDictionaryChange = (newDict) => {
    this.setState({currentDict: newDict, wordCardIndex: -1}, () => {
      localStorage.setItem("selectedDict", `${newDict.from}-${newDict.to}`);
      this.resetWords();
    });
  };

  onChangeUserWordImage = (wordId, image) => {
    const {records} = this.state;
    console.log(wordId);
    console.log(records);
    return api.post(`${USER_DICTIONARY_PATH}${WORD_PATH}/${wordId}/image`, {id: image.id}).then(response => {
      let values = records;
      let i = values.findIndex((el) => el.id === wordId);
      values[i].image = response.data;
      this.setState({records: values});
    });
  };

  render() {
    const {classes} = this.props;
    const {meta, currentDict, hasMore, loading, allIds, currentPage, filter, records, wordCardOpen, wordCardIndex, selected, selectAll} = this.state;
    return (
      <>
        <CssBaseline/>
        <CardCarousel open={wordCardOpen} onClose={() => this.setState({wordCardOpen: false})} values={records} index={wordCardIndex} changeIndex = {this.onCardIndexChange} deleteTranslation={this.removeTranslationFromWord} deleteCard={this.deleteWord} onChangeUserWordImage={this.onChangeUserWordImage}/>
        <Grid container direction={"row"} className={`${classes.wrapper} ${classes.container}`} justify={"space-between"}>
          <Grid item className={classes.meta}>
            <Grid container direction={"column"}>
              <Typography variant={"h5"}>Мой словарь</Typography>
              <Select value={currentDict} onChange={(e) => this.onDictionaryChange(e.target.value)} className={classes.select}>
                {meta.map((el) => (
                  <MenuItem value={el}>{el.from + " → " + el.to + " (" + el.num + " слова)"}</MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
          <Grid item className={classes.dictionary}>
            <Table hasMore={hasMore} currentPage={currentPage} getUserWords={this.getUserWords} allIds={allIds} filter={filter}
                   records={records} loading={loading} recordsPerPage={RECORDS_PER_PAGE} onDelete={this.deleteWord} onFilterChange={this.onFilterChange}
                   onDeleteTranslation={this.removeTranslationFromWord} onSelect={this.onSelect} onSelectAll={this.onSelectAll}
                   selected={selected} onRowClick={this.onRowClick} selectAll={selectAll}/>
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
