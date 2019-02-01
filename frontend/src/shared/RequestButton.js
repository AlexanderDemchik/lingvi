import React from "react";
import Button from "@material-ui/core/Button/Button";
import { ClipLoader } from 'react-spinners';

const RequestButton = ({isRequest, onClick, ...props}) => (
  <Button onClick = {!isRequest ? onClick : () => {}} {...props}>
    {props.children}
    {isRequest && <div style={{position: "absolute", right: 15, display: "flex", alignSelf: "center"}}>
      <ClipLoader color={"inherit"} size={12}/>
    </div>}
  </Button>
);

export default RequestButton;