import { lazy, useState } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./components/BlogPage/BlogPage";
import NotFound from "./components/NotFound/NotFound";
const Home = lazy(() => import("./components/Home/Home"));
const Blogs = lazy(() => import("./components/Blogs/Blogs"));
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="blogs" element={<Blogs />} />
            <Route path="blogs/:id" element={<BlogPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
