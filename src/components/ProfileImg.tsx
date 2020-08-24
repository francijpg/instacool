import React, { Component } from 'react'
import { reduxForm, InjectedFormProps } from 'redux-form';

const style = {
  img: {
    borderRadius: "100%",
  },
};

class ProfileImg extends Component<InjectedFormProps> {
  render() {
    return (
      <form>
        <img style={style.img} src="http://placekitten.com/100/100" alt="profile"/>
      </form>
    )
  }
}

export default reduxForm({
  form: 'profileImg'
})(ProfileImg)