/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faRetweet } from '@fortawesome/free-solid-svg-icons'

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px 15px",
};

interface IPostProps {
  image: string;
}

export default class Post extends Component<IPostProps> {
  render() {
    const { image } = this.props;
    return (
      <div style={style}>
        <img src={image} />
        <div
          style={{
            display: "flex",
            backgroundColor: "#eee",
            marginLeft: "-15px",
            marginBottom: "-10px",
            width: "calc(100% + 30px)",
          }}
        >
          <div style={{ flex: 1, textAlign: "center", padding:"10px 15px", cursor: "pointer" }}><FontAwesomeIcon icon={faThumbsUp}/> Like</div>
          <div style={{ flex: 1, textAlign: "center", padding:"10px 15px", cursor: "pointer" }}><FontAwesomeIcon icon={faRetweet}/> Compartir</div>
        </div>
      </div>
    );
  }
}
