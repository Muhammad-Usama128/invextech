import React from "react";
import "./Card.css";
const Card = ({ product, handleCard }) => {
  return (
    <li>
      <img src={product.images[0]} alt="" />
      <p style={{ fontWeight: "bolder", fontSize: "1.1rem" }}>
        {product.title}
      </p>
      <p style={{ margin: "10px 0" }}>{product.description}</p>
      <p style={{ fontWeight: "bolder" }}>{product.price}$</p>
      <button onClick={() => handleCard(product.id)}>Add to Card</button>
    </li>
  );
};

export default Card;
