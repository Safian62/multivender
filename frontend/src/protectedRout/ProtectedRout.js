import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/layout/loader";

const ProtectedRout = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);
  if (loading === true) {
    return <Loader />;
  } else {
    if (!isAuthenticated) {
      return <Navigate to={`/login`} replace />;
    }
    return children;
  }
 
};

export default ProtectedRout;
