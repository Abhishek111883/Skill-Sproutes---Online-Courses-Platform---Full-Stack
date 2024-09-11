import React from "react";

export const InstructorItem = ({ item }) => {
  const { photoUrl, name, role, about, skills } = item;

  return (
    <div className="border-secondary shadow-xl flex flex-col items-center  rounded-lg p-6 border dark:shadow-black hover:scale-110 duration-300 scroll-smooth">
      <img src={photoUrl} className=" rounded-full w-32 h-32 mx-auto" />
      <h1 className="text-2xl font-bold text-center my-5 dark:text-white">
        {name}
      </h1>
      <p className="text-gray-500 mb-2 font-semibold ml-2 dark:text-white">
        {role}
      </p>
      <p className="text-gray-500 mb-2 font-semibold ml-2  dark:text-white">
        {about}
      </p>
    </div>
  );
};
