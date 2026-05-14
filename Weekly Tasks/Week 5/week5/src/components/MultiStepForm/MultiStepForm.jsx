import React, { useState } from "react";

const MultiStepForm = () => {
  const [currentForm, setCurrentForm] = useState(1);
  const [data, setData] = useState({ email: "", password: "" });
  const [resetNumber, setResetNumber] = useState(0);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const firstSubmit = (e) => {
    e.preventDefault();
    if (!data.email) {
      e.currentTarget.querySelector("input").style.border = "1px solid red";
    } else if (!data.email.includes("@")) {
      e.currentTarget.querySelector("input").style.border = "1px solid red";
    } else {
      setCurrentForm((prev) => prev + 1);
    }
  };
  const secondSubmit = (e) => {
    e.preventDefault();
    if (!resetNumber) {
      e.currentTarget.querySelector("input").style.border = "1px solid red";
    } else if (resetNumber !== 1234) {
      console.log(resetNumber, typeof resetNumber);

      e.currentTarget.querySelector("input").style.border = "1px solid red";
    } else {
      setCurrentForm((prev) => prev + 1);
    }
  };
  const thirdSubmit = (e) => {
    e.preventDefault();
    if (!newPassword) {
      e.currentTarget.querySelector("#first").style.border = "1px solid red";
    } else if (newPassword.length < 6) {
      e.currentTarget.querySelector("#first").style.border = "1px solid red";
    }
    if (!confirmPassword) {
      e.currentTarget.querySelector("#second").style.border = "1px solid red";
    } else if (newPassword !== confirmPassword) {
      e.currentTarget.querySelector("#second").style.border = "1px solid red";
    } else {
      setCurrentForm((prev) => prev + 1);
    }
  };
  return (
    <div>
      {currentForm === 1 && (
        <div className="firstForm">
          <h1>Password Reset</h1>
          <form onSubmit={firstSubmit}>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {currentForm === 2 && (
        <div className="secondForm">
          <h1>Enter Password(1234)</h1>
          <form onSubmit={secondSubmit}>
            <input
              type="number"
              value={resetNumber}
              onChange={(e) => setResetNumber(parseInt(e.target.value))}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {currentForm === 3 && (
        <div className="thirdForm">
          <h1>New Password</h1>
          <form onSubmit={thirdSubmit}>
            <input
              id="first"
              type="text"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              id="second"
              type="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
      {currentForm === 4 && <h1>Done</h1>}
    </div>
  );
};

export default MultiStepForm;
