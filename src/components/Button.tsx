import React, { Component } from "react";

const style = {
  backgroundColor: "#00D1B2",
  border: "0px",
  borderRadius: "4px",
  padding: "10px 15px",
  color: "#fff",
};

export default class Button extends Component {
  render() {
    return (
      <button {...this.props} style={style}/>
    )
  }
}
