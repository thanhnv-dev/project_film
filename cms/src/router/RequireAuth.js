import { Navigate, useLocation } from "react-router-dom";
import React from "react";

const RequireAuth = ({ children }) => {
  let location = useLocation();
  const getTokenLocal = localStorage.getItem("token");

  if (!getTokenLocal) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
