import React from "react";
import * as tus from "tus-js-client";
import Drawer from "@material-ui/core/es/Drawer/Drawer";
import List from "@material-ui/core/es/List/List";
import ListItem from "./components/ListItem";
import ListItemText from "@material-ui/core/es/ListItemText/ListItemText";
import ListItemIcon from "@material-ui/core/es/ListItemIcon/ListItemIcon";
import withStyles from "@material-ui/core/es/styles/withStyles";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import styles from "./styles";
import {mdiViewDashboard} from "@mdi/js";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = null;
  }

  componentDidMount() {
    // this.ref.addEventListener("change", (e) => {
    //   console.log("change")
    //   var file = e.target.files[0];
    //
    //   console.log(tus);
    //   // Create a new tus upload
    //   var upload = new tus.Upload(file, {
    //     endpoint: "http://localhost:8080/video/2/upload",
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
    // });
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <CssBaseline/>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar}>

          </div>
          <div>
            <ListItem text={'Видео'} icon={mdiViewDashboard} active={true}/>
          </div>
        </Drawer>
      </div>
    )
  }
}


export default withStyles(styles)(AdminPage);