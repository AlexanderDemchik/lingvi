import React, {Fragment} from "react";
import {Typography, withStyles} from "@material-ui/core";
import styles from "./FilmsEdit.style";
import Grid from "@material-ui/core/Grid";
import BootstrapTextField from "../../../shared/BootstrapTextField";
import TextArea from "../../../shared/TextArea";
import FileChooser from "../../../shared/fileChooser/FileChooser";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import RequestButton from "../../../shared/RequestButton";
import api from "../../../api";
import FakeUpload from "../../../utils/FakeUpload";
import VideoHandler from "../../components/films/VideoHandler";
import VideoPlayer from "../../../videoplayer/VideoPlayer";
import Chip from "@material-ui/core/Chip";
import Select from "../../../shared/Select";
import MenuItem from "@material-ui/core/MenuItem";

class FilmsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: {},
      name: "",
      key: "",
      description: "",
      video: {},
      isUpdateRequest: false,
      subtitlesSelect: ""
    };
    this.posterChooserRef = null;
    this.previewChooserRef = null;
    this.subtitlesFileChooserRef = null;
  }

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (!id) history.push("/admin");

    let film;

    try {
      film = (await api.get(`/video/films/${id}`)).data;
      this.setFilm(film);
    } catch (e) {
      console.log(e);
      history.push("/admin");
    }
  }

  setFilm(film) {
    this.setState({film, name: film.name, key: film.key, description: film.description, video: film.video});
    if (film.previewPoster) this.posterChooserRef.setState({uploads: [new FakeUpload(film.previewPoster)]});
    if (film.video.poster) this.previewChooserRef.setState({uploads: [new FakeUpload(film.video.poster)]});
  }

  updateFilm = async () => {
    const {name, film, key, description} = this.state;
    this.setState({isUpdateRequest: true});
    try {
      let previewPoster;
      let videoPoster;

      if (this.posterChooserRef.state.uploads.length !== 0) {
        let upload = this.posterChooserRef.state.uploads[0];
        if (upload.isComplete()) {
          previewPoster = upload.result;
        } else {
          setTimeout(() => this.onCreate(), 500);
          return;
        }
      }

      if (this.previewChooserRef.state.uploads.length !== 0) {
        let upload = this.previewChooserRef.state.uploads[0];
        if (upload.isComplete()) {
          videoPoster = upload.result;
        } else {
          setTimeout(() => this.onCreate(), 500);
          return;
        }
      }

      let f = {...film, name, key, description, previewPoster, video: {...film.video, poster: videoPoster}};

      let response = await api.put('/video/films', f);
      this.setFilm(response.data);
      this.setState({isUpdateRequest: false});
    } catch (e) {
      this.setState({isUpdateRequest: false});
    }
  };

  render() {
    const {name, key, isSaveRequest, description, video, film, subtitlesSelect} = this.state;
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <Grid container direction={"column"} wrap={"nowrap"}>
          <Typography variant={"h5"} style={{marginBottom: 20}}>Редактирование фильма</Typography>
          <Grid item>
            <label>
              Название фильма:
              <BootstrapTextField placeholder={"name"} value={name} onChange={(e) => this.setState({name: e.target.value})} required/>
            </label>
          </Grid>
          <Grid item>
            <label>
              Идентификатор:
              <BootstrapTextField placeholder={"key"} value={key} onChange={(e) => this.setState({key: e.target.value})} required/>
            </label>
          </Grid>
          <Grid item>
            <label>
              Описание:
              <TextArea placeholder={"Описание"} value={description} onChange={(e) => this.setState({description: e.target.value})} style={{resize: "vertical"}}/>
            </label>
          </Grid>
          <Grid item>
            Постер:
            <FileChooser rootRef={ref => this.posterChooserRef = ref}/>
          </Grid>
          <Grid item>
            Видео постер:
            <FileChooser rootRef={ref => this.previewChooserRef = ref}/>
          </Grid>
          <Grid item>
              Видео:
            {video &&
              <Fragment>
                {
                  video.ready ? (
                    <VideoPlayer availableQualities={video.qualities} url={film.video.path}
                                 posterUrl={film.videoPoster && film.videoPoster.path}
                                 spritesUrl={film.video.path.replace("master.m3u8", "sprites")}
                    />
                  ) : (
                    <>
                    {video.id && <VideoHandler videoId={video.id}/>}
                    </>
                  )
                }
                <label>
                  Корневой путь
                  <BootstrapTextField placeholder={"root"} value={video.rootUrl} onChange={(e) => this.setState({video: {...video, rootUrl: e.target.value}})} />
                </label>
                <label>
                  Относительный путь
                  <BootstrapTextField placeholder={"relative"} value={video.relativePath} onChange={(e) => this.setState({video: {...video, relativePath: e.target.value}})} />
                </label>
                Субтитры:
                <div className={classes.subtitles}>
                  <div className={classes.subtitlesValues}>
                    {video.subtitles && video.subtitles.map(el => (
                      <Chip
                        key={el}
                        label={el}
                        onDelete={() => {}}
                      />
                    ))}
                  </div>
                <Grid container direction={"row"} wrap={"nowrap"}>
                  <Select value={subtitlesSelect} onChange={(e) => this.setState({subtitlesSelect: e.target.value})}>
                    {["RU", "EN", "UA"].map(el => (
                      <MenuItem value={el}>{el}</MenuItem>
                    ))}
                  </Select>
                  <div>
                    <FileChooser rootRef={(ref) => this.subtitlesFileChooserRef = ref} type={"file"} classes={{root: classes.subFileChooser}} />
                  </div>
                  <Button>Добавить</Button>
                </Grid>
                </div>
              </Fragment>
            }
          </Grid>

          <Grid item style={{alignSelf: "flex-end"}}>
            <Button color={"secondary"} onClick={() => history.push("/admin/films")}>Отменить</Button>
            <RequestButton isRequest={isSaveRequest} color={"secondary"} variant={"contained"} onClick={this.updateFilm}>Сохранить</RequestButton>
          </Grid>
        </Grid>
      </div>
    )
  }

}

export default withStyles(styles)(FilmsEdit)