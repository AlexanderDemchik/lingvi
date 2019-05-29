import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles/index';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar/index';
import Tabs from '@material-ui/core/Tabs/index';
import Tab from '@material-ui/core/Tab/index';
import Typography from '@material-ui/core/Typography/index';
import styles from "./Films.style";
import EnhancedTable from "../../../shared/EnchancedTable";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import SwipeableRoutes from "react-swipeable-routes";
import moment from "moment/moment";
import history from "../../../history";
import api from "../../../api";
import Icon from "@mdi/react";
import {mdiPencil} from "@mdi/js";

class Films extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      films: [],
      selectedFilms: []
    }
  }

  async componentDidMount() {
    let response;
    try {
      response = await api.get("/video/films");
      this.setState({films: response.data});
    } catch (e) {

    }
  }

  deleteFilms = async (ids) => {
    const {films} = this.state;
    try {
      await api.delete("/video/films", {data: {ids}});
      this.setState({films: films.filter((el) => !ids.includes(el.id)), selectedFilms: []});
    } catch (e) {

    }
  };

  timeFormatter = (ms) => (
    moment(ms).format("DD/MM/YYYY HH:mm")
  );

  editFormatter = (row) => {
    const {classes} = this.props;
    return (
      <Icon path={mdiPencil} size={1} className={classes.editIcon} onClick={e => {e.preventDefault(); e.stopPropagation(); history.push(`/admin/films/edit/${row.key}`)}}/>
    )
  };

  render() {
    const { classes } = this.props;
    const { films, selectedFilms } = this.state;

    return (
      <div className={classes.root}>
        <EnhancedTable columns={[{name: "name", label: "Название"}, {name: "key", label: "Идентификатор"}, {name: "views", label: "Количество просмотров"}, {label: "", format: this.editFormatter}]}
                       idField={"id"} data={films} title={"Films"} onCreate={() => history.push("/admin/films/create")} onDelete={this.deleteFilms}
                       selected={selectedFilms} setSelected={(selected) => this.setState({selectedFilms: selected})}/>
      </div>
    );
  }
}

export default withStyles(styles)(Films);