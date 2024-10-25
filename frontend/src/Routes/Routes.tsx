import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "../componets/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>hello</div>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
