import React, { useEffect, useState } from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";

export const InstructorClass = () => {
  const { currentuser } = UseUser();
  const axiosSecure = UseAxiosSecure();
  const [instructorclasses, setinstructorclasses] = useState([]);

  useEffect(() => {
    const fetchclasses = async () => {
      try {
        const response = await axiosSecure.get(
          `/classes/${currentuser?.[0]?.email}`
        );
        console.log(response.data);
        setinstructorclasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchclasses();
  }, []);
  return (
    <div>
      <div className="my-10 mt-20">
        <h1 className="font-bold text-4xl text-center ">My Classes</h1>
      </div>

      {instructorclasses.length === 0 ? (
        <h1 className="font-bold text-4xl text-center my-3">
          {" "}
          Classes Not Found
        </h1>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
          {instructorclasses.map((item) => (
            <div key={item._id}>
              <div class="max-w-sm rounded  shadow-lg">
                <img class="w-full h-60" src={item.image} alt={item.name} />
                <div class="px-6 py-4">
                  <div class="font-bold text-xl mb-2">{item.name}</div>
                  <div>
                    <p class="text-gray-700 text-base h-40">
                      {item.description}
                    </p>
                  </div>
                </div>
                <div class="px-4 py-2">
                  <span
                    class={`inline-block px-4 py-2 bg-gray-200 rounded-full text-xl font-bold ${
                      item.status === "pending"
                        ? "text-rose-700"
                        : "text-secondary"
                    } `}
                  >
                    {item.status}....
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
