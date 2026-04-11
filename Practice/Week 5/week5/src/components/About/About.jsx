import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const About = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin = () => {
    login();
    navigate("/");
  };

  return (
    <div>
      <button onClick={() => handleLogin()}>Click</button>
    </div>
  );
};

export default About;
