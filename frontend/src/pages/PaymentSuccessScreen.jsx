import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const PaymentSuccessScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [show, setShow] = useState(false);

  const state = location.state;

  // Redirect safely AFTER render
  useEffect(() => {
    if (!state) {
      navigate("/main", { replace: true });
    }
  }, [state, navigate]);

  // Prevent render until redirect happens
  if (!state) return null;

  const { amount, contact } = state;

  useEffect(() => {
    const timer = setTimeout(() => setShow(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center">

      {/* Animated Success Circle */}
      <div
        className={`w-28 h-28 rounded-full bg-green-500 flex items-center justify-center
        transition-all duration-700 ease-out
        ${show ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}
      >
        <Check size={48} className="text-black stroke-[3]" />
      </div>

      <h1
        className={`mt-6 text-2xl font-semibold transition-all duration-700
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        Payment Successful
      </h1>

      <p
        className={`mt-3 text-3xl font-bold transition-all duration-700 delay-150
        ${show ? "opacity-100" : "opacity-0"}`}
      >
        ₹{amount}
      </p>

      <p
        className={`mt-2 text-gray-400 transition-all duration-700 delay-300
        ${show ? "opacity-100" : "opacity-0"}`}
      >
        Paid to {contact.name}
      </p>

      <div
        className={`mt-8 w-[90%] max-w-sm bg-[#121212] border border-gray-800
        rounded-2xl p-4 text-sm transition-all duration-700 delay-500
        ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
      >
        <div className="flex justify-between mb-2">
          <span className="text-gray-400">Status</span>
          <span className="text-green-500">Success</span>
        </div>

        <div className="flex justify-between mb-2">
          <span className="text-gray-400">To</span>
          <span>{contact.mobileNumber}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">Date</span>
          <span>{new Date().toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => navigate("/main", { replace: true })}
        className="mt-10 px-10 py-3 rounded-full bg-teal-600 font-medium
        active:scale-95 transition"
      >
        Done
      </button>
    </div>
  );
};

export default PaymentSuccessScreen;
