import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppContext } from "../contexts/AppContext";

const PaymentProcessingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {backendUrl, user} = useContext(AppContext)
  const state = location.state;
  const [status, setStatus] = useState("loading"); 
  // loading | success | error

  const [errorMsg, setErrorMsg] = useState("");
  // Safety redirect
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { amount, contact } = state;

  // Auto move to success after delay
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigate("/payment-success", {
  //       replace: true,
  //       state: { amount, contact }
  //     });
  //   }, 2500);
  //   console.log(state)

  //   return () => clearTimeout(timer);
  // }, [amount, contact, navigate]);

  // useEffect(() => {
  //   const makePayment = async () => {
  //     try {
  //       const res = await fetch("http://localhost:8080/api/payment/transfer", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json"
  //         },
  //         body: JSON.stringify({
  //           senderMobile: user?.mobileNumber,
  //           receiverMobile: contact.mobileNumber,
  //           amount: Number(amount),
  //           pin: state.pin,
  //           transferType: "MOBILE"
  //         })
  //       });

  //       const data = await res.text();

  //       if (data === "Transaction Successful") {
  //         setStatus("success");

  //         // auto move after 1.5s
  //         setTimeout(() => {
  //           navigate("/payment-success", {
  //             replace: true,
  //             state: { amount, contact }
  //           });
  //         }, 1500);

  //       } else {
  //         setStatus("error");
  //         setErrorMsg(data); // "Invalid PIN", etc
  //       }

  //     } catch (err) {
  //       setStatus("error");
  //       setErrorMsg("Something went wrong");
  //     }
  //   };

  //   makePayment();
  // }, []);

  useEffect(() => {
  const makePayment = async () => {
    try {

      const { transferType } = state;

      // COMMON DATA
      let requestBody = {
        senderMobile: user?.mobileNumber,
        amount: Number(amount),
        pin: state.pin,
        transferType
      };

      // CONDITIONAL BODY
      if (transferType === "MOBILE") {
        requestBody.receiverMobile = contact.mobileNumber;
      } 
      
      else if (transferType === "BANK") {
        requestBody.receiverAccountNumber = contact.accountNumber;
        requestBody.receiverIfsc = contact.ifscCode;
      }

      console.log("Request Body:", requestBody);

      const res = await fetch(`${backendUrl}/api/payment/transfer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      const data = await res.text();

      if (data === "Transaction Successful") {
        setStatus("success");

        setTimeout(() => {
          navigate("/payment-success", {
            replace: true,
            state: { amount, contact }
          });
        }, 1500);

      } else {
        setStatus("error");
        setErrorMsg(data);
      }

    } catch (err) {
      setStatus("error");
      setErrorMsg("Something went wrong");
    }
  };

  makePayment();
}, []);

console.log(user?.mobileNumber)

  if (status === "loading") {
  return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center">

      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-gray-700 border-t-teal-500
      rounded-full animate-spin" />

      <p className="mt-6 text-lg font-medium">
        Processing payment
      </p>

      <p className="mt-2 text-sm text-gray-400">
        Paying ₹{amount} to {contact.name}
      </p>
    </div>
  );
}
if (status === "error") {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center">

      {/* Failed Icon Circle */}
      <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center text-3xl">
          ✕
        </div>
      </div>

      {/* Title */}
      <h1 className="text-2xl font-semibold">Payment Failed</h1>

      {/* Error Message */}
      <p className="text-gray-400 text-center mt-2 max-w-xs">
        {errorMsg || "Transaction could not be completed"}
      </p>

      {/* Transaction Info Card */}
      <div className="mt-6 w-full max-w-sm bg-[#121212] border border-gray-800 rounded-2xl p-4">
        <div className="flex justify-between mb-2">
          <p className="text-gray-400 text-sm">Amount</p>
          <p className="font-medium">₹{amount}</p>
        </div>

        <div className="flex justify-between mb-2">
          <p className="text-gray-400 text-sm">To</p>
          <p className="font-medium">{contact.name}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-400 text-sm">Status</p>
          <p className="text-red-500 font-medium">Failed</p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-8 w-full max-w-sm">
        <button
          onClick={() => navigate(-1)}
          className="flex-1 border border-gray-700 py-3 rounded-full"
        >
          Retry
        </button>

        <button
          onClick={() => navigate("/main")}
          className="flex-1 bg-red-600 py-3 rounded-full"
        >
          Go Home
        </button>
      </div>

    </div>
  );
}
};

export default PaymentProcessingScreen;
