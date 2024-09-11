import React from "react";
import img1 from "../../assets/gallary/image1.jpg";
import img2 from "../../assets/gallary/image2.jpg";
import img3 from "../../assets/gallary/image3.jpg";
import img4 from "../../assets/gallary/image4.jpg";
import img5 from "../../assets/gallary/image5.jpg";
import img6 from "../../assets/gallary/image6.jpg";
import img7 from "../../assets/gallary/image7.jpg";

export const Gallery = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];

  return (
    <div className="md:w-[90%] mx-auto my-10 dark:bg-darkmodegrey">
      <div className="mb-10">
        <h1 className="text-5xl font-bold text-center text-secondary ">
          Gallery
        </h1>
        <hr className="w-[200px] h-1 mx-auto bg-secondary border-0 rounded md:my-3"></hr>
      </div>

      <div className="mb-50">
        <div className="grid grid-cols-1 pl-5 pr-5 sm:grid-cols-2 sm:pl-5 sm:pr-5 md:grid-cols-3 auto-rows-[300px] gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`rounded-xl overflow-hidden ${
                index === 3 || index === 6 ? "md:col-span-2" : ""
              }`}
            >
              <img
                src={image}
                alt="gallery"
                className="w-full h-full object-cover rounded-2xl cursor-pointer hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
