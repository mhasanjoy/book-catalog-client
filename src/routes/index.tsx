import Home from "@/pages/home";
import SignIn from "@/pages/sign-in";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/main";
import ErrorPage from "../pages/error";

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
      {
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
]);

export default router;
