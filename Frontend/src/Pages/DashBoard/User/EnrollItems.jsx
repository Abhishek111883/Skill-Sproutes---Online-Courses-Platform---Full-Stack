import React, { useEffect } from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";
import { GridLoader } from "react-spinners";
import { useState } from "react";

export const EnrollItems = () => {
  const { currentuser, isLoading } = UseUser();
  const axiosSecure = UseAxiosSecure();
  const [enrolledClasses, setEnrolledClasses] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/enrolled-classes/${currentuser?.[0]?.email}`)
      .then((res) => {
        console.log(res);
        setEnrolledClasses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentuser?.[0]?.email]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="text-center mt-10 mb-8">
        <h1 className="font-bold text-4xl"> My Enrolled Class</h1>
      </div>

      {enrolledClasses.length === 0 ? (
        <h1 className="font-semibold text-4xl text-center my-40">
          {" "}
          Not Found Enrolled classes....
        </h1>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {enrolledClasses.map((item, index) => (
            <div
              key={index}
              className="max-w-sm rounded overflow-hidden shadow-lg"
            >
              <img className="w-full h-64" src={item.classes.image} />
              <div className="px-6 py-4 h-44">
                <div className="font-bold text-xl mb-2">
                  {item.classes.name}
                </div>
                <p className="text-gray-700 dark:text-darktext text-base">
                  {item.classes.description}
                </p>
              </div>
              <div className="pt-4 text-center mb-5">
                <button className="p-2 px-8 bg-secondary text-center font-bold text-white rounded-md">
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
