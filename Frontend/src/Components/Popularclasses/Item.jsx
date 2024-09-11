import React from "react";
import { Link } from "react-router-dom";

export const Item = ({ item }) => {
  // console.log(item);
  const { _id, name, image, price, totalEnrolled, availableSeats } = item;
  return (
    <div className="border-secondary shadow-xl flex flex-col justify-between rounded-lg p-6 border dark:shadow-black">
      <img src={image} className="rounded-lg aspect-video " />
      <h1 className="text-2xl font-bold text-center my-5 dark:text-white">
        {name}
      </h1>
      <p className="text-gray-500 mb-2 font-semibold ml-2 dark:text-white">
        Price : {price}
      </p>
      <p className="text-gray-500 mb-2 font-semibold ml-2 dark:text-white">
        Available Seats : {availableSeats}
      </p>
      <p className="text-gray-500 mb-2 font-semibold ml-2 dark:text-white">
        Total Students : {totalEnrolled}
      </p>

      <Link to={`/class/${_id}`} className="text-center">
        <button className="bg-secondary w-full text-white font-semibold p-2 rounded-lg mt-2">
          ADD TO CART
        </button>
      </Link>
    </div>
  );
};
