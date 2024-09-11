import React, { useState, useEffect } from "react";
import { UseUser } from "../../../../Components/Hooks/UseUser";
import { UseAxiosSecure } from "../../../../Components/Hooks/UseAxiosSecure";
import { GridLoader } from "react-spinners";

export const PaymentHistory = () => {
  const { currentuser, isLoading } = UseUser();
  const axiosSecure = UseAxiosSecure();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    axiosSecure
      .get(`/payment-history/${currentuser?.[0]?.email}`)
      .then((res) => {
        setPaymentHistory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentuser?.[0]?.email]);

  const totalPayment = paymentHistory.reduce(
    (acc, item) => acc + item.amount,
    0
  );

  const paymentsLength = paymentHistory.length;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <GridLoader color="#058018" speedMultiplier={1} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 ">
      <div className="text-center  mt-10 mb-8">
        <h1 className="font-bold text-3xl lg:text-4xl">
          My <span className="text-secondary">Payment</span> History
        </h1>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-center ">
        <div className=" p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Payments:</h2>
          <p className="text-2xl">{paymentsLength}</p>
        </div>
        <div className=" p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Total Amount:</h2>
          <p className="text-2xl">${totalPayment.toFixed(2)}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paymentHistory.map((item, index) => (
          <div key={index} className=" p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Payment #{index + 1}</h3>
            <p className="text-sm text-gray-600 dark:text-darktext">
              Amount: <span className="text-secondary">${item.amount}</span>
            </p>
            <p className="text-sm text-gray-600 dark:text-darktext">
              Quantity: {item.classesId.length}
            </p>
            <p className="text-sm text-gray-600 dark:text-darktext">
              Payment Date: {item.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
