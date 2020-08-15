import React, { Component, CSSProperties } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faRetweet } from "@fortawesome/free-solid-svg-icons";

const style = {
  footer: {
    display: "flex",
    backgroundColor: "#eee",
    marginLeft: "-15px",
    marginBottom: "-10px",
    width: "calc(100% + 30px)",
  },
  button: {
    flex: 1,
    textAlign: "center",
    padding: "10px 15px",
    cursor: "pointer",
  } as CSSProperties,
};

export default class Footer extends Component {
  render() {
    return (
      <div style={style.footer}>
        <div style={style.button}>
          <FontAwesomeIcon icon={faThumbsUp} /> Like
        </div>
        <div style={style.button}>
          <FontAwesomeIcon icon={faRetweet} /> Compartir
        </div>
      </div>
    );
  }
}
