/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import Footer from "./Footer";

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px 15px",
  marginBottom: "10px",
};

interface IPostProps {
  image: string;
  like: () => void;
  share: () => void;
}

export default class Post extends Component<IPostProps> {
  render() {
    const { image, like, share } = this.props;
    return (
      <div style={style}>
        <img style={{ width: "300px" }} src={image} />
        <Footer like={like} share={share}/>
      </div>
    );
  }
}
