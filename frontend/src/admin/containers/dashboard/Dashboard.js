import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import moment from "moment";
import {Typography, withStyles} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {mdiDatabase, mdiAccountMultiple} from "@mdi/js";
import {Icon} from "@mdi/react";

const data = [
  {
    date: moment().day(-5).format("DD.MM.YYYY"), users: 12,
  },
  {
    date: moment().day(-4).format("DD.MM.YYYY"), users: 34
  },
  {
    date: moment().day(-3).format("DD.MM.YYYY"), users: 1
  },
  {
    date: moment().day(-2).format("DD.MM.YYYY"), users: 4
  },
  {
    date: moment().day(-1).format("DD.MM.YYYY"), users: 5
  },
  {
    date: moment().day(0).format("DD.MM.YYYY"), users: 0
  },
];

const styles = (theme) => ({
  root: {
  },
  newUsers: {
    margin: 50,
    padding: 20
  },
  card: {
    padding: "5px 20px 5px 20px ",
    minHeight: 120
  },
  cardIcon: {
    boxShadow: theme.shadows[1],
    padding: 15,
    borderRadius: 4,
    marginTop: -20,
    backgroundColor: theme.palette.success.main,
    fill: "#fff"
  },
  usedStorageTitle: {
    color: theme.palette.grey[400],

  },
  cardInfo: {
    display: "flex",
    alignItems: "flex-end",
    flexGrow: 1,
    flexDirection: "column"
  },
  usedStorageInfo: {
    fontSize: 24,
    paddingTop: 10
  }
});

class Dashboard extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Paper className={classes.newUsers}>
          <Typography variant={"h6"}>Новые пользователи</Typography>
          <ResponsiveContainer height='100%' width='100%' minHeight={200} minWidth={200}>
          <LineChart
            data={data}
            margin={{
              top: 10, right: 0, left: 0, bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis width={40}/>
            <Tooltip />
            <Line type="monotone" dataKey="users" stroke="#2196f3" activeDot={{ r: 8 }} />
          </LineChart>
          </ResponsiveContainer>
        </Paper>
        <Grid container direction={"row"} spacing={32} style={{padding: 50, paddingTop: 0}}>
          <Grid item md={4} xs={6}>
            <Paper className={classes.card}>
              <Grid container direction={"row"} wrap={"nowrap"}>
                <div className={classes.cardIcon}>
                  <Icon path={mdiDatabase} size={2}/>
                </div>
                <div className={classes.cardInfo}>
                  <div className={classes.usedStorageTitle}>
                    Хранилище
                  </div>
                  <div className={classes.usedStorageInfo}>100/1000 Гб</div>
                </div>
              </Grid>
            </Paper>
          </Grid>
          <Grid item md={4} xs={6}>
            <Paper className={classes.card}>
              <Grid container direction={"row"} wrap={"nowrap"}>
                <div className={classes.cardIcon}>
                  <Icon path={mdiAccountMultiple} size={2}/>
                </div>
                <div className={classes.cardInfo}>
                  <div className={classes.usedStorageTitle}>
                    Пользователи
                  </div>
                  <div className={classes.usedStorageInfo}>+142</div>
                </div>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {};

export default withStyles(styles)(Dashboard);