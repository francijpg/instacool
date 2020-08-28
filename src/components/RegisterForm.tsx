import React, { Component } from "react";
import { Link } from "react-router-dom";
import { reduxForm, InjectedFormProps, Field } from "redux-form";

import Input from "./Input";
import Button from "./Button";
import Center from "./Center";
import { ILogin } from "../ducks/Users";

class RegisterForm extends Component<InjectedFormProps<ILogin>> {
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={handleSubmit}>
        <Field label='Correo' placeholder='Correo' name='email' type='email' component={Input}  />
        <Field label='Contraseña' placeholder='Contraseña' name='password' type='password' autoComplete="on" component={Input}  />
        <Button block={true}>Enviar</Button>
        <Center>
          <Link to="/">Iniciar sesión</Link>
        </Center>
      </form>
    );
  }
}

export default reduxForm<ILogin>({
  form: 'register',
})(RegisterForm)
