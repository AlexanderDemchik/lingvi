import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import CssBaseline from "@material-ui/core/CssBaseline";
import {withStyles} from "@material-ui/core";
import {getFilms, selectFilm} from "./actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import {containerStyle} from "../shared/styles/containerStyle";
import history from "../history";
import BootstrapTextField from "../shared/BootstrapTextField";

const styles = (theme) => ({
  videoPoster: {
  },
  root: {
    ...containerStyle,
    marginTop: 50
  },
  card: {
    cursor: "pointer",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "calc(25% - 16px)",
    margin: 8,
    "@media (min-width: 1000px)": {
      width: "calc(20% - 16px)",
    },
    "@media (max-width: 600px)": {
      width: "calc(50% - 16px)",
    },

  },
  image: {
    width: "100%",
    height: "100%",
    transition: "all .2s linear",
    transform: "scale(1)",
    display: "flex",
    flexGrow: 1,
    "&:hover": {
      transform: "scale(1.1)",
    }
  },
  name: {
    fontSize: '0.8em',
    color: theme.palette.grey[700],
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  imageWrapper: {
    overflow: "hidden",
    flexGrow: 1
  }
});

class Videos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    }
  }

  componentDidMount() {
    this.props.getFilms();
  }

  render() {
    const {films, classes, selectFilm} = this.props;
    const {searchValue} = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Grid container justify={"flex-end"}>
          <BootstrapTextField value={searchValue} onChange={(e) => this.setState({searchValue: e.target.value}) } placeholder={"Search..."} style={{marginBottom: 20}}/>
        </Grid>
        <Grid container spacing={16} justify={""}>
        {films.filter((e) => e.name.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1).map((el) => (
          <Fragment>
            <div className={classes.card} onClick={() => {
              selectFilm(el);
              history.push(`/video/films/${el.key}`)
            }}>
              <div className={classes.imageWrapper}>
                <img src={el.previewPoster && el.previewPoster.path} className={classes.image}/>
              </div>
              <div className={classes.name}>{el.name}</div>
            </div>
          </Fragment>
        ))}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  films: state.video.films
});

const mapDispatchToProps = {
  getFilms,
  selectFilm
};

Videos.propTypes = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Videos));