import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ element }) => {
  const walletAddress = useSelector((state) => state.wallet.walletAddress); 

  return walletAddress ? element : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
