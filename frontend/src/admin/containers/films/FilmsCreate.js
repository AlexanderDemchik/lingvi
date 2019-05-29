import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from "./FilmsCreate.style";
import BootstrapTextField from "../../../shared/BootstrapTextField";
import {Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import FileChooser from "../../../shared/fileChooser/FileChooser";
import RequestButton from "../../../shared/RequestButton";
import Button from "@material-ui/core/Button";
import history from "../../../history";
import api from "../../../api";
import TextArea from "../../../shared/TextArea";

class FilmsCreate extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      key: "",
      description: "",
      isSaveRequest: false
    };
    this.posterChooserRef = null;
    this.previewChooserRef = null;
  }

  onCreate = async () => {
    const {name, key, description} = this.state;
    this.setState({isSaveRequest: true});
    let previewPoster = null;
    let videoPoster = null;

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

    try {
      const created = (await api.post("/video/films", {name, key, description, previewPoster, video: {poster: videoPoster}})).data;
      history.push(`/admin/films/edit/${created.key}`);
      this.setState({isSaveRequest: false});
    } catch (e) {
      this.setState({isSaveRequest: false})
    }
  };

  render () {
    const {classes} = this.props;
    const {name, key, isSaveRequest, description} = this.state;
    return (
      <div className={classes.root} >
        <Grid container direction={"column"}>
          <Typography variant={"h5"} style={{marginBottom: 20}}>Добавление фильма</Typography>
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
          <Grid item style={{alignSelf: "flex-end"}}>
            <Button color={"secondary"} onClick={() => history.push("/admin/films")}>Отменить</Button>
            <RequestButton isRequest={isSaveRequest} color={"secondary"} variant={"contained"} onClick={this.onCreate}>Создать</RequestButton>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default withStyles(styles)(FilmsCreate);