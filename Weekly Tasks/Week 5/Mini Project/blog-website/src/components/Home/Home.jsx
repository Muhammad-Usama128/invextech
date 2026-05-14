import React, { useEffect, useState } from "react";
import "./Home.css";
import BlogCard from "../BlogCard/Blogcard";
import { NavLink } from "react-router-dom";
const Home = () => {
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Getting Started with React",
      image: "https://miro.medium.com/1*3LlUPEmlty19Yx7OUJRGjQ.png",
      cardDescription:
        "Learn the basics of React and how to build your first app.",
      fullDescription: `React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM. This tutorial will guide you through the basics of React, starting from installation to building your first component. You will learn about JSX, the syntax extension for JavaScript, and how it works seamlessly with React. Components are the building blocks of React applications, enabling modularity and reusability. Props are used to pass data between components, and state allows components to manage dynamic data. Lifecycle methods let you hook into different stages of a component's existence, from mounting to unmounting. Handling events in React is simple, and the library provides a clean way to manage user interactions. You will also learn about conditional rendering, lists, and keys to efficiently render collections of elements. Understanding React's one-way data flow helps you build predictable and maintainable applications. By the end of this tutorial, you'll be able to create simple React applications and understand the foundation for more advanced topics like hooks and routing. This long description is repeated to simulate a ~100 sentence blog content. React is a popular JavaScript library for building user interfaces. It allows developers to create reusable UI components and efficiently update the DOM. This tutorial will guide you through the basics of React, starting from installation to building your first component.`,
    },
    {
      id: 2,
      title: "Understanding JavaScript Closures",
      image: "https://miro.medium.com/1*6bUcXnSDHzA6u--LryMhtA.png",
      cardDescription:
        "A deep dive into closures and how they work in JavaScript.",
      fullDescription: `Closures are a fundamental concept in JavaScript that allow a function to access variables from its outer scope even after the outer function has finished executing. They are often used to create private variables or functions, maintain state, and implement functional programming patterns. Understanding closures is key to mastering JavaScript. In this blog, we will explore closures in depth, with practical examples and explanations. You'll learn how closures work under the hood, how they relate to lexical scoping, and common use cases in real-world applications. This long description is repeated to simulate ~100 sentences. Closures are a fundamental concept in JavaScript that allow a function to access variables from its outer scope even after the outer function has finished executing.`,
    },
    {
      id: 3,
      title: "CSS Flexbox Guide",
      image:
        "https://procoder09.com/wp-content/uploads/2025/10/css-flexbox-social.webp",
      cardDescription:
        "Master layout design using Flexbox with practical examples.",
      fullDescription: `Flexbox is a CSS layout model that provides an efficient way to align and distribute space among items in a container. It simplifies the process of creating flexible and responsive layouts. In this guide, we will explore all Flexbox properties, including justify-content, align-items, align-self, flex-direction, flex-wrap, and flex-grow. You will learn how to create complex layouts without relying on floats or positioning hacks. Flexbox is widely supported and makes designing for multiple screen sizes easier. This long description is repeated to simulate ~100 sentences. Flexbox is a CSS layout model that provides an efficient way to align and distribute space among items in a container.`,
    },
  ]);
  return (
    <div className="home">
      <h1>Home</h1>
      <div className="blogs">
        {blogs.length === 0 ? (
          <h2>No Blog</h2>
        ) : (
          blogs.map((item) => <BlogCard key={item.id} blog={item} />)
        )}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <NavLink to="blogs" className="view-more">
          View More
        </NavLink>
      </div>
    </div>
  );
};

export default Home;
