import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const ClassesItem = ({ item, handleaddtocart, role }) => {
  const {
    _id,
    name,
    image,
    price,
    totalEnrolled,
    availableSeats,
    instructorName,
  } = item;

  const checklogin = () => {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      toast.error("Please login to view class");
      return false;
    }
  };
  return (
    <div className="border-secondary shadow-xl flex flex-col justify-between rounded-lg p-6 border hover:-translate-y-2 transition-all duration-300 dark:shadow-black">
      <img src={image} className="rounded-lg aspect-video " />
      <h1 className="text-2xl font-bold text-center my-5 dark:text-white">
        {name}
      </h1>
      <p className="text-gray-500 mb-2 font-semibold ml-2 md:ml-0 dark:text-white">
        Instructor : {instructorName}
      </p>

      <div className="md:flex justify-between">
        <p className="text-gray-500 mb-2 font-semibold ml-2 md:ml-0 dark:text-white">
          Available Seats : {availableSeats}
        </p>
        <p className="text-secondary mb-2 font-bold ml-2 md:ml-0 ">${price}</p>
      </div>

      <div className="md:flex justify-evenly">
        <div>
          <Link
            to={`/class/${_id}`}
            onClick={(e) => {
              if (!checklogin()) e.preventDefault(); // Prevent navigation if not logged in
            }}
            className="text-center"
          >
            <button className="bg-secondary w-full md:w-36 text-white font-semibold p-2 rounded-lg mt-2">
              VIEW
            </button>
          </Link>
        </div>
        <div>
          <button
            onClick={() => {
              handleaddtocart(_id);
            }}
            title={
              role === "admin" || role === "instructor"
                ? "Instructor/Admin not able to add to cart"
                  ? availableSeats < 1
                  : "Seats not available"
                : "You can add classes"
            }
            disabled={
              role === "admin" || role === "instructor" || availableSeats < 1
            }
            className="bg-secondary w-full md:w-36 text-white font-semibold p-2 rounded-lg mt-2"
          >
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};
