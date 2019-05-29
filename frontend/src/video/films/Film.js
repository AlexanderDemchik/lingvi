import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../../videoplayer/VideoPlayer";
import CssBaseline from "@material-ui/core/CssBaseline";
import {connect} from "react-redux";
import {Typography} from "@material-ui/core";

const styles = () => {

};

class Film extends Component {


  render() {
    const {film} = this.props;
    return (
      <div>
        <CssBaseline />
        <div style={{margin: '50px 200px'}}>
          <div>
          <VideoPlayer availableQualities={film.video.qualities} url={film.video.path}
                       posterUrl={film.video.poster && film.video.poster.path}
                       spritesUrl={film.video.path.replace("master.m3u8", "sprites")}
          />
          </div>
          <Typography variant={"h6"}>{film.name}</Typography>
          <Typography variant={"body2"}>{film.description}</Typography>
        </div>
      </div>
    );
  }
}

Film.propTypes = {};

const mapStateToProps = (state) => ({
  film: state.video.selectedFilm
});

export default connect(mapStateToProps, null)(Film);