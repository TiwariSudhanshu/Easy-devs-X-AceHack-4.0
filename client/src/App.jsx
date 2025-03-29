import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Additem from "./component/additem"
import ShowItem from "./component/showitem"
import Layout from "./layout/layout";
import Verify from "./component/user";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <ShowItem />,
        },
        {
          path: "additem",
          element: <Additem />
        },
        {
          path: "verify",
          element: <Verify />
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App;

