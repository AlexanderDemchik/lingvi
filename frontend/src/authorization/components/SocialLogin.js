import React from "react";
import qs from "query-string";
import {connect} from "react-redux";
import Grid from "../../../node_modules/@material-ui/core/Grid/Grid";
import SyncLoader from "react-spinners/BeatLoader";
import history from "../../history";
import {socialLogin} from "../actions";
import {ROOT} from "../../constants";
import {withTheme} from "@material-ui/core";

class SocialLogin extends React.Component {

  componentDidMount() {
    let params = qs.parse(this.props.location.search, {ignoreQueryPrefix: true});
    let provider = this.props.match.params.provider;

    if(params.code != null) {
      this.props.socialLogin(provider, params.code, ROOT + this.props.location.pathname);
    } else {
      history.push("/");
    }
  }

  render() {
    const {theme} = this.props;
    return (
      <Grid container style={{height:"100%", position: "absolute"}} alignItems={"center"} justify={"center"} direction={"column"} spacing={16}>
        <Grid item>
          <SyncLoader size={15} color={theme.palette.secondary.main}/>
        </Grid>
        <Grid item>
          Login is proceed...
        </Grid>
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    socialLogin: (provider, code, redirect_uri) => dispatch(socialLogin(provider, code, redirect_uri))
  }
}

export default connect(null, mapDispatchToProps)(withTheme()(SocialLogin))