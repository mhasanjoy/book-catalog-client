import { Toaster } from "@/components/ui/toaster";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default MainLayout;
