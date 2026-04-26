import React from "react";
import { useLoaderData } from "react-router-dom";

export const Resource = () => {
  const course = useLoaderData();
  console.log("Course:", course);
  return (
    <div>
      <div className="text-center mt-10 mb-8">
        <h1 className="text-4xl font-bold">Course Resources</h1>
      </div>

      <div className="py-16 h-screen">
        <div className="text-center text-4xl font-bold">
          <span>
            Video Link :{" "}
            <a
              href={`${course.videoLink}`}
              target="_blank"
              className="text-red"
            >
              Click Here
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};
