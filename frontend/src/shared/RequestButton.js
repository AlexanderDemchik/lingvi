import React from "react";
import Button from "@material-ui/core/Button/Button";
import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const RequestButton = ({isRequest, onClick, style = {}, ...props}) => (
  <Button style={{...style, paddingRight: 30, paddingLeft: 30}} onClick = {!isRequest ? onClick : () => {}} {...props}>
    {props.children}
    {isRequest && <div style={{position: "absolute", right: 10, display: "flex", alignSelf: "center"}}>
      <ClipLoader color={"inherit"} size={12}/>
    </div>}
  </Button>
);

RequestButton.propTypes = {
  isRequest: PropTypes.bool,
  onClick: PropTypes.func
};


export default RequestButton;