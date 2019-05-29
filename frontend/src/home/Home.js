import React, {Component} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from "../videoplayer/VideoPlayer";
import {style} from "./Home.style";
import withStyles from "@material-ui/core/styles/withStyles";

class Home extends Component {
  render() {
    const {classes} = this.props;
    return (
      <div className={classes.container}>
        {/*<VideoPlayer url={"http://localhost/video/gameofthrones/season1/episode1/master.m3u8"}*/}
        {/*             spritesUrl={"http://localhost/video/gameofthrones/season1/episode1/sprites"}*/}
        {/*             posterUrl={"https://www.hbo.com/content/dam/hbodata/series/game-of-thrones/episodes/1/game-of-thrones-1-1920x1080.jpg/_jcr_content/renditions/cq5dam.web.1200.675.jpeg"}/>*/}

      </div>
    );
  }
}

Home.propTypes = {};

export default withStyles(style)(Home);
