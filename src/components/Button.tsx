import React, { Component } from "react";

const style = (block: boolean, disabled: boolean) => ({
  backgroundColor: disabled ? "#777777" : "#00D1B2",
  border: "0px",
  borderRadius: "4px",
  padding: "10px 15px",
  color: "#fff",
  width: block ? "100%" : undefined,
  marginBottom: "10px",
});

interface IButtonProps {
  block?: boolean;
  disabled?: boolean;
}

export default class Button extends Component<IButtonProps> {
  render() {
    const { block = false, disabled = false, ...otherProps } = this.props;
    return (
      <button
        {...otherProps}
        style={style(block, disabled)}
        disabled={disabled}
      />
    );
  }
}
