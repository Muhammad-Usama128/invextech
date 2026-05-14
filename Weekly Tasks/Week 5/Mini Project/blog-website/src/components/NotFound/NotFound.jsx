import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      navigate("/");
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <div className="notFound">
      <h1 className="noBlogFound-h1">Page Not Found</h1>
      <h2 className="noBlogFound-h2">Redirecting...</h2>
    </div>
  );
};

export default NotFound;
