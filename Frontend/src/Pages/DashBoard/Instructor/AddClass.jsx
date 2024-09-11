import React, { useState } from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";

export const AddClass = () => {
  const { currentuser } = UseUser();
  const AxiosSecure = UseAxiosSecure();
  const [imageUrl, setImageUrl] = useState("");

  const handleimagechange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    // Replace 'YOUR_IMGBB_API_KEY' with your actual ImgBB API key
    const apiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const imgbbUrl = `https://api.imgbb.com/1/upload?key=${apiKey}`;

    try {
      const response = await fetch(imgbbUrl, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      if (result.success) {
        setImageUrl(result.data.url);
        console.log("Image uploaded successfully:", result.data.url);
      } else {
        console.error("Image upload failed:", result.error.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleaddclass = (e) => {
    e.preventDefault();
    const classdata = {
      name: e.target.name.value,
      image: imageUrl, // Use the uploaded image URL
      instructorName: e.target.instructorName.value,
      instructorEmail: e.target.instructorEmail.value,
      availableSeats: e.target.availableSeats.value,
      price: e.target.price.value,
      videoLink: e.target.videoLink.value,
      description: e.target.description.value,
      submitted: new Date(),
      status: "pending",
      totalEnrolled: 0,
    };

    const formfieldsclear = () => {
      e.target.name.value = "";
      e.target.instructorName.value = "";
      e.target.instructorEmail.value = "";
      e.target.availableSeats.value = "";
      e.target.price.value = "";
      e.target.videoLink.value = "";
      e.target.description.value = "";
    };

    AxiosSecure.post("/newclass", classdata)
      .then((res) => {
        // form fields are empty
        formfieldsclear();
        return alert("Class Added Succesfully");
      })
      .catch((err) => {
        return alert("Error Adding Class");
      });
  };

  return (
    <div>
      <div className="my-10 mt-20">
        <h1 className="text-4xl font-bold text-center">Add Class</h1>
      </div>

      <form
        onSubmit={handleaddclass}
        className="mx-auto p-6 bg-white rounded shadow"
      >
        <div className="lg:grid grid-cols-2 w-full gap-2 my-2">
          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="name"
            >
              Class Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              placeholder="Your class name"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>
          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="image"
            >
              Class Thumbnail
            </label>
            <input
              type="file"
              name="image"
              onChange={handleimagechange}
              required
              className="w-full px-4 py-1 file:mb-[2px] border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>
        </div>
        <div>
          <h1 className="my-2 ml-2 text-gray-700 text-sm">
            You cannot change your name and email
          </h1>
          <div className="lg:grid grid-cols-2 w-full gap-2 my-2">
            <div className="mb-2">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="name"
              >
                Instructor Name
              </label>
              <input
                type="text"
                name="instructorName"
                readOnly
                disabled
                value={currentuser?.[0]?.name}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
              />
            </div>
            <div className="mb-2">
              <label
                className="block text-gray-500 font-bold mb-2"
                htmlFor="email"
              >
                Instructor Email
              </label>
              <input
                type="text"
                name="instructorEmail"
                readOnly
                disabled
                value={currentuser?.[0]?.email}
                className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
              />
            </div>
          </div>
        </div>

        <div className="lg:grid grid-cols-2 w-full gap-2 my-2">
          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="availableSeats"
            >
              Available Seats
            </label>
            <input
              type="number"
              name="availableSeats"
              required
              placeholder="How many seats are available"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>
          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              required
              placeholder="How much does it cost?"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>

          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="videoLink"
            >
              Link
            </label>
            <input
              type="text"
              name="videoLink"
              required
              placeholder="Link for Resource"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>

          <div className="mb-2">
            <label
              className="block  text-gray-500 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              type="text"
              name="description"
              required
              placeholder="Write something about your class"
              className="w-full px-4 py-2 border border-secondary rounded-md focus:outline-none focus:ring-secondary"
            />
          </div>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-secondary px-10 py-3 font-bold text-lg rounded text-white"
          >
            Add Class
          </button>
        </div>
      </form>
    </div>
  );
};
