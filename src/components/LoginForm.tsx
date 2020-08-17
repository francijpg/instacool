import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, Field } from "redux-form";

import Input from "./Input";
import Button from "./Button";
import Center from "./Center";

class LoginForm extends Component<InjectedFormProps> {
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field label='Correo' placeholder='Correo' name='email' type='email' component={Input}  />
        <Field label='Contraseña' placeholder='Contraseña' name='password' type='password' component={Input}  />
        {/* <Input placeholder="correo" label="Correo" />
        <Input placeholder="contraseña" label="Contraseña" /> */}
        <Button block={true}>Enviar</Button>
        <Center>
          <Link to="/register">Ir al registro</Link>
        </Center>
      </form>
    );
  }
}

export default reduxForm<any, any>({
  form: 'login',
})(LoginForm)
