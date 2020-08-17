import React, { Component } from "react";

import Card from "../../components/Card";
import Container from "../../components/Container";
import Title from "../../components/Title";
import LoginForm from "../../components/LoginForm";

export default class Login extends Component {
  render() {
    return (
      <Container center={true}>
        <Card>
          <Title>Iniciar sesión</Title>
          <LoginForm />
        </Card>
      </Container>
    );
  }
}
