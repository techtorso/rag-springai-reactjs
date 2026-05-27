import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

export default function ProtectedRoute({ children, adminOnly }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  if (adminOnly && !isAdmin()) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}