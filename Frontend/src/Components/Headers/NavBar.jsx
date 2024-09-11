import React, { useEffect, useState } from "react";
import logo from "/logo.png";
import darklogo from "/darkmode-logo.png";
import photourl from "../../assets/home/girl.jpg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider, Switch } from "@mui/material";
import { FaBars as FaBa } from "react-icons/fa";
import { UseAuth } from "../Hooks/UseAuth";

const navlinks = [
  { label: "Home", url: "/" },
  { label: "Instructors", url: "/instructors" },
  { label: "Classes", url: "/classes" },
];

const Theme = createTheme({
  palette: {
    primary: {
      main: "#ff0000",
    },
    secondary: {
      main: "#00ff00",
    },
  },
});

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [islogin, setislogin] = useState(false);
  const [isMobileviewopen, setisMoibleviewopen] = useState(false);
  const [isHome, setisHome] = useState(false);
  const [isFixed, setisFixed] = useState(false);
  const [isDarkmode, setisDarkmode] = useState(false);
  const { user, logout } = UseAuth();

  const toggleMobileviewopen = () => {
    setisMoibleviewopen(!isMobileviewopen);
  };

  const handlelogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const darkClass = "dark";
    const root = window.document.documentElement;
    if (isDarkmode) {
      root.classList.add(darkClass);
    } else {
      root.classList.remove(darkClass);
    }
  }, [isDarkmode]);

  useEffect(() => {
    setisHome(location.pathname === "/");
    setislogin(location.pathname === "/login");
    setisFixed(
      location.pathname === "/register" || location.pathname === "/login"
    );
  }, [location]);

  return (
    <nav
      className={` ${
        isDarkmode
          ? "dark:bg-darkmodegrey duration-500"
          : "bg-white duration-500"
      }`}
    >
      <div className="lg:w-[95%] mx-auto sm:px-6 lg:px-6">
        <div
          className="px-4 py-4
         flex items-center justify-between"
        >
          <div>
            <a href="/">
              <img
                src={!isDarkmode ? logo : darklogo}
                alt="logo"
                className={`w-30 h-20`}
              />
            </a>
          </div>

          {/* mobileview
           */}

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileviewopen}
              className="focus:outline-none text-grey-300 hover:text-white"
              type="button"
            >
              <FaBa className="w-8 h-8 hover:text-primary"></FaBa>
            </button>
          </div>

          <div className="hidden md:block text-lg">
            <div className="flex">
              <ul className="ml-10 flex items-center space-x-4 pr-4">
                {navlinks.map((link) => (
                  <li key={link.url}>
                    <NavLink
                      to={link.url}
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${isDarkmode ? "text-white" : "text-black"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}

                {/* {user} */}

                {user ? null : islogin ? (
                  <li>
                    <NavLink
                      to="/register"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${isDarkmode ? "text-white" : "text-black"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${isDarkmode ? "text-white" : "text-black"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                )}

                {user && (
                  <li>
                    <NavLink
                      to="/dashboard"
                      className={({ isActive }) =>
                        `font-bold ${
                          isActive
                            ? "text-secondary"
                            : `${isDarkmode ? "text-white" : "text-black"}`
                        } hover:text-secondary duration-300`
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                )}

                {user && (
                  <li>
                    <img
                      src={user.photoURL}
                      className="h-[40px] w-[40px] rounded-full"
                    />
                  </li>
                )}

                {user && (
                  <li>
                    <button
                      className={`px-3 py-2 rounded-md border-secondary border-2 font-bold ${
                        isDarkmode ? "text-white" : "text-black"
                      }   hover:bg-secondary duration-300 `}
                      onClick={() => {
                        handlelogout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                )}

                {/* darkmode */}
                <li>
                  <ThemeProvider theme={Theme}>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        className="sr-only peer"
                        value=""
                        type="checkbox"
                        checked={isDarkmode}
                        onChange={() => {
                          setisDarkmode(!isDarkmode);
                        }}
                      />
                      <div className="w-20 h-11 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
                    </label>
                  </ThemeProvider>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
