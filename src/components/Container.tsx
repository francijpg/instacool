import React, { Component } from "react";

const style = {
  backgroundColor: "#eee",
  padding: "10px 15px",//margin top - margin left and  rigth
  height: "calc(100vh - 20px)",
  width: "calc(100vw - 30px)",
  //flexbox
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default class Container extends Component {
  render() {
    const { children } = this.props;
    return <div style={style}>{children}</div>;
  }
}
