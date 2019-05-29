import React, {Fragment} from "react";
import styles from "./VideoHandler.style";
import {Grid, withStyles} from "@material-ui/core";
import Progress from "../../../shared/progress/Progress";
import Upload from "../../../utils/Upload";
import {SyncLoader} from "react-spinners";
import api from "../../../api";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import CommentIcon from "@material-ui/core/SvgIcon/SvgIcon";
import CheckboxList from "../CheckboxList";
import ButtonBase from "@material-ui/core/ButtonBase";

class VideoHandler extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upload: null,
      started: false,
      paused: false,
      loaded: false,
      error: false,
      filename: "",
      handler: null,
      selectedStreams: [],
      init: false
    };
    this.inputRef = null;
    this.updateInterval = null;
  }

  componentDidMount() {
    this.props.rootRef(this);
    this.init().then(() => {
      this.updateInterval = setInterval(() => {
        this.refreshHandler();
      }, 3000);
    });

  }

  componentWillUnmount() {
    clearInterval(this.updateInterval);
  }

  onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let files = [];
    if (e.dataTransfer) files = e.dataTransfer.files;
    this.onFiles(files);
  };

  onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  onFiles = (files) => {
    const {videoId} = this.props;
    if (files && files[0]) {
      let file = files[0];

      this.setState({filename: file.name});
      this.onCancel();

      let upload = new Upload(file, {
        endpoint: `http://localhost:8080/video/handler/upload/${videoId}`,
        retryDelays: [0, 3000, 10000],
        metadata: {
          filename: file.name,
        },
        onError: (error) => {
          this.setState({error: true});
          console.log("Failed because: " + error)
        },
        onProgress: (bytesUploaded, bytesTotal) => {
          const {upload} = this.state;
          upload._offset = bytesUploaded;
          this.setState({upload: upload});
        },
        onSuccess: async () => {
          this.setState({loaded: true})
        }
      });

      this.setState({upload: upload});
    }
  };

  onChange = (e) => {
    let files = e.target.files;
    this.onFiles(files);
  };

  onCancel = () => {
    const {upload} = this.state;
    if (upload) {
      upload.abort();
      this.deleteHandler();
      this.inputRef.value = "";
      this.setState({upload: null});
    }
  };

  startUpload = (e) => {
    const {upload} = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.setState({started: true, error: false});
    upload.start();
  };

  pauseUpload = (e) => {
    const {upload} = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.setState({paused: true});
    upload.abort();
  };

  cancelUpload = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({paused: false, started: false});
    this.onCancel();
  };

  resumeUpload = (e) => {
    const {upload} = this.state;
    e.preventDefault();
    e.stopPropagation();
    this.setState({paused: false});
    upload.start();
  };

  async init() {
    const {videoId} = this.props;
    try {
      let response = await api.get(`/video/handler/${videoId}`);
      this.setState({init: true, handler: response.data === "" ? null : response.data});
    } catch (e) {
      this.setState({init: true});
    }
  }

  async refreshHandler() {
    const {videoId} = this.props;
    try {
      let response = await api.get(`/video/handler/${videoId}`);
      this.setState({handler: response.data === "" ? null : response.data});
    } catch (e) {
    }
  }

  deleteHandler = async () => {
    const {videoId} = this.props;
    try {
      await api.delete(`/video/handler/${videoId}`);
      this.setState({handler: null});
    } catch (e) {
    }
  };

  updateHandler = (data) => {
    const {videoId} = this.props;
    return api.post(`/video/handler/${videoId}`, data);
  };

  selectStreams = async () => {
    const {selectedStreams, handler} = this.state;
    try {
      let streams = handler.selectStreamsStage.info.streams;
      await this.updateHandler({
        stage: "SELECT_STREAMS",
        selectStreamsStage: {
          selectedStreams: selectedStreams.map(order => {
            return streams.find((el) => el.order === order);
          })
        }
      })
    } catch (e) {
      console.log(e);
    }
  };

  renderHandlerStage = () => {
    const {classes} = this.props;
    const {handler, selectedStreams} = this.state;
    switch (handler.stage) {
      case "SELECT_STREAMS":
        let streams = null;
        if (handler.selectStreamsStage.info && handler.selectStreamsStage.info.streams) {
          streams = handler.selectStreamsStage.info.streams;
        }
        return (
          <div>
            {
              streams &&
                <Fragment>
                  <div className={classes.selectStreamTitle}>Select 1 video stream and 1 audio stream to continue handling</div>
                  <CheckboxList values={streams} idField={"order"} checked={selectedStreams}
                                           setChecked={(streams) => this.setState({selectedStreams: streams})}
                                           getText={(stream) => stream.originalString}
                  />
                  <ButtonBase className={classes.controlsItem} onClick={() => this.selectStreams()} style={{width: "100%"}}>Продолжить</ButtonBase>
                </Fragment>
            }
          </div>
        );

      case "CONVERT_TO_MP4": return <Fragment>
        {handler && handler.convertToMP4Stage && <Progress value={handler.convertToMP4Stage.progress}/>}
        <div className={classes.info}>Converting to mp4, please wait...</div>
      </Fragment>;
      case "CONVERT_TO_HLS": return <Fragment>
        {handler && handler.convertToHLSStage && <Progress value={handler.convertToHLSStage.progress}/>}
        <div className={classes.info}>Converting to hls, please wait...</div>
      </Fragment>;
      default:  return <div className={classes.loader}><SyncLoader color={"inherit"} size={12}/></div>
    }
  };

  render() {
    const {classes} = this.props;
    const {upload, paused, started, filename, error, loaded, init, handler} = this.state;
    return (
      <div className={classes.root}>
        {init ? (
          <Fragment>
          {!handler || (upload && !upload.isComplete()) ? (
              <Fragment>
                <div className={classes.dropZone} onDrop={this.onDrop} onDrag={this.onDrag} onDragOver={this.onDragOver} onClick={() => this.inputRef.click()}>
                  {
                    <Fragment>
                      {
                        upload ? (
                          <div className={classes.placeholderContainer}>
                            <div className={classes.placeholder}>{filename && filename}</div>
                            <Grid container direction={"row"} justify={"center"}>
                              {!started && !paused && !error && !loaded ? (
                                <ButtonBase className={classes.controlsItem} onClick={this.startUpload}>start</ButtonBase>
                              ) : (
                                <Fragment>
                                  <ButtonBase className={classes.controlsItem} style={{marginRight: 10}} onClick={this.cancelUpload}>cancel</ButtonBase>
                                  {!paused ? (
                                    <ButtonBase className={classes.controlsItem} onClick={this.pauseUpload}>pause</ButtonBase>
                                  ) : (
                                    <ButtonBase className={classes.controlsItem} onClick={this.resumeUpload}>resume</ButtonBase>
                                  )}
                                </Fragment>
                              )}
                            </Grid>
                          </div>
                        ) : (
                          <div className={classes.placeholderContainer}>
                            <div className={classes.placeholder}>Choose a file or drag it here.</div>
                          </div>
                        )
                      }
                    </Fragment>
                  }

                  <input type={"file"} style={{visibility: "hidden", display: "none"}} ref={ref => this.inputRef = ref} onChange={this.onChange} />
                </div>
                <div className={classes.progressWrapper}>
                  {upload && started && <Progress value={(upload._offset / upload._size) * 100}/>}
                </div>
              </Fragment>
          ) : (
            <Fragment>
              {this.renderHandlerStage()}
            </Fragment>
          )}
          </Fragment>
        ) : (
          <div className={classes.loader}><SyncLoader color={"inherit"} size={12}/></div>
        )}
      </div>
    )
  }
}

VideoHandler.defaultProps = {
  rootRef: () => {}
};

export default withStyles(styles)(VideoHandler);
{/*<div className={classes.placeholderContainer}>*/}
{/*  <div className={classes.placeholder}>Video handling already proceed</div>*/}
{/*  <span className={classes.controlsItem} onClick={this.deleteHandler}>Delete handler</span>*/}
{/*</div>*/}