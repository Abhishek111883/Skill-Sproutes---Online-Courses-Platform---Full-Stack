import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./MakePayment.css";
import { CheckoutPaymentPage } from "./CheckoutPaymentPage";

export const MakePayment = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT);
  const location = useLocation();

  const price = location?.state?.price;
  const cartitem = location?.state?.itemId;

  if (!price) {
    return <Navigate to="/dashboard/my-selected" />;
  }

  return (
    <div className="my-40 stripe-custom-class flex items-center flex-col justify-center">
      <Elements stripe={stripePromise}>
        <CheckoutPaymentPage price={price} cartitem={cartitem} />
      </Elements>
    </div>
  );
};
