import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Components/Headers/NavBar";
import { Footer } from "../Components/Footer/Footer";

const MainLayout = () => {
  return (
    <main className=" bg-white dark:bg-darkmodegrey">
      <NavBar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default MainLayout;
