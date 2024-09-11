import React, { useEffect, useState } from "react";
import { UseUser } from "../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../Components/Hooks/UseAxiosSecure";
import { GridLoader } from "react-spinners";
import moment from "moment";
import { MdDeleteSweep } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export const SelectedItems = () => {
  const { currentuser, isLoading } = UseUser();
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  const axiosSecure = UseAxiosSecure();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />;
      </div>
    );
  }

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentuser?.[0]?.email}`)
      .then((result) => {
        setSelectedItems(result.data);
        const total = result.data.reduce(
          (acc, item) => acc + parseFloat(item.price || 0),
          0
        );
        setTotalCost(total);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handledelete = (id) => {
    axiosSecure
      .delete(`/delete-cart-item/${id}`)
      .then(() => {
        const updatedItems = selectedItems.filter((item) => item._id !== id);
        setSelectedItems(updatedItems);
        const total = updatedItems.reduce(
          (acc, item) => acc + parseFloat(item.price || 0),
          0
        );
        setTotalCost(total);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlepay = (id) => {
    const items = selectedItems.find((item) => item._id === id);
    const price = items.price;
    navigate("/dashboard/user/payment", {
      state: { price: price, itemId: id },
    });
  };

  const gst = parseFloat((0.18 * totalCost).toFixed(2));
  const finalPayout = parseFloat((totalCost + gst).toFixed(2));

  return (
    <div>
      <div className="text-center mt-10 mb-8">
        <h1 className="text-4xl font-bold">Selected Classes</h1>
      </div>

      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold mb-4">Classes List:</h2>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="lg:w-3/4">
              <div className="rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left px-2 font-semibold">#</th>
                      <th className="text-left px-2 font-semibold">Product</th>
                      <th className="text-left px-2 font-semibold">Price</th>
                      <th className="text-left px-2 font-semibold">Date</th>
                      <th className="text-left px-2 font-semibold">Pay</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedItems.length === 0 ? (
                      <tr>
                        <td className="text-2xl font-bold">No classes found</td>
                      </tr>
                    ) : (
                      selectedItems.map((item, index) => (
                        <tr key={index}>
                          <td className="py-4 px-2">{index + 1}</td>
                          <td className="py-4 px-2">
                            <div className="flex items-center">
                              <img
                                src={item.image}
                                alt=""
                                className="w-10 h-10"
                              />
                              <span className="ml-2">{item.name}</span>
                            </div>
                          </td>
                          <td className="py-4 px-2">${item.price}</td>
                          <td className="py-4 px-2">
                            {moment(item.submitted).format("MMMM Do YY")}
                          </td>
                          <td className="flex py-5 gap-2">
                            <button
                              onClick={() => {
                                handledelete(item._id);
                              }}
                              className="px-3 py-1 cursor-pointer bg-red rounded-3xl text-white font-bold"
                            >
                              <MdDeleteSweep />
                            </button>
                            <button
                              onClick={() => {
                                handlepay(item._id);
                              }}
                              className="px-3 py-1 cursor-pointer bg-emerald-600 rounded-3xl text-white font-bold flex items-center"
                            >
                              <FiDollarSign className="mr-2" />
                              Pay
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="lg:w-1/4">
              <div className="right-3 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Checkout Summary</h3>
                <p className="mb-2">Total Cost: ${totalCost.toFixed(2)}</p>
                <p className="mb-4">GST (18%): ${gst.toFixed(2)}</p>
                <p className="mb-4 font-bold">
                  <hr />
                  Final Payout: ${finalPayout.toFixed(2)}
                </p>
                <button
                  disabled={finalPayout <= 0}
                  onClick={() => {
                    navigate("/dashboard/user/payment", {
                      state: {
                        price: finalPayout,
                        itemId: null,
                      },
                    });
                  }}
                  className="w-full bg-emerald-600 text-white py-2 rounded-3xl font-bold"
                >
                  Proceed to Pay ${finalPayout.toFixed(2)}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
