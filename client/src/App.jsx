import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Additem from "./component/additem"
import ShowItem from "./component/showitem"
import Layout from "./layout/layout";
import Verify from "./component/user";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProductPage";
import Track from "./pages/TrackOrder";
import OwnershipChange from "./pages/transferownership";

function App() {
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         index: true,
  //         element: <ShowItem />,
  //       },
  //       {
  //         path: "additem",
  //         element: <Additem />
  //       },
  //       {
  //         path: "verify",
  //         element: <Verify />
  //       }
  //     ],
  //   },
  // ]);

  const router = createBrowserRouter([
    {
      path: "/login",
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
}

export default App;

