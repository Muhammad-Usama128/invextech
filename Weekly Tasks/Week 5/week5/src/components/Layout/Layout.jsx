import React from "react";
import { Suspense } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner/Spinner";
const Layout = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  );
};

export default Layout;
