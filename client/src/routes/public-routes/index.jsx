import Home from "../../pages/auth/Home";
import Login from "../../pages/auth/Login";

const publicRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default publicRoutes;