import React from "react";
import { NavLink } from "react-router-dom";
import "./BlogCard.css";
const BlogCard = ({ blog }) => {
  return (
    <NavLink to={`/blogs/${blog.id}`} className="blogCard">
      <img src={blog.image} alt="" />
      <h3>{blog.title}</h3>
      <p>{blog.cardDescription}</p>
    </NavLink>
  );
};

export default BlogCard;
