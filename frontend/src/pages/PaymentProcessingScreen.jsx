import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentProcessingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  // Safety redirect
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  if (!state) return null;

  const { amount, contact } = state;

  // Auto move to success after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/payment-success", {
        replace: true,
        state: { amount, contact }
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [amount, contact, navigate]);

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
};

export default PaymentProcessingScreen;
