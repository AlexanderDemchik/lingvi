import React, {Component, Fragment} from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import {mdiArrowLeftBoldCircle, mdiArrowRightBoldCircle} from "@mdi/js";
import {Icon} from "@mdi/react";
import {style} from "./CardCarousel.style";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "./Card";

class CardCarousel extends Component {

  constructor(props) {
    super(props);
    this.card1 = null;
    this.card2 = null;
    this.card3 = null;
    this.cards = [];
    this.state = {
      card1Data: null,
      card2Data: null,
      card3Data: null
    }
  }

  componentDidMount() {
    this.props.open && document.getElementsByTagName("body")[0].classList.add(this.props.classes.bodyOverflowHidden);
    this.setState({card1Data: this.props.values[1], card2Data: this.props.values[0], card3Data: this.props.values[2]});
    this.cards.push(this.card1);
    this.cards.push(this.card2);
    this.cards.push(this.card3);
  }

  componentDidUpdate(prevProps) {
    if (this.props.open && !prevProps.open) document.getElementsByTagName("body")[0].classList.add(this.props.classes.bodyOverflowHidden);
    if (!this.props.open && prevProps.open) document.getElementsByTagName("body")[0].classList.remove(this.props.classes.bodyOverflowHidden);

    if (this.props.values.length !== prevProps.values.length) {
      this.setValueForCard(this.cards[1], this.props.values[this.props.index]);
    }

    if (this.props.index !== prevProps.index && this.props.index !== -1) {
      this.setValueForCard(this.cards[1], this.props.values[this.props.index]);
    }
  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].classList.remove(this.props.classes.bodyOverflowHidden);
  }

  handleArrowRightClick = () => {

    const {classes, changeIndex, index} = this.props;
    let currentIndex = index + 1;

    changeIndex(currentIndex);

    this.setValueForCard(this.cards[2], this.props.values[currentIndex]);

    this.cards[2].classList.remove(classes.positionRight);
    this.cards[1].classList.add(classes.positionLeft);
    this.cards[0].classList.add(classes.positionRight);
    this.cards[0].classList.remove(classes.positionLeft);

    this.swap(0, 1, this.cards);
    this.swap(1, 2, this.cards);
  };

  handleArrowLeftClick = () => {

    const {classes, index, changeIndex} = this.props;
    let currentIndex = index - 1;

    changeIndex(currentIndex);

    this.setValueForCard(this.cards[0], this.props.values[currentIndex]);

    this.cards[0].classList.remove(classes.positionLeft);
    this.cards[1].classList.add(classes.positionRight);
    this.cards[2].classList.add(classes.positionLeft);
    this.cards[2].classList.remove(classes.positionRight);

    this.swap(0, 1, this.cards);
    this.swap(0, 2, this.cards);
  };

  swap = (i1, i2, array) => {
    let temp = array[i1];
    array[i1] = array[i2];
    array[i2] = temp;
    return array;
  };

  setValueForCard(cardRef, value) {
    if (this.card1 === cardRef) {
      this.setState({card1Data: value, card2Data: null, card3Data: null})
    } else if (this.card2 === cardRef) {
      this.setState({card2Data: value, card1Data: null, card3Data: null})
    } else if (this.card3 === cardRef) {
      this.setState({card3Data: value, card1Data: null, card2Data: null})
    }
  }

  render() {
    const {classes, open, onClose, index, deleteTranslation, deleteCard, onChangeUserWordImage, addTranslation} = this.props;
    const {card1Data, card2Data, card3Data} = this.state;
    return (
      <Fragment>
      {ReactDOM.createPortal(
        <div className={`${classes.wrapper} ${!open && classes.containerHidden}`}>
          <div className={`${classes.modalCover} ${!open && classes.coverHidden}`} />
          <div className={classes.modalContainer} onClick={onClose}>
              <div className={`${classes.modal} ${!open && classes.modalHidden}`} onClick={(e) => e.stopPropagation()}>
                <div className={`${classes.arrowLeft} ${index === 0 && classes.disabledArrow}`} onClick={() => {(index !== 0) && this.handleArrowLeftClick()}}><Icon path={mdiArrowLeftBoldCircle} size={3}/></div>
                <div className={`${classes.arrowRight} ${(index >= (this.props.values.length - 1)) && classes.disabledArrow}`} onClick={() => {(index < (this.props.values.length - 1)) && this.handleArrowRightClick()}}><Icon path={mdiArrowRightBoldCircle} size={3}/></div>

                <div className={`${classes.card} ${classes.positionLeft}`} ref={ref => this.card1 = ref}>
                  {card1Data && <Card word={card1Data} deleteTranslation={deleteTranslation} deleteCard={deleteCard} onChangeUserWordImage={onChangeUserWordImage} addTranslation={addTranslation}/>}
                </div>
                <div className={`${classes.card}`} ref={ref => this.card2 = ref}>
                  {card2Data && <Card word={card2Data} deleteTranslation={deleteTranslation} deleteCard={deleteCard} onChangeUserWordImage={onChangeUserWordImage} addTranslation={addTranslation}/>}
                </div>
                <div className={`${classes.card} ${classes.positionRight}`} ref={ref => this.card3 = ref}>
                  {card3Data && <Card word={card3Data} deleteTranslation={deleteTranslation} deleteCard={deleteCard} onChangeUserWordImage={onChangeUserWordImage} addTranslation={addTranslation}/>}
                </div>
              </div>
          </div>
        </div>, document.getElementsByTagName("body")[0]
      )}
      </Fragment>
    );
  }
}

CardCarousel.propTypes = {
  changeIndex: PropTypes.func,
  index: PropTypes.number,
  open: PropTypes.bool,
  values: PropTypes.array,
  onClose: PropTypes.func,
  classes: PropTypes.object,
  deleteTranslation: PropTypes.func,
  deleteCard: PropTypes.func,
};

export default withStyles(style)(CardCarousel);
