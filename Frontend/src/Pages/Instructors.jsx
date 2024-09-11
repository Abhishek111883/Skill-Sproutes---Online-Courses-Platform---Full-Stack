import React, { useEffect, useState } from "react";
import { UseAxiosFetch } from "../Components/Hooks/UseAxiosFetch";
import { InstructorItem } from "../Components/PouplarInstructors/InstructorItem";

export const Instructors = () => {
  const [Instructors, SetInstructors] = useState([]);
  const axiosFetch = UseAxiosFetch();

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axiosFetch.get("/instructors");
        SetInstructors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchInstructors();
  }, []);
  return (
    <div className="md:w-[90%] mx-auto my-10 dark:bg-darkmodegrey ">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center dark:text-white ">
          {" "}
          Our <span className="text-secondary">Amazing</span> Instructors
        </h1>
        <hr className="w-80 h-1 mx-auto bg-secondary border-0 rounded md:my-3 "></hr>
      </div>

      <div className="grid pl-5 pr-5 md:grid-cols-3 gap-6 m-7 ">
        {Instructors.map((item, index) => (
          <InstructorItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
