import React, { useState } from "react";
import FormInput from "../formInput/formInput";
import "./Form.css";
const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const validatedErrors = validate();
    setError(validatedErrors);
    if (Object.keys(validatedErrors).length === 0) {
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  };
  const validate = () => {
    let Errors = {};
    if (!formData.name) {
      Errors.name = "Name is needed";
    } else if (/[^a-zA-Z ]/.test(formData.name)) {
      Errors.name = "Name can only has letters or space.";
    }
    if (!formData.email) {
      Errors.email = "Email is needed.";
    } else if (!formData.email.includes("@")) {
      Errors.email = "Invalid email";
    }
    if (!formData.password) {
      Errors.password = "Password is needed.";
    }
    if (formData.password.length < 6) {
      Errors.password = "Password should be longer than 6 characters.";
    }
    return Errors;
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    const { [e.target.name]: removed, ...rest } = error;
    setError(rest);
  };
  return (
    <>
      <h1>Form Validation</h1>

      <form onSubmit={handleSubmit}>
        {isSubmitted && <p>Form Submitted</p>}
        <FormInput
          name={"Name"}
          type={"text"}
          value={formData.name}
          onChange={onChange}
          error={error.name}
        />
        <FormInput
          name={"Email"}
          type={"email"}
          value={formData.email}
          onChange={onChange}
          error={error.email}
        />
        <FormInput
          name={"Password"}
          type={"password"}
          value={formData.password}
          onChange={onChange}
          error={error.password}
        />
        <button className="form-btn" type="submit">
          Submit
        </button>
      </form>
    </>
  );
};

export default Form;
