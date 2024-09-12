import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "../Components/Headers/NavBar";
import { Footer } from "../Components/Footer/Footer";
import { useEffect } from "react";
import NotFound from "../Pages/NotFound";
import { NetworkContext } from "../Connection/NetworkProvider";

const MainLayout = () => {
  const isOnline = useContext(NetworkContext);

  return (
    <main className=" bg-white dark:bg-darkmodegrey">
      {isOnline ? (
        <>
          <NavBar />
          <Outlet />
          <Footer />
        </>
      ) : (
        <NotFound />
      )}
    </main>
  );
};

export default MainLayout;
