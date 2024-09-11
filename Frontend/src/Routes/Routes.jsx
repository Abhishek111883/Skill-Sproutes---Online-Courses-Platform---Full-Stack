import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import { Home } from "../Pages/Home";
import { Instructors } from "../Pages/Instructors";
import { Classes } from "../Pages/Classes/Classes";
import { Login } from "../Pages/Login";
import { Register } from "../Pages/Register";
import { Dashboard } from "../Pages/DashBoard/Dashboard";
import { SingleClass } from "../Pages/Classes/SingleClass";
import { DashBoardLayout } from "../Layout/DashBoardLayout";
import { UserHome } from "../Pages/DashBoard/User/UserHome";
import { InstructorHome } from "../Pages/DashBoard/Instructor/InstructorHome";
import { AdminHome } from "../Pages/DashBoard/Admin/AdminHome";
import { EnrollItems } from "../Pages/DashBoard/User/EnrollItems";
import { SelectedItems } from "../Pages/DashBoard/User/SelectedItems";
import { PaymentHistory } from "../Pages/DashBoard/User/Payment/PaymentHistory";
import { ApplyforInstructor } from "../Pages/DashBoard/User/ApplyforInstructor";
import { MakePayment } from "../Pages/DashBoard/User/Payment/MakePayment";
import { AddClass } from "../Pages/DashBoard/Instructor/AddClass";
import { InstructorClass } from "../Pages/DashBoard/Instructor/InstructorClass";
import { PendingClasses } from "../Pages/DashBoard/Instructor/PendingClasses";
import { ApprovedClasses } from "../Pages/DashBoard/Instructor/ApprovedClasses";
import { MangeUser } from "../Pages/DashBoard/Admin/ManageUser";
import { MangeClasses } from "../Pages/DashBoard/Admin/ManageClasses";
import { ManageApplications } from "../Pages/DashBoard/Admin/ManageApplications";

const Routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "instructors",
        element: <Instructors />,
      },
      {
        path: "classes",
        element: <Classes />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/class/:id",
        element: <SingleClass />,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/class/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashBoardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "user-cp",
        element: <UserHome />,
      },
      {
        path: "enrolled-class",
        element: <EnrollItems />,
      },
      {
        path: "my-selected",
        element: <SelectedItems />,
      },
      {
        path: "my-payments",
        element: <PaymentHistory />,
      },
      {
        path: "apply-instructor",
        element: <ApplyforInstructor />,
      },
      {
        path: "user/payment",
        element: <MakePayment />,
      },
      {
        path: "instructor-cp",
        element: <InstructorHome />,
      },
      {
        path: "add-class",
        element: <AddClass />,
      },
      {
        path: "my-classes",
        element: <InstructorClass />,
      },
      {
        path: "my-pending",
        element: <PendingClasses />,
      },
      {
        path: "my-approved",
        element: <ApprovedClasses />,
      },
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "manage-users",
        element: <MangeUser />,
      },
      {
        path: "manage-classes",
        element: <MangeClasses />,
      },
      {
        path: "manage-applications",
        element: <ManageApplications />,
      },
    ],
  },
]);

export default Routes;
