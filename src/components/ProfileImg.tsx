import React, { Component } from "react";
import {
  reduxForm,
  InjectedFormProps,
  Field,
  WrappedFieldProps,
} from "redux-form";

const style = {
  img: {
    borderRadius: "100%",
  },
  file: {
    display: "none",
  },
};

const RenderField: React.StatelessComponent<WrappedFieldProps> = ({
  input,
}) => (
  <div>
    <input {...input} style={style.file} type="file" id="profileImage"/>
    <label htmlFor="profileImage">
      <img
        style={style.img}
        src="http://placekitten.com/100/100"
        alt="profile"
      />
    </label>
  </div>
);

class ProfileImg extends Component<InjectedFormProps> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="file" component={RenderField} />
      </form>
    );
  }
}

export default reduxForm({
  form: "profileImg",
})(ProfileImg);
