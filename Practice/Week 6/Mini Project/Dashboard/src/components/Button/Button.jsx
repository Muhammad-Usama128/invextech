import React, { useState } from "react";
import { useUser } from "../../Context/UserContext";
import "./Button.css";
import { useTheme } from "../../Context/ThemeContext";
const Button = () => {
  const { theme, changeTheme } = useTheme();
  const { user, userChange } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    e.preventDefault();

    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (password.length > 6) {
        userChange();
        document.querySelector(".loginForm").style.display = "none";
        setEmail("");
        setPassword("");
        document.querySelector("body").style.overflowY = "auto";
      } else {
        document.querySelector("#password").style.border = "1.5px solid red";
      }
    } else {
      document.querySelector("#email").style.border = "1.5px solid red";
    }
    if (password.length < 6) {
      document.querySelector("#password").style.border = "1.5px solid red";
    }
  };
  return (
    <>
      <div className="loginForm">
        <div className="form-div">
          <button
            onClick={(e) => {
              e.currentTarget.parentElement.parentElement.style.display =
                "none";
              document.querySelector("body").style.overflowY = "auto";
            }}
          >
            X
          </button>
          <form>
            <input
              type="email"
              id="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                document.querySelector("#email").style.border =
                  "1.5px solid black";
              }}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter Your Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                document.querySelector("#password").style.border =
                  "1.5px solid black";
              }}
            />
            <button onClick={handleChange}>Submit</button>
          </form>
        </div>
      </div>
      <div className="right">
        {user === "login" ? (
          <div className="avatar">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="blank-profile"
            />

            <button
              className="exit"
              onClick={userChange}
              style={{ padding: "12px 26px" }}
            >
              Log out
            </button>
          </div>
        ) : (
          <button
            style={{ padding: "12px 26px" }}
            onClick={() => {
              document.querySelector(".loginForm").style.display = "flex";
              document.querySelector("body").style.overflowY = "hidden";
            }}
          >
            Log In
          </button>
        )}
        <button className="themeBtn" onClick={() => changeTheme()}>
          {theme === "light" ? "☀️" : "🌙"}
        </button>
      </div>
    </>
  );
};

export default Button;
