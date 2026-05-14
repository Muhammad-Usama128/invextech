import React, { useState, useContext } from "react";
import { ThemeContext } from "../../Context/ThemeContext";
const Home = () => {
  const { theme, setNewTheme } = useContext(ThemeContext);
  {
    theme === "light"
      ? ((document.querySelector("body").style.backgroundColor = "white"),
        (document.querySelector("body").style.color = "black"))
      : ((document.querySelector("body").style.backgroundColor = "black"),
        (document.querySelector("body").style.color = "white"));
  }
  return (
    <div>
      <h1>Theme is {theme}</h1>
      <button
        onClick={() => {
          theme === "light" ? setNewTheme("dark") : setNewTheme("light");
        }}
      >
        Change
      </button>
    </div>
  );
};

export default Home;
