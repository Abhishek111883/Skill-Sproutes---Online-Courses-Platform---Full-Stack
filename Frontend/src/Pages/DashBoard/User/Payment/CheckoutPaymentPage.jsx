import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { UseAxiosSecure } from "../../../../Components/Hooks/UseAxiosSecure";
import { UseUser } from "../../../../Components/Hooks/UseUser";
import { useNavigate, Navigate } from "react-router-dom";

export const CheckoutPaymentPage = ({ price, cartitem }) => {
  const URL = `http://localhost:3000/payment-info?${
    cartitem && `classId=${cartitem}`
  }`;
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = UseAxiosSecure();
  const { currentuser, isLoading } = UseUser();
  const [clientSecret, setclientSecret] = useState("");
  const [succeed, setsucced] = useState("");
  const [message, setmessage] = useState("");
  const [cart, setcart] = useState([]);

  if (price < 0 || !price) {
    return <Navigate to="/dashboard/my-selected" replace />;
  }

  useEffect(() => {
    axiosSecure
      .get(`/cart/${currentuser?.[0]?.email}`)
      .then((res) => {
        const classesId = res.data.map((item) => item._id);
        setcart(classesId);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: price })
      .then((res) => {
        setclientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSumbmit = async (e) => {
    setmessage("");
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (cardElement == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error(error);
      setmessage(error.message);
      return;
    } else {
      console.log([paymentMethod]);
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: currentuser?.[0]?.name || "UnKnown",
            email: currentuser?.[0]?.email || "Anonymous",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
      setmessage(confirmError.message);
    } else {
      console.log(paymentIntent);

      if (paymentIntent.status === "succeeded") {
        const transactionId = paymentIntent.id;
        const payment_method = paymentIntent.payment_method;
        const amount = paymentIntent.amount / 100;
        const currency = paymentIntent.currency;
        const status = paymentIntent.status;
        const email = currentuser?.[0]?.email;
        const name = currentuser?.[0]?.name;

        // Move the data object here, outside the if statement
        const data = {
          transactionId,
          payment_method,
          amount,
          currency,
          status,
          email,
          name,
          classesId: cartitem ? [cartitem] : cart,
          date: new Date().toLocaleDateString(),
        };

        fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            if (
              res.deletedResult.deletedCount > 0 &&
              res.paymentResult.insertedId &&
              res.updatedResult.modifiedCount > 0
            ) {
              setsucced("Payment Successfull");
              setTimeout(() => {
                navigate("/dashboard/my-payments", { replace: true });
              }, 1000);
            } else {
              setmessage("Payment Failed");
            }
          })
          .catch((err) => console.log(err));
      }
    }
  };

  return (
    <>
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold">
          Payment Amount : <span className="text-secondary">${price}</span>
        </h1>
      </div>

      <form onSubmit={handleSumbmit} className="form ">
        <div id="payment-element">
          <CardElement
            options={{
              style: {
                base: {
                  iconColor: "#00000",
                  color: "#00000",
                  fontWeight: 600,
                  fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
                  fontSize: "20px",
                  fontSmoothing: "antialiased",
                  ":-webkit-autofill": {
                    color: "#00000",
                  },
                  "::placeholder": {
                    color: "#000000",
                  },
                },
                invalid: {
                  iconColor: "#FFC7EE",
                  color: "#FFC7EE",
                },
              },
            }}
          />
        </div>

        <button
          disabled={!stripe || !elements || price < 0 || !price}
          className="paymentbtn"
          type="submit"
        >
          Pay
        </button>
        {message && (
          <p className="text-red p-4 text-center text-sm">{message}</p>
        )}
        {succeed && (
          <p className="text-green p-4 text-center text-sm">{succeed}</p>
        )}
      </form>
    </>
  );
};
