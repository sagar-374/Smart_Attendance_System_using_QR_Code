import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // ❌ Not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // ✅ Handle SINGLE or MULTIPLE roles
  if (role) {
    // if role is array → check includes
    if (Array.isArray(role)) {
      if (!role.includes(userRole)) {
        return <Navigate to="/" replace />;
      }
    }
    // if role is string → normal check
    else if (role !== userRole) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
