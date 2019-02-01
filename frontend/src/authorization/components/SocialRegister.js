import React from "react";
import qs from "query-string";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid/Grid";
import RingLoader from "react-spinners/RingLoader";
import {socialRegister} from "../actions";
import history from "../../history";
import {ROOT} from "../../constants";

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
        return (
            <Grid container style={{height:"100%", position: "absolute"}} alignItems={"center"} justify={"center"}>
                <Grid item>
                    <RingLoader size={100} color={"#2582e7"}/>
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

export default connect(null, mapDispatchToProps)(SocialRegister)