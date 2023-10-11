import { useAppSelector } from "@/redux/types";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

interface IProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: IProps) => {
  const { user, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (!user.email && !isLoading) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }

  return children;
};

export default PrivateRoute;
