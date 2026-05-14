import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <header>
      <nav className="navbar">
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="categories">Categories</NavLink>
          </li>
          <li>
            <NavLink to="about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
