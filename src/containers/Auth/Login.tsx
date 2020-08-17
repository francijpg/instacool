import React, { Component } from "react";
import { connect } from "react-redux";
import Card from "../../components/Card";
import Container from "../../components/Container";
import Title from "../../components/Title";
import LoginForm from "../../components/LoginForm";

import { login as loginThunk } from "../../ducks/Users";

class Login extends Component {
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

const mapStateToProps = (state: any) => state

const mapDispatchToProps = (dispatch: any)  => ({
  login: (payload: any) => dispatch(loginThunk(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)