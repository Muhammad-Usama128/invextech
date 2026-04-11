import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, []);
  return (
    <div>
      <h1>Not Found</h1>
      <p style={{ textAlign: "center" }}>Redirecting...</p>
    </div>
  );
};

export default NotFound;
