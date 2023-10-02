import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main";
import ErrorPage from "../pages/error";
import Home from "../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default router;
