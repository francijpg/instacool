import React, { Component, CSSProperties } from "react";

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px 15px",
  borderRadius: "4px",
  width: "calc(100% - 30px)", //for to stack content, (input width - left/right(15px) padding)
  marginBottom: "10px",
};

const spanStyle ={
  color: "#777",
  fontSize: '10px',
  textTransform: 'uppercase',
  fontWeight: 900,
} as CSSProperties

interface IInputProps {
  placeholder?: string;
}

export default class Input extends Component<IInputProps> {
  render() {
    return (
      <div>
        <span style={spanStyle}>text</span>
        <input {...this.props} style={style} />
      </div>
    );
  }
}
