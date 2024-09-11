import React, { useEffect, useState } from "react";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";

export const MangeUser = () => {
  const axiosSecure = UseAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosSecure.get("/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handledelete = async (id) => {
    try {
      await axiosSecure.delete(`/delete-user/${id}`);
      setUsers(users.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="my-10 mt-20">
        <h1 className="font-bold text-3xl text-center">
          {" "}
          <span className="text-secondary">Manage </span>Users
        </h1>
      </div>

      <div className="md:flex lg:flex items-start justify-center gap-3 p-2">
        <div className=" w-10 font-bold text-xl mr-3 lg:mb-0 mb-3">#</div>
        <div className=" w-72 font-bold text-xl lg:mb-0 mb-3">Name</div>
        <div className=" w-96 font-bold text-xl lg:mb-0 mb-3">Email</div>
        <div className=" w-36 font-bold text-xl lg:mb-0 mb-3">Role</div>
        <div className=" w-72 font-bold text-xl lg:mb-0 mb-3">Action</div>
      </div>

      {users.map((item, index) => (
        <div
          key={item._id}
          className="md:flex lg:flex items-start justify-center gap-3 p-2"
        >
          <div className="w-10 font-semibold text-base mr-6 lg:mb-0 mb-3">
            {index + 1}
          </div>
          <div className=" w-72 font-semibold text-base lg:mb-0 mb-3">
            {item.name}
          </div>
          <div className="w-96 font-semibold text-base lg:mb-0 mb-3">
            {item.email}
          </div>
          <div className="w-36 font-semibold text-base lg:mb-0 mb-3">
            {item.role}
          </div>
          <div className="w-72 font-semibold text-base lg:mb-0 mb-3 flex gap-2">
            {/* <div>
              <button className="bg-secondary text-white p-2 rounded-lg">
                Edit
              </button>
            </div> */}
            <div>
              <button
                onClick={() => {
                  handledelete(item._id);
                }}
                className="bg-rose-700 text-white p-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
