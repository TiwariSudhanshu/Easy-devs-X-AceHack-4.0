import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProductPage";
import Track from "./pages/TrackOrder";

function App() {
  const walletAddress = useSelector((state) => state.wallet.walletAddress); 

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/",
      element: <ProtectedRoute element={<Dashboard />} />,
    },
    {
      path: "/add",
      element: <ProtectedRoute element={<AddProduct />} />,
    },
    {
      path: "/track",
      element: <ProtectedRoute element={<Track />} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
