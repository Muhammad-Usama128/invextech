import React, { useEffect, useState } from "react";
import "./Blogs.css";
import BlogCard from "../BlogCard/Blogcard";
const Blogs = () => {
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
    {
      id: 4,
      title: "Building Responsive Websites",
      image:
        "https://gogeekz.com/wp-content/uploads/2023/03/March-29-How-to-Build-a-Responsive-Website-Tips-and-Best-Practices.png",
      cardDescription: "Tips to make your website look great on all devices.",
      fullDescription: `Responsive web design ensures that your website looks good on all screen sizes, from mobile phones to large desktop monitors. It involves using flexible grids, images, and CSS media queries to adjust layout and content based on screen size. In this blog, we will discuss best practices for responsive design, including viewport settings, fluid layouts, flexible images, and CSS frameworks. You'll also learn about mobile-first design, breakpoints, and common pitfalls. This long description is repeated to simulate ~100 sentences. Responsive web design ensures that your website looks good on all screen sizes, from mobile phones to large desktop monitors.`,
    },
    {
      id: 5,
      title: "Intro to Node.js",
      image:
        "https://www.mindinventory.com/blog/wp-content/uploads/2019/09/microservices-with-node.webp",
      cardDescription: "Learn how to build backend applications using Node.js.",
      fullDescription: `Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server. It is event-driven, non-blocking, and designed for building scalable network applications. This tutorial introduces Node.js, explaining its architecture, modules, and how to set up a development environment. You will also learn about npm, package management, and creating simple server applications. Understanding Node.js is essential for full-stack JavaScript development. This long description is repeated to simulate ~100 sentences. Node.js is a JavaScript runtime built on Chrome's V8 engine that allows you to run JavaScript on the server.`,
    },
    {
      id: 6,
      title: "MongoDB Basics",
      image:
        "https://blog.codersee.com/wp-content/uploads/2023/01/mongodb_overview_introduction_featured.png",
      cardDescription: "Understand how to store and manage data using MongoDB.",
      fullDescription: `MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. It provides high performance, scalability, and ease of development. In this blog, you will learn about collections, documents, CRUD operations, indexes, and data modeling. We also explore using MongoDB with Node.js and Mongoose for backend development. MongoDB is widely used in modern web applications. This long description is repeated to simulate ~100 sentences. MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents.`,
    },
    {
      id: 7,
      title: "React Router Explained",
      image:
        "https://www.boardinfinity.com/blog/content/images/2022/11/Your-paragraph-text--17-.jpg",
      cardDescription: "Learn routing and route protection in React apps.",
      fullDescription: `React Router is the standard routing library for React applications. It enables navigation, nested routes, route parameters, and redirects. You can protect routes using authentication and conditional rendering. This blog covers React Router basics, dynamic routing, hooks like useNavigate and useParams, and best practices. By mastering React Router, you can build complex, multi-page React apps efficiently. This long description is repeated to simulate ~100 sentences. React Router is the standard routing library for React applications.`,
    },
    {
      id: 8,
      title: "Async JavaScript Made Easy",
      image: "https://miro.medium.com/0*A-5cwHJEZ1N1Jzam.png",
      cardDescription:
        "Promises, async/await, and handling API calls effectively.",
      fullDescription: `Asynchronous programming in JavaScript allows you to perform tasks like fetching data without blocking the main thread. This blog explains callbacks, promises, async/await syntax, and error handling. You'll see practical examples of fetching APIs, chaining promises, and using async functions. Mastering async JS is essential for modern web development. This long description is repeated to simulate ~100 sentences. Asynchronous programming in JavaScript allows you to perform tasks like fetching data without blocking the main thread.`,
    },
    {
      id: 9,
      title: "Frontend Performance Tips",
      image:
        "https://cdn.hashnode.com/res/hashnode/image/upload/v1746468304666/ca24ac6b-1591-4abf-a544-739fbfaecf49.png",
      cardDescription: "Optimize your website for speed and better UX.",
      fullDescription: `Frontend performance is critical for user experience and SEO. Techniques include minimizing HTTP requests, lazy loading images, code splitting, caching, and reducing render-blocking resources. This blog explores performance best practices and tools for measuring speed. This long description is repeated to simulate ~100 sentences. Frontend performance is critical for user experience and SEO.`,
    },
    {
      id: 10,
      title: "Deploying Your Web App",
      image:
        "https://cdn.hashnode.com/res/hashnode/image/upload/v1720706045613/eaa98b5c-2309-4abd-859e-02e1c4d45ad4.png",
      cardDescription: "Learn to deploy React apps using modern platforms.",
      fullDescription: `Deployment is the final step of a web project. You can deploy apps on platforms like Vercel, Netlify, or Heroku. This blog covers preparing your build, environment variables, static vs dynamic hosting, and best practices. Deploying ensures your app is accessible to users worldwide. This long description is repeated to simulate ~100 sentences. Deployment is the final step of a web project.`,
    },
  ]);

  return (
    <div className="blogsPage">
      <h1>My Blogs</h1>
      <h2>These are all the blogs we have posted.</h2>
      <div className="blogs">
        {blogs.length === 0 ? (
          <h3>No Blog</h3>
        ) : (
          blogs.map((item) => <BlogCard key={item.id} blog={item} />)
        )}
      </div>
    </div>
  );
};

export default Blogs;
