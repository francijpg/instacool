import React, { Component } from "react";
import ProfileImg from "../../components/ProfileImg";
import Button from "../../components/Button";
import Card from "../../components/Card";

const style = {
  container: {
    padding: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between", //add 100% spaces beetween all element contend (profile and button), good for work with columns
    marginBottom: "10px",
  },
};
export default class Profile extends Component {
  render() {
    return (
      <div style={style.container}>
        <div style={style.row}>
          <ProfileImg />
          <Button>Agregar</Button>
        </div>
        <div style={style.row}>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
        </div>
        <div style={style.row}>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
          <Card><img src="http://placekitten.com/100/100" alt=""/></Card>
        </div>
      </div>
    );
  }
}
