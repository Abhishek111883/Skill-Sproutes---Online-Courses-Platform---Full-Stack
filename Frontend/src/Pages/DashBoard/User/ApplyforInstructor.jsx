import React, { useState } from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosFetch } from "../../../Components/Hooks/UseAxiosFetch";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";

export const ApplyforInstructor = () => {
  // State to manage form input and application status
  const [experience, setExperience] = useState("");
  const [hasApplied, setHasApplied] = useState(false); // Assuming we track if user has already applied
  const { currentuser } = UseUser();
  const axiosSecure = UseAxiosSecure();
  const name = currentuser?.[0]?.name;
  const email = currentuser?.[0]?.email;

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      experience,
    };

    try {
      // Make a POST request to the API to submit the application
      await axiosSecure
        .post("/as-instructor", data)
        .then((res) => {
          console.log(res.data);
          setHasApplied(true);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Apply for Instructor</h1>

      <form
        onSubmit={handleSubmit}
        className=" shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        {/* <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your email"
            required
          />
        </div> */}

        <div className="mb-4">
          <label className="block text-gray-700 dark:text-darktext text-sm font-bold mb-2">
            Experience
          </label>
          <textarea
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Describe your experience"
            rows="4"
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={hasApplied}
            className={`bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
              hasApplied ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {hasApplied ? "Already Applied" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};
