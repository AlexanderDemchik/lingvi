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
import {mdiViewDashboard, mdiVideo, mdiFilmstrip, mdiAccountMultiple, mdiHome} from "@mdi/js";
import Films from "./containers/films/Films";
import Dropdown from "./components/Dropdown";
import {Link, Switch, Route} from "react-router-dom";
import Divider from "@material-ui/core/Divider";
import history from "../history";
import FilmsCreate from "./containers/films/FilmsCreate";
import FilmsEdit from "./containers/films/FilmsEdit";
import Users from "./containers/users/Users";
import Dashboard from "./containers/dashboard/Dashboard";

class AdminPage extends React.Component {
  constructor(props) {
    super(props);
    this.ref = null;
  }

  componentDidMount() {
    const {pathname} = this.props.location;
    if (pathname === "/admin" || pathname === "/admin/") history.push("/admin/dashboard");
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
  };

  render() {
    const {classes, location} = this.props;
    return (
      <div style={{minWidth: 900}}>
        <CssBaseline/>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {/*<input type={"file"} ref={ref => this.ref = ref}/>*/}
          {/*<div className={classes.toolbar}>*/}

          {/*</div>*/}
          <div style={{margin: 17}}>
            <ListItem text={"Домашняя"} icon={mdiHome} active={false} component={<Link to={"/"}/>}/>
            <ListItem text={"Dashboard"} icon={mdiViewDashboard} active={location.pathname.startsWith("/admin/dashboard")} component={<Link to={"/admin/dashboard"}/>}/>
            <Dropdown text={'Видео'} icon={mdiVideo} active={location.pathname.startsWith("/admin/films") || location.pathname.startsWith("/admin/shows")}>
              <ListItem text={'Фильмы'} icon={mdiFilmstrip} active={location.pathname.startsWith("/admin/films")} component={<Link to={"/admin/films"}/>}/>
              <ListItem text={'Сериалы'} icon={mdiFilmstrip} active={location.pathname.startsWith("/admin/shows")} component={<Link to={"/admin/shows"}/>}/>
            </Dropdown>
            <ListItem text={"Пользователи"} icon={mdiAccountMultiple} active={location.pathname.startsWith("/admin/users")} component={<Link to={"/admin/users"}/>}/>
          </div>
        </Drawer>
        <main className={classes.content}>
          <Switch>
            <Route exact={true} path={"/admin/films"} component={Films}/>
            <Route exact={true} path={"/admin/films/create"} component={FilmsCreate}/>
            <Route exact={true} path={"/admin/films/edit/:id"} component={FilmsEdit}/>
            <Route exact={true} path={"/admin/shows"}/>
            <Route exact={true} path={"/admin/dashboard"} component={Dashboard}/>
            <Route exact={true} path={"/admin/users"} component={Users}/>
          </Switch>
        </main>
      </div>
    )
  }
}


export default withStyles(styles)(AdminPage);