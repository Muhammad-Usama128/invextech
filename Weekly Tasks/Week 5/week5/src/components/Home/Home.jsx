import React from "react";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const { logout, user, login } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("about");
  };
  return <div>Home</div>;
};

export default Home;
