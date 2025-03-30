import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProductPage";
import Track from "./pages/TrackOrder";
import OwnershipChange from "./pages/transferownership";

function App() {
  const walletAddress = useSelector((state) => state.wallet.walletAddress); 

  const router = createBrowserRouter([
    {
      path: "/login",
<<<<<<< HEAD
      element: <LoginPage />
    }, {
      path: "/",
      element: <Dashboard />
    }, {
      path: "/add",
      element: <AddProduct />
    }, {
      path: "/track",
      element: <Track />
    }, {
      path: "/ownerChange",
      element: <OwnershipChange />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
=======
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
>>>>>>> c22b301e8247085ac58fbafc22c1b9b1c75bcf24
}

export default App;
