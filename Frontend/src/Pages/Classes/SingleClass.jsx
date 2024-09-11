import React from "react";
import { useLoaderData } from "react-router-dom";

export const SingleClass = () => {
  const course = useLoaderData();
  console.log("Course:", course);

  return (
    <div className="max-w-[90%] mx-auto my-10 dark:text-white">
      <h1 className="text-3xl font-bold text-center mb-8">{course.name}</h1>

      <div className="max-w-[85%] mx-auto flex flex-wrap lg:flex-nowrap gap-1">
        {/* Left Side - 75% width */}
        <div className="lg:w-[65%] w-full p-5  rounded-md">
          <img
            src={course.image}
            alt={course.name}
            className="w-full h-auto rounded-md mb-5"
          />
          <h2 className="text-xl font-semibold mb-2">
            Instructor: {course.instructorName}
          </h2>
          <p className="text-gray-600 mb-4 dark:text-amber-100">
            {course.description}
          </p>
          <p className="mb-2">
            <strong>Status:</strong> {course.status}
          </p>
          <p className="mb-2">
            <strong>Available Seats:</strong> {course.availableSeats}
          </p>
          <p className="mb-2">
            <strong>Total Enrolled:</strong> {course.totalEnrolled}
          </p>
        </div>

        {/* Right Side - 25% width */}
        <div className="lg:w-[35%] w-full p-5  rounded-md">
          <div className="mb-4">
            <img
              src={course.image}
              alt={course.name}
              className="w-full h-auto rounded-md"
            />
          </div>
          <p className="text-lg font-bold mb-2 flex justify-between ">
            Price: <span className="text-secondary">${course.price}</span>
          </p>
          <p className="mb-2 flex justify-between">
            <strong>Instructor Email:</strong> {course.instructorEmail}
          </p>
          <p className="mb-2 flex  justify-between ">
            <strong>Course Level:</strong> Beginner
          </p>
          <p className="mb-2 flex justify-between">
            <strong>Language:</strong> English
          </p>
          <p className="mb-4 flex justify-between">
            <strong>Duration:</strong> 10 weeks
          </p>
          <div className="flex  justify-center">
            <button className="bg-secondary w-full p-2 font-bold rounded-lg">
              Enroll now{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
