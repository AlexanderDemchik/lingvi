import React, {Fragment} from "react";
import {withStyles} from "@material-ui/core";
import styles from "./styles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid/index";
import File from "./File";
import Upload from "../../utils/Upload";
import Image from "./Image";

class FileChooser extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      uploads: []
    };
    this.inputRef = null;
  }

  componentDidMount() {
    this.props.rootRef(this);
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
    const {multiple} = this.props;
    if (files && files[0]) {
      if (multiple) {
        //
      } else {
        let file = files[0];

        this.onClearAll();

        let upload = new Upload(file, {
          endpoint: "http://localhost:8080/uploader",
          retryDelays: [0, 3000, 10000],
          metadata: {
            filename: file.name,
          },
          onError: function(error) {
            console.log("Failed because: " + error)
          },
          onProgress: (bytesUploaded, bytesTotal) => {
            const {uploads} = this.state;
            let u = uploads.find((el) => el.id === upload.id);
            u._offset = bytesUploaded;
            this.setState({uploads: uploads});
          },
          onSuccess: async () => {
            const {uploads} = this.state;
            let u = uploads.find((el) => el.id === upload.id);
            try {
              u.result = await u.get();
              this.setState({uploads: uploads});
            } catch (e) {
              console.log(e)
            }

          }
        });

        this.setState({uploads: [upload]});
        upload.start();
      }
    }
  };

  onChange = (e) => {
    let files = e.target.files;
    this.onFiles(files);
  };

  onCancel = (uploadId) => {
    const {uploads} = this.state;
    let u = uploads.find((el) => el.id === uploadId);

    u.cancel();
    this.inputRef.value = "";
    this.setState({uploads: uploads.filter((el) => el.id !== uploadId)});
  };

  onClearAll = () => {
    const {uploads} = this.state;
    this.inputRef.value = "";
    for (let i = 0; i < uploads.length; i++) uploads[i].cancel();
    this.setState({uploads: []});
  };

  renderPreview(props) {
    const {type} = this.props;
    switch (type) {
      case "image": return <Image {...props}/>;
      case "file": return <File {...props}/>;
      default: return <File {...props}/>
    }
  }

  render() {
    const {classes} = this.props;
    const {uploads} = this.state;
    return (
      <div className={classes.root} onDrop={this.onDrop} onDrag={this.onDrag} onDragOver={this.onDragOver} onClick={() => this.inputRef.click()}>
        {
          uploads.length > 0 ? (
          <Grid container direction={"row"}>
            {
              uploads.map((upload) => (
                this.renderPreview({upload: upload, cancel: this.onCancel})
              ))
            }
          </Grid>
          ) : (
            <div className={classes.placeholderContainer}>
              <span className={classes.placeholder}>Choose a file or drag it here.</span>
            </div>
          )
        }

        <input type={"file"} style={{visibility: "hidden", display: "none"}} ref={ref => this.inputRef = ref} onChange={this.onChange} accept={"image/*"}/>
      </div>
    )
  }
}

FileChooser.defaultProps = {
  type: "image"
};

FileChooser.propTypes = {
  onFileSelect: PropTypes.func,
  selected: PropTypes.array,
  type: PropTypes.oneOf(["image", "video", "file"])
};

export default withStyles(styles)(FileChooser)

// this.ref.addEventListener("change", (e) => {
//   var file = e.target.files[0];
//
//   console.log(tus);
//   // Create a new tus upload
//   var upload = new tus.Upload(file, {
//     endpoint: "http://localhost:8080/uploader",
//     retryDelays: [0, 3000, 5000, 10000, 20000],
//     metadata: {
//       filename: file.name,
//       filetype: file.type
//     },
//     onError: function(error) {
//       console.log("Failed because: " + error)
//     },
//     onProgress: function(bytesUploaded, bytesTotal) {
//       var percentage = (bytesUploaded / bytesTotal * 100).toFixed(2)
//       console.log(bytesUploaded, bytesTotal, percentage + "%")
//     },
//     onSuccess: function() {
//       console.log("Download %s from %s", upload.file.name, upload.url)
//     }
//   });
//
//   upload.start();
//   setTimeout(() => upload.abort(), 2000);
//   setTimeout(() => upload.start(), 20000);
//
// });