import React from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";
import { useEffect, useState } from "react";

export const ApprovedClasses = () => {
  const { currentuser } = UseUser();
  const axiosSecure = UseAxiosSecure();
  const [instructorclasses, setinstructorclasses] = useState([]);

  useEffect(() => {
    const fetchclasses = async () => {
      try {
        const response = await axiosSecure.get(`/approved-classes`);
        //  console.log(response.data);
        setinstructorclasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchclasses();
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="my-10 mt-20">
        <h1 className="font-bold text-center text-4xl">
          My <span className="text-secondary">Approved</span> Classes
        </h1>
      </div>

      <div className="hidden lg:grid grid-cols-4 gap-x-2 mb-10 text-center">
        <div className="font-bold text-2xl">#</div>
        <div className="font-bold text-2xl">Class Name</div>
        <div className="font-bold text-2xl">Status</div>
        <div className="font-bold text-2xl">Submitted</div>
      </div>

      {instructorclasses.map((item, index) => (
        <div
          key={item._id}
          className="grid grid-cols-1 py-5 md:grid-cols-2 lg:grid-cols-4 gap-x-2 gap-y-2 text-center shadow-sm "
        >
          <div className="font-semibold text-lg">{index + 1}</div>
          <div className="flex items-center justify-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-10 object-cover mr-3"
            />
            <p className="font-semibold text-lg">{item.name}</p>
          </div>
          <div className="font-semibold text-lg text-secondary md:mt-5 lg:mt-0">
            {item.status}
          </div>
          <div className="font-semibold text-lg md:mt-5 lg:mt-0">
            {new Date(item.submitted).toLocaleDateString()}
          </div>
        </div>
      ))}
    </div>
  );
};
