import React, { useEffect, useState } from "react";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";

export const AdminHome = () => {
  const axiosSecure = UseAxiosSecure();
  const [userlength, setuserlength] = useState(0);
  const [instructorslength, setinstructorslength] = useState(0);
  const [approvedclasslength, setapprovedclasslength] = useState(0);
  const [pendingclasseslength, setpendingclasseslength] = useState(0);

  useEffect(() => {
    fetchUsers();
    fetchInstructors();
    fetchApprovedClasses();
    fetchPendingClasses();
  }, []);

  const fetchUsers = async () => {
    await axiosSecure
      .get("/users")
      .then((response) => {
        // console.log(response.data);
        setuserlength(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchInstructors = async () => {
    await axiosSecure
      .get("/users")
      .then((response) => {
        const arr = response.data;
        if (Array.isArray(arr)) {
          const filtered = arr.filter((item) => item.role === "instructor");
          setinstructorslength(filtered.length);
        } else {
          console.error("Response data is not an array");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApprovedClasses = async () => {
    await axiosSecure
      .get("/approved-classes")
      .then((response) => {
        // console.log(response.data);
        setapprovedclasslength(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchPendingClasses = async () => {
    await axiosSecure
      .get("/pending-classes")
      .then((response) => {
        setpendingclasseslength(response.data.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="my-10 mt-20">
        <h1 className="font-bold text-3xl text-center">
          Welcome to <span className="text-secondary">Admin</span> Panel
        </h1>
      </div>

      <div className="lg:flex dark:text-black">
        <div className="bg-gray-200 p-4 m-4 rounded-lg">
          <h1 className="font-bold text-2xl text-center">Total Users</h1>
          <h1 className="font-bold text-2xl text-center">{userlength}</h1>
        </div>
        <div className=" bg-gray-200 p-4 m-4 rounded-lg">
          <h1 className="font-bold text-2xl text-center">Total Instructors</h1>
          <h1 className="font-bold text-2xl text-center">
            {instructorslength}
          </h1>
        </div>
        <div className=" bg-gray-200 p-4 m-4 rounded-lg">
          <h1 className="font-bold text-2xl text-center">
            Total Approved Classes
          </h1>
          <h1 className="font-bold text-2xl text-center">
            {approvedclasslength}
          </h1>
        </div>
        <div className=" bg-gray-200 p-4 m-4 rounded-lg">
          <h1 className="font-bold text-2xl text-center">
            Total Pending Classes
          </h1>
          <h1 className="font-bold text-2xl text-center">
            {pendingclasseslength}
          </h1>
        </div>
      </div>
    </div>
  );
};
