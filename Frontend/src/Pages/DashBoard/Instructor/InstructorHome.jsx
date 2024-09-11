import React from "react";
import { Link } from "react-router-dom";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { GridLoader } from "react-spinners";

export const InstructorHome = () => {
  const { currentuser, isLoading } = UseUser();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />;
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div>
        <img
          src="/welcome.jpg"
          alt=""
          className="h-[300px] mix-blend-multiply"
          placeholder="blur"
        />
      </div>
      <div>
        <h1 className="text-3xl capitalize font-bold">
          Hi, <span className="text-secondary">{currentuser?.[0]?.name}!</span>{" "}
          welcome to SkillSprouts Dashboard
        </h1>
      </div>
    </div>
  );
};
