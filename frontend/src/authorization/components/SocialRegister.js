import React from "react";
import qs from "query-string";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid/Grid";
import {socialRegister} from "../actions";
import history from "../../history";
import {ROOT} from "../../constants";
import {SyncLoader} from "react-spinners";
import withTheme from "@material-ui/core/styles/withTheme";

class SocialRegister extends React.Component {

  componentDidMount() {
    let params = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    let provider = this.props.match.params.provider;
    if(params.code != null) {
      this.props.socialRegister(provider, params.code, ROOT + this.props.location.pathname);
    } else {
      history.push("/");
    }
  }

  render() {
    const {theme} = this.props;
    return (
      <Grid container style={{height:"100%", position: "absolute"}} alignItems={"center"} justify={"center"}>
        <Grid item>
          <SyncLoader size={15} color={theme.palette.secondary.main}/>
        </Grid>
        <Grid item>
          Register is proceed...
        </Grid>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    socialRegister: (provider, code, redirect_uri) => dispatch(socialRegister(provider, code, redirect_uri))
  }
}

export default connect(null, mapDispatchToProps)(withTheme()(SocialRegister))