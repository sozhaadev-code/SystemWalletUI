import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const auth = localStorage.getItem("auth");
  const role = localStorage.getItem("role");

  if (!auth) return <Navigate to="/" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/users" />;   
  }

  return children;
};

export default ProtectedRoute;
