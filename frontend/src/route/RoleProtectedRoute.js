// RoleProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isLoggedIn, role, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default RoleProtectedRoute;