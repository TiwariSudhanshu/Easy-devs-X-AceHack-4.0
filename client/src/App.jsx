import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import Track from "./pages/TrackOrder";
import LoginPage from "./pages/LoginPage";
import OwnershipChange from "./pages/transferownership";
import Dashboard from "./pages/Dashboard";
import AddProduct from './pages/AddProductPage'

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
    }, {
      path: "/ownerChange",
      element: <OwnershipChange />
    },
    {
      path: "/track",
      element: <ProtectedRoute element={<Track />} />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
