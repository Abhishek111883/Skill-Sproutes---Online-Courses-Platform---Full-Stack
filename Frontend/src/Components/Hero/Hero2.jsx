import React from "react";
import banner2 from "../../assets/home/banner2.jpg";

export const Hero2 = () => {
  return (
    <div
      className="min-h-screen bg-cover"
      style={{ backgroundImage: `url(${banner2})` }}
    >
      <div className="min-h-screen flex justify-end items-center lg:pr-20 pl-20 bg-black bg-opacity-50">
        <div className="text-white">
          <h1 className="md:text-5xl text-3xl font-bold">
            Affordable, High-Quality Education
          </h1>
          <p className="md:text-3xl text-2xl ">
            Sign Up Today for a Brighter Tomorrow
          </p>
          <button className="bg-secondary text-white px-4 py-2 rounded-lg mt-4">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
