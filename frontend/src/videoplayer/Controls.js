import React from "react";
import Progress from "./Progress";
import {convertSeconds} from "./utils";
import {Grid, withStyles} from "@material-ui/core";
import {style} from "./Controls.style";
import {mdiPlay, mdiVolumeHigh, mdiPause, mdiVolumeMedium, mdiVolumeOff, mdiFullscreen, mdiFullscreenExit, mdiSettings, mdiSubtitles} from "@mdi/js";
import {Icon} from "@mdi/react";
import VolumeSlider from "./VolumeSlider";
import Settings from "./Settings";
import SubtitlesMenu from "./SubtitlesMenu";
import PropTypes from "prop-types";

class Controls extends React.Component {

  render() {
    const {played, changePlayed, buffered, duration, classes, volume, changeVolume, playing, changePlaying, fullScreen,
          enterFullScreen, exitFullScreen, className, spritesUrl, selectedSubtitles, changeSubtitles, availableQualities,
          changeQuality, currentQuality, qualityAutoSwitch, settingsOpen, subtitlesOpen, changeSettingsOpenState, changeSubtitlesOpenState} = this.props;

    return (
      <div className={classes.controlsWrapper}>
        <Grid container direction={"column"} className={`${classes.controls} ${className}`}>
          <Grid item>
            <Progress value={played / duration} changeValue={changePlayed} buffered={buffered} convertTooltipValue={(v) => convertSeconds(duration * v)} spritesUrl={spritesUrl} duration={duration}/>
          </Grid>
          <Grid item>
            <Grid container alignItems={"center"} justify={"space-between"} direction={"row"} wrap={"nowrap"}>
              <Grid item>
                <Grid container direction={"row"} alignItems={"center"} justify={"flex-start"} spacing={8}>
                  <Grid item>
                    {<Icon path={!playing ? mdiPlay : mdiPause} className={classes.icon} onClick={() => changePlaying(!playing)} onTouchEnd={() => changePlaying(!playing)}/>}
                  </Grid>
                  <Grid item>
                    <Icon path={volume > 0.5 ? mdiVolumeHigh : volume > 0 ? mdiVolumeMedium : mdiVolumeOff} className={classes.icon}/>
                  </Grid>
                  <Grid item className={classes.volumeSlider}>
                    <VolumeSlider value={volume * 100} changeValue={(val) => changeVolume(val/100)}/>
                  </Grid>
                  <Grid item className={classes.time}>
                    {`${convertSeconds(played)}/${convertSeconds(duration)}`}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid item container direction={"row"} justify={"flex-end"} alignItems={"center"} spacing={8}>
                  <Grid item className={classes.controlsMenuWrapper}>
                    <SubtitlesMenu open={subtitlesOpen} changeOpenState={changeSubtitlesOpenState} availableSubtitles={["RU", "EN"]} selectedSubtitles={selectedSubtitles} changeSubtitles={changeSubtitles}>
                      <Icon path={mdiSubtitles} className={`${classes.icon} ${subtitlesOpen && classes.subtitlesOpen}`} onClick={() => changeSubtitlesOpenState(!subtitlesOpen)}/>
                    </SubtitlesMenu>
                  </Grid>
                  <Grid item>
                    <Settings open={settingsOpen} changeOpenState={changeSettingsOpenState} availableQualities={availableQualities} currentQuality={currentQuality} changeQuality={changeQuality} qualityAutoSwitch={qualityAutoSwitch}/>
                  </Grid>
                  <Grid item>
                    {
                      fullScreen ? (
                        <Icon path={mdiFullscreenExit} className={classes.icon} onClick={exitFullScreen} onTouchEnd={exitFullScreen}/>
                      ) : (
                        <Icon path={mdiFullscreen} className={classes.icon} onClick={enterFullScreen} onTouchEnd={enterFullScreen}/>
                      )
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Controls.propTypes = {
  availableQualities: PropTypes.array
};

export default withStyles(style)(Controls);
