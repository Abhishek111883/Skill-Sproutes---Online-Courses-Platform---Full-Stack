import React from "react";

export const SubscribeBox = () => {
  return (
    <div className=" h-44 md:h-80 flex items-start justify-center">
      <div className="flex flex-col  items-center justify-center mt-5 md:mt-10">
        <h1 className="text-4xl font-bold mb-3 md:mb-6 dark:text-white">
          <span className="text-secondary">Subscribe</span> to our newsletter
        </h1>
        <p className="text-2xl font-semibold mb-3 md:mb-10 dark:text-white">
          Get the <span className="text-secondary">latest</span> news and
          updates
        </p>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Enter your email"
            className=" p-2 md:p-4 w-60 md:w-96 rounded-2xl focus:outline-none focus:outline-secondary placeholder:font-bold font-bold "
          />
          <button className="bg-secondary font-bold text-white p-2 md:p-4 ml-3 rounded-2xl ">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};
