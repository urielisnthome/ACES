import LandingPage from "../../pages/user/LandingPage";
import Assessment from "../../pages/user/assessment/assessment";

const protectedRoutes = [
  { path: "/landing", element: <LandingPage /> },
  { path: "/assessment", element: <Assessment /> },
];

export default protectedRoutes;