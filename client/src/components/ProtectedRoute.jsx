import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/useAuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useAuthContext();
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
