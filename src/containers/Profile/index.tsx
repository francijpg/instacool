import React, { Component } from "react";
import ProfileImg from "../../components/ProfileImg";

const style = {
  container: {
    padding: "15px",
  },
};
export default class Profile extends Component {
  render() {
    return (
      <div style={style.container}>
        <ProfileImg />
      </div>
    );
  }
}
