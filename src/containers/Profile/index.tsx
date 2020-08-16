import React, { Component } from "react";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";

const style = {
  container: {
    padding: "15px",
    display: "flex",
    justifyContent: "space-between", //add 100% spaces beetween all element contend (profile and button), good for work with columns
  },
};
export default class Profile extends Component {
  render() {
    return (
      <div style={style.container}>
        <ProfileImg />
        <Button>Agregar</Button>
      </div>
    );
  }
}
