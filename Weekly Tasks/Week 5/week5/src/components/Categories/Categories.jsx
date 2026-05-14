import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Categories.css";
const Categories = () => {
  return (
    <ul className="categories">
      <li>
        <NavLink className="category" to={"fruits"}>
          Fruits
        </NavLink>
      </li>
      <li>
        <NavLink className="category" to={"vegetables"}>
          Vegetables
        </NavLink>
      </li>
      <li>
        <NavLink className="category" to={"meat"}>
          Meat
        </NavLink>
      </li>
    </ul>
  );
};

export default Categories;
