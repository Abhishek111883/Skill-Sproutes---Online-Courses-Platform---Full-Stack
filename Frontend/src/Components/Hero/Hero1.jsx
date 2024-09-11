import React from "react";
import banner1 from "../../assets/home/banner1.jpg";

export const Hero1 = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-black"
      style={{ backgroundImage: `url(${banner1})` }}
    >
      <div className="min-h-screen flex justify-end items-center lg:pr-40 sm:pl-11 bg-black bg-opacity-50">
        <div className="text-white">
          <h1 className="md:text-5xl text-3xl font-bold">
            Learn Anytime, Anywhere
          </h1>
          <p className="md:text-3xl text-2xl">
            Learn from the comfort of your home
          </p>
          <button className="bg-secondary text-white px-4 py-2 rounded-lg mt-4">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};
