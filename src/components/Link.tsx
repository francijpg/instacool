/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Component } from "react";

const style = {
  color: "blue",
  fontSize: "14px",
  padding: "15px",
};

export default class Link extends Component {
  render() {
    return (<a {...this.props} style={style} />);
  }
}
