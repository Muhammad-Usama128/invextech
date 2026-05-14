import React from "react";
import { useParams } from "react-router-dom";
import "./SubCategories.css";

const SubCategories = () => {
  const { category } = useParams();

  const fruits = ["Banana", "Apple", "Mango"];
  const vegetables = ["Onion", "Patato", "Tomato"];
  const meat = ["Camel Meat", "Goat Meat", "Cow Meat"];
  return (
    <ul className="categories">
      {category === "fruits" &&
        fruits.map((item) => <li className="category">{item}</li>)}
      {category === "vegetables" &&
        vegetables.map((item) => <li className="category">{item}</li>)}
      {category === "meat" &&
        meat.map((item) => <li className="category">{item}</li>)}
    </ul>
  );
};

export default SubCategories;
