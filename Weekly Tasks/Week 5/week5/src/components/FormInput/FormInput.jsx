import React from "react";

const FormInput = ({ name, value, onChange, error, type }) => {
  return (
    <div className="input-div">
      <label htmlFor={name.toLowerCase()}>{name}</label>
      <input
        type={type}
        value={value}
        name={name.toLowerCase()}
        onChange={onChange}
      />
      <div className="error">{error}</div>
    </div>
  );
};

export default FormInput;
