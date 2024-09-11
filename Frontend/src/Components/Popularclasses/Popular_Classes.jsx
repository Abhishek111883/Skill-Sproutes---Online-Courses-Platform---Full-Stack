import React, { useEffect, useState } from "react";
import { UseAxiosFetch } from "../Hooks/UseAxiosFetch";
import { Item } from "./Item";

export const Popular_Classes = () => {
  const axiosFetch = UseAxiosFetch();
  const [Classes, SetClasses] = useState([]);

  useEffect(() => {
    const fetchclasses = async () => {
      try {
        const response = await axiosFetch.get("/classes");
        SetClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchclasses();
  }, []);

  return (
    <div className="md:w-[90%] mx-auto my-10 ">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center dark:text-white ">
          {" "}
          Our <span className="text-secondary">Popular</span> Classes
        </h1>
        <hr className="w-80 h-1 mx-auto bg-secondary border-0 rounded md:my-3 "></hr>
      </div>

      <div className="grid pl-5 pr-5 sm:grid-cols-2 md:grid-cols-3 gap-6 m-7 ">
        {Classes.slice(0, 6).map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
