import React from 'react';
import AppBar from "../appbar/AppBar";

const WithAppBar = props => {
  return (
    <>
      <AppBar/>
      {props.children}
    </>
  );
};

export default WithAppBar;
