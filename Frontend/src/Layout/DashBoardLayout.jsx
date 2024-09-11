import React, { useState } from "react";
import { UseUser } from "../Components/Hooks/UseUser";
import { IoMdHome } from "react-icons/io";
import { FaUsersLine } from "react-icons/fa6";
import { SiGoogleclassroom, SiInstructure } from "react-icons/si";
import { TbBrandAppstore } from "react-icons/tb";
import { BiLogOut, BiHomeAlt, BiSelectMultiple } from "react-icons/bi";
import { FaHome } from "react-icons/fa";
import { MdExplore, MdPayments } from "react-icons/md";
import { IoSchoolSharp } from "react-icons/io5";
import { MdPendingActions } from "react-icons/md";
import { IoMdDoneAll } from "react-icons/io";
import { GridLoader } from "react-spinners";
import { MdOutlineHomeWork } from "react-icons/md";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { UseAuth } from "../Components/Hooks/UseAuth";
import { UseScroll } from "../Components/Hooks/UseScroll";

export const DashBoardLayout = () => {
  const [open, setopen] = useState(true);
  const navigate = useNavigate();
  const { logout } = UseAuth();
  const { currentuser, isLoading } = UseUser();
  const role = currentuser?.[0]?.role;
  console.log(role);

  const adminnavlinks = [
    {
      to: "/dashboard/admin-home",
      icon: <IoMdHome className="text-2xl" />,
      label: "Dashboard Home",
    },
    {
      to: "/dashboard/manage-users",
      icon: <FaUsersLine className="text-2xl" />,
      label: "Manage Users",
    },
    {
      to: "/dashboard/manage-classes",
      icon: <SiGoogleclassroom className="text-2xl" />,
      label: "Manage Classes",
    },
    {
      to: "/dashboard/manage-applications",
      icon: <TbBrandAppstore className="text-2xl" />,
      label: "Application",
    },
    {
      to: "/",
      icon: <MdOutlineHomeWork className="text-2xl" />,
      label: "MainMenu",
    },
  ];

  const instructornavlinks = [
    {
      to: "/dashboard/instructor-cp",
      icon: <FaHome className="text-2xl" />,
      label: "Home",
    },
    {
      to: "/dashboard/add-class",
      icon: <MdExplore className="text-2xl" />,
      label: "Add Class",
    },
    {
      to: "/dashboard/my-classes",
      icon: <IoSchoolSharp className="text-2xl" />,
      label: "My Classes",
    },
    {
      to: "/dashboard/my-pending",
      icon: <MdPendingActions className="text-2xl" />,
      label: "Pending Classes",
    },
    {
      to: "/dashboard/my-approved",
      icon: <IoMdDoneAll className="text-2xl" />,
      label: "Approved Classes",
    },
    {
      to: "/",
      icon: <MdOutlineHomeWork className="text-2xl" />,
      label: "MainMenu",
    },
  ];

  const usernavlinks = [
    {
      to: "/dashboard/user-cp",
      icon: <BiHomeAlt className="text-2xl" />,
      label: "Dashboard",
    },
    {
      to: "/dashboard/enrolled-class",
      icon: <SiGoogleclassroom className="text-2xl" />,
      label: "My Enroll",
    },
    {
      to: "/dashboard/my-selected",
      icon: <BiSelectMultiple className="text-2xl" />,
      label: "My Selected",
    },
    {
      to: "/dashboard/my-payments",
      icon: <MdPayments className="text-2xl" />,
      label: "Payment History",
    },
    {
      to: "/dashboard/apply-instructor",
      icon: <SiInstructure className="text-2xl" />,
      label: "Apply for Instructor",
    },
    {
      to: "/",
      icon: <MdOutlineHomeWork className="text-2xl" />,
      label: "MainMenu",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />;
      </div>
    );
  }

  return (
    <div className="flex bg-white dark:bg-darkmodegrey dark:text-white">
      <div
        className={`${
          open ? "w-72 overflow-y-auto" : "w-[80px] overflow-auto"
        }  h-screen p-5 md:block hidden pt-6 relative duration-300`}
      >
        <div className="flex gap-x-3 items-center">
          <img
            onClick={() => {
              setopen(!open);
            }}
            src="/Icon.png"
            className={`cursor-pointer h-[50px] duration-300 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            onClick={() => {
              setopen(!open);
            }}
            className={`font-bold text-2xl cursor-pointer origin-left duration-300 ${
              !open && "scale-0"
            }`}
          >
            SkillSprouts
          </h1>
        </div>

        {role === "admin" && (
          <ul className="pt-6 dark:text-white">
            <p
              className={`ml-3 text-gray-600 dark:text-white ${
                !open && "hidden"
              }`}
            >
              <small>Menu</small>
            </p>

            {role === "admin" &&
              adminnavlinks.map((menuitem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuitem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-rose-600 text-white" : "text-black"
                      } duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4 dark:text-white  `
                    }
                  >
                    {menuitem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300 ml-2`}
                    >
                      {menuitem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            <li className="mb-2">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`flex text-black duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4 dark:text-white `}
              >
                <BiLogOut className="text-2xl" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 ml-2`}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        )}

        {role === "instructor" && (
          <ul className="pt-6">
            <p className={`ml-3 text-gray-600 ${!open && "hidden"}`}>
              <small>Menu</small>
            </p>

            {role === "instructor" &&
              instructornavlinks.map((menuitem, index) => (
                <li key={index} className="mb-2 dark:text-white">
                  <NavLink
                    to={menuitem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-rose-600 text-white" : "text-black"
                      } duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4 dark:text-white  `
                    }
                  >
                    {menuitem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300 ml-2`}
                    >
                      {menuitem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            <li className="mb-2">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`flex text-black duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4`}
              >
                <BiLogOut className="text-2xl" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 ml-2`}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        )}

        {role === "user" && (
          <ul className="pt-6 ">
            <p
              className={`ml-3 text-gray-600 dark:text-white ${
                !open && "hidden"
              }`}
            >
              <small>Menu</small>
            </p>

            {role === "user" &&
              usernavlinks.map((menuitem, index) => (
                <li key={index} className="mb-2">
                  <NavLink
                    to={menuitem.to}
                    className={({ isActive }) =>
                      `flex ${
                        isActive ? "bg-rose-600 text-white" : "text-black"
                      } duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4 dark:text-white `
                    }
                  >
                    {menuitem.icon}
                    <span
                      className={`${
                        !open && "hidden"
                      } origin-left duration-300 ml-2`}
                    >
                      {menuitem.label}
                    </span>
                  </NavLink>
                </li>
              ))}
            <li className="mb-2">
              <button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                className={`flex text-black duration-300 rounded-md p-2 cursor-pointer items-center font-bold text-sm hover:bg-secondary hover:text-white gap-x-4 dark:text-white`}
              >
                <BiLogOut className="text-2xl" />
                <span
                  className={`${
                    !open && "hidden"
                  } origin-left duration-300 ml-2`}
                >
                  Logout
                </span>
              </button>
            </li>
          </ul>
        )}
      </div>

      <div className="h-screen overflow-y-auto px-6 flex-1">
        <UseScroll />
        <Outlet />
      </div>
    </div>
  );
};
