import React, { useContext } from "react";
import { UseAxiosFetch } from "../../Components/Hooks/UseAxiosFetch";
// import { Item } from "../../Components/Popularclasses/Item";
import { useEffect, useState } from "react";
import { ClassesItem } from "./ClassesItem";
import { UseUser } from "../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../Components/Hooks/UseAxiosSecure";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Classes = () => {
  const axiosFetch = UseAxiosFetch();
  const [Classes, SetClasses] = useState([]);
  const [EnrolledClasses, SetEnrolledClasses] = useState([]);
  const { currentuser } = UseUser();
  const role = currentuser?.[0]?.role;
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    const fetchclasses = async () => {
      try {
        const response = await axiosFetch.get("/approved-classes");
        SetClasses(response.data);
        console.log(currentuser?.[0]?.role);
      } catch (error) {
        console.error(error);
      }
    };
    fetchclasses();
  }, []);

  const handleaddtocart = async (id) => {
    if (!currentuser) {
      return toast.error("Please Login !");
    }

    try {
      // Fetch enrolled classes first
      const enrolledClassesResponse = await axiosSecure.get(
        `/enrolled-classes/${currentuser[0]?.email}`
      );
      const enrolledClasses = enrolledClassesResponse.data;
      console.log(enrolledClasses);

      // Check if user is already enrolled in the class
      if (enrolledClasses.find((item) => item.classId === id)) {
        return toast.error("You are already enrolled in this class");
      }

      // Check if the class is already in the cart
      const cartItemsResponse = await axiosSecure
        .get(`/cart-item/${id}?email=${currentuser[0]?.email}`)
        .then((res) => {
          if (res.data.classId === id) {
            return toast.error("Class is already in your cart");
          } else if (enrolledClasses.find((item) => item.classes._id === id)) {
            return toast.error("You are already enrolled in this class");
          } else {
            // If not enrolled and not in the cart, add to cart
            const data = {
              classId: id,
              email: currentuser[0]?.email,
              date: new Date(),
            };

            toast.promise(axiosSecure.post("/add-to-cart", data), {
              pending: {
                render() {
                  return "Adding to Cart...";
                },
              },
              success: "Added Successfully",
              error: {
                render({ data }) {
                  return `Error: ${data.message}`;
                },
              },
            });
          }
        });
    } catch (error) {
      console.error("Error in handleaddtocart:", error);
      if (error.response?.status === 401) {
        toast.error("Unauthorized Access. Please log in again.");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="md:w-[90%] mx-auto my-10 ">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-center dark:text-white ">
            Classes
          </h1>
          <hr className="w-80 h-1 mx-auto bg-secondary border-0 rounded md:my-3 "></hr>
        </div>

        <div className="grid pl-5 pr-5 sm:grid-cols-2 md:grid-cols-3 gap-6 m-7 ">
          {Classes.map((item, index) => (
            <ClassesItem
              key={index}
              item={item}
              handleaddtocart={handleaddtocart}
              role={role}
            />
          ))}
        </div>
      </div>
    </>
  );
};
