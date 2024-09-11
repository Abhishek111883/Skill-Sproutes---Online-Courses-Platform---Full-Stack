import React, { useEffect } from "react";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";
import Switch from "react-switch";

export const MangeClasses = () => {
  const axiosSecure = UseAxiosSecure();
  const [classes, setClasses] = React.useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axiosSecure.get("/classes");
        console.log(response.data);
        setClasses(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchClasses();
  }, []);

  const handlestatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "approved" ? "pending" : "approved";
      await axiosSecure.patch(`/change-status/${id}`, {
        status: newStatus,
      });
      // Update the local state to reflect the change
      setClasses((prevClasses) =>
        prevClasses.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-3xl text-center my-10 mt-20 font-bold">
          Manage <span className="text-secondary">Classes</span>
        </h1>
      </div>

      <div className="md:flex lg:flex items-start justify-center gap-3 p-2 mb-5">
        <div className=" w-10 font-bold text-xl mr-3 lg:mb-0 mb-3">#</div>
        <div className=" w-96 font-bold text-xl lg:mb-0 mb-3">ClassName</div>
        <div className=" w-64 font-bold text-xl lg:mb-0 mb-3">Instructor</div>
        {/* <div className=" w-36 font-bold text-xl lg:mb-0 mb-3">Role</div> */}
        <div className=" w-72 font-bold text-xl lg:mb-0 mb-3">
          Pending/Approved
        </div>
      </div>

      {classes.map((item, index) => (
        <div
          key={item._id}
          className="md:flex lg:flex items-start justify-center gap-3 p-2"
        >
          <div className="w-10 font-semibold text-base mr-3 lg:mb-0 mb-3">
            {index + 1}
          </div>
          <div className=" w-96 font-semibold text-base lg:mb-0 mb-3">
            {item.name}
          </div>
          <div className="w-64 font-semibold text-base lg:mb-0 mb-3">
            {item.instructorName}
          </div>
          <div className="w-72 font-semibold text-base lg:mb-0 mb-3">
            <Switch
              checked={item.status === "approved"}
              onChange={() => {
                handlestatus(item._id, item.status);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
