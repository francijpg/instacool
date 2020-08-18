import React, { Component } from "react";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Title from "../../components/Title";
import RegisterForm from "../../components/RegisterForm";

export default class Register extends Component {
  render() {
    return (
      <Container center={true}>
        <Card>
          <Title>Registro</Title>
          <RegisterForm />
        </Card>
      </Container>
    );
  }
}
