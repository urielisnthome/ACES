import { Navigate } from "react-router-dom";

import Home from "../../pages/auth/Home";
import Login from "../../pages/auth/Login";
import Register from "../../pages/auth/Register";

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];

export default publicRoutes;
