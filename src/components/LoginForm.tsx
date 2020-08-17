import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps } from "redux-form";

import Input from "./Input";
import Button from "./Button";
import Center from "./Center";

class LoginForm extends Component<InjectedFormProps> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Input placeholder="correo" label="Correo" />
        <Input placeholder="contraseña" label="Contraseña" />
        <Button block={true}>Enviar</Button>
        <Center>
          <Link to="/register">Ir al registro</Link>
        </Center>
      </form>
    );
  }
}

export default reduxForm({
  form: "login",
})(LoginForm);
