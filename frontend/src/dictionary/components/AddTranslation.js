import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import {style} from "./AddTranslation.style";
import withStyles from "@material-ui/core/styles/withStyles";
import {Fade, Paper, ClickAwayListener} from "@material-ui/core";
import CombinedTextField from "./CombinedTextField";
import {mdiPlaylistPlus} from "@mdi/js/mdi";
import {Icon} from "@mdi/react";
import Popper from "../../shared/Popper";
import {DICTIONARY_PATH, TRANSLATION_PATH, USER_DICTIONARY_WORD_PATH} from "../../api";
import api from "../../api";
import {Scrollbars} from "react-custom-scrollbars";

class AddTranslation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      isTranslationRequest: false,
      translations: [],
      isAddToDictionaryRequest: false,
      isRemoveFromDictionaryRequest: false,
      textFieldValue: ""
    };
    this.anchor = null;
  }

  componentDidUpdate(prevProps, prevState) {
    const {word} = this.props;
    const {open} = this.state;
    if (open === true && open !== prevState.open && word.word !== "") {
      this.getTranslation(word.word.text, word.word.language, word.translationLanguage)
    }
  };

  onClick = (value) => {
    this.setState({open: value})
  };

  getTranslation = (word, from, to) => {
    this.setState({isTranslationRequest: true}, () => {
      api.get(`${DICTIONARY_PATH}${TRANSLATION_PATH}/v2?text=${word}&from=${from}&to=${to}`)
        .then((r) => {
          this.setState({isTranslationRequest: false, translations: r.data.translations});
        }).catch(() => {
        this.setState({isTranslationRequest: false});
      })
    });
  };

  addTranslation =  (wordId, translation, translationId = null) => {
     this.props.addTranslation(wordId, translation, translationId).then((r) => {
       this.setState({open: false});
     })
  };

  deleteTranslation = (wordId, trId) => {
    this.props.deleteTranslation(wordId, trId).then(() => {
      this.setState({open: false});
    });
  };

  onTranslationClick = (word, tr) => {
    !tr.inUserDict ? (
      this.addTranslation(word.id, tr.translation, tr.id)
    ) : (
      this.deleteTranslation(word.id, tr.id)
    );
  };

  render() {
    const {classes, hover, word} = this.props;
    const {open, translations, textFieldValue} = this.state;
    return (
      <div>
        {<span ref={ref => this.anchor = ref} className={`${classes.addTranslation} ${!hover && classes.hidden}`} onClick={() => this.onClick(true)}>Добавить перевод</span>}
        <Popper open={open} anchorEl={() => this.anchor} classes={{popper: classes.popper}} className={classes.popperBody} placement={"bottom"} flip={true}>
          <ClickAwayListener onClickAway={() => this.onClick(false)}>
            <div>
              <CombinedTextField value={textFieldValue} onChange={(e) => this.setState({textFieldValue: e.target.value})} icon={<Icon path={mdiPlaylistPlus} size={1}/>} onClick={() => this.addTranslation(word.id, textFieldValue)} placeholder={"Введите перевод"}/>
              <Scrollbars autoHide autoHeight autoHeightMin={0} autoHeightMax={100}>
                {translations.map(tr => (
                  <div className={`${classes.translation} ${tr.inUserDict && classes.inUserDict}`} onClick={() => this.onTranslationClick(word, tr)}>{tr.translation}</div>
                ))}
              </Scrollbars>
            </div>
          </ClickAwayListener>
        </Popper>
      </div>
    );
  }
}

AddTranslation.propTypes = {};

export default withStyles(style)(AddTranslation);
