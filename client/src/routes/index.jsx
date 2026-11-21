import { createBrowserRouter, Navigate } from "react-router-dom";
import Assessment from "../pages/user/assessment/Assessment";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/assessment" replace />,
  },
  {
    path: "/assessment",
    element: <Assessment />,
  },
]);

export default router;