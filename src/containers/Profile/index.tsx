import React, { Component } from "react";
import Profileimg from "../../components/Profileimg";

const style = {
  container: {
    padding: "15px",
  },
};
export default class Profile extends Component {
  render() {
    return (
      <div style={style.container}>
        <Profileimg />
      </div>
    );
  }
}
