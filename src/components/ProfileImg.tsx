import React, { Component } from "react";
import {
  reduxForm,
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  WrappedFieldInputProps,
} from "redux-form";

interface IProfileImg{
  submitProfileImg: () => void
}

const style = {
  img: {
    borderRadius: "100%",
  },
  file: {
    display: "none",
  },
};

const handleChange = (submitProfileImg: () => void,
  input: WrappedFieldInputProps
) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const { onChange } = input;
  const { files } = e.target;
  if (files) {
    await onChange(files[0]);
    submitProfileImg()
  }
};

const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({
  input, submitProfileImg,
}) => (
  <div>
    <input
      onChange={handleChange(submitProfileImg, input)}
      style={style.file}
      type="file"
      id="profileImage"
    />
    <label htmlFor="profileImage">
      <img
        style={style.img}
        src="http://placekitten.com/100/100"
        alt="profile"
      />
    </label>
  </div>
);

class ProfileImg extends Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
  render() {
    const { handleSubmit, submitProfileImg } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field name="file" component={RenderField} submitProfileImg={submitProfileImg} />
      </form>
    );
  }
}

export default reduxForm<{},IProfileImg>({
  form: "profileImg",
})(ProfileImg);
