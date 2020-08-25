import React from "react";
import {
  reduxForm,
  InjectedFormProps,
  Field,
  WrappedFieldProps,
  WrappedFieldInputProps,
} from "redux-form";

interface IProfileImg{
  submitProfileImage: () => void
}

const style = {
  img: {
    borderRadius: "100%",
  },
  file: {
    display: "none",
  },
};

const handleChange = (submitProfileImage: () => void, input: WrappedFieldInputProps) => async (e: React.ChangeEvent<HTMLInputElement>) => {
  e.preventDefault();
  const { onChange } = input;
  const { files } = e.target;
  if (files) {
    await onChange(files[0]);
    submitProfileImage()
  }
};

const RenderField: React.StatelessComponent<WrappedFieldProps & IProfileImg> = ({
  input, submitProfileImage
}) => (
  <div>
    <input
      onChange={handleChange(submitProfileImage, input)}
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

class ProfileImg extends React.Component<InjectedFormProps<{}, IProfileImg> & IProfileImg> {
  render() {
    const { handleSubmit, submitProfileImage } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <Field 
          name="file" 
          component={RenderField} 
          submitProfileImage={submitProfileImage} />
      </form>
    );
  }
}

export default reduxForm<any, any>({
  form: "profileImg",
})(ProfileImg);
