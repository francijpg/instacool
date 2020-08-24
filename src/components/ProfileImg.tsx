import React, { Component } from "react";
import { reduxForm, InjectedFormProps, Field, WrappedFieldProps } from "redux-form";

const style = {
  img: {
    borderRadius: "100%",
  },
};

const RenderField: React.StatelessComponent<WrappedFieldProps> = ({
  input,
}) => <input {...input} type="file" />;

class ProfileImg extends Component<InjectedFormProps> {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="file" component={RenderField}/>
        <img
          style={style.img}
          src="http://placekitten.com/100/100"
          alt="profile"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: "profileImg",
})(ProfileImg);
