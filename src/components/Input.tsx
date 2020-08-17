import React, { CSSProperties, StatelessComponent } from "react";

const style = {
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  padding: "10px 15px",
  borderRadius: "4px",
  width: "calc(100% - 30px)", //for to stack content, (input width - left/right(15px) padding)
  marginBottom: "10px",
};

const spanStyle = {
  color: "#777",
  fontSize: '10px',
  textTransform: 'uppercase',
  fontWeight: 900,
} as CSSProperties

interface IInputProps {
  placeholder?: string;
  label: string;
}

const Input: StatelessComponent<IInputProps> = (props: IInputProps) => {
  const { label } = props
    return (
      <div>
        <span style={spanStyle}>{label}</span>
        <input {...props} style={style} />
      </div>
    );
}

export default Input