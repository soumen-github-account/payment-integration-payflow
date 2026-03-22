import React, { useContext, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { AppContext } from "../contexts/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreatePin = () => {
    const {backendUrl, user} = useContext(AppContext)
  const [step, setStep] = useState("otp");
  const [pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()

  const handleClick = (num) => {
    if (step === "otp") {
      if (pin.length < 6) setPin(pin + num);
    } else {
      if (confirmPin.length < 6) setConfirmPin(confirmPin + num);
    }
  };

  const handleDelete = () => {
    if (step === "otp") {
      setPin(pin.slice(0, -1));
    } else {
      setConfirmPin(confirmPin.slice(0, -1));
    }
  };

  const handleNext = () => {
    if (pin.length !== 6) {
      setError("Enter 6-digit PIN");
      return;
    }
    setError("");
    setStep("confirmOtp");
  };

  const setPinHandler = async() => {
    try {
        const {data} = await axios.post(`${backendUrl}/api/upi/create-pin`, 
            {
                mobileNumber: user.mobileNumber,
                upiPin: confirmPin
            }
        )

        if(data.success){
            toast.success(data.message)
            navigate("/main")
        } else{
            toast.error(data.message)
        }
    } catch (error) {
        const message =
        error.response?.data?.message || "Something went wrong";
        toast.error(message);
    }
  }

  const handleSetPin = () => {
    if (confirmPin.length !== 6) {
      setError("Enter 6-digit PIN");
      return;
    }

    if (pin !== confirmPin) {
      setError("PIN does not match");
      setConfirmPin(""); // reset confirm pin
      return;
    }

    setError("");
    setPinHandler();
  };

  const currentPin = step === "otp" ? pin : confirmPin;

  return (
    <div className="min-h-screen w-full flex justify-center items-start pt-16 bg-black text-white">
      
      <div className="w-[350px] relative p-6 rounded-xl border border-teal-400 shadow-lg shadow-teal-400/20 overflow-hidden">

        {/* Glow */}
        <div className="absolute -top-40 left-0 w-full h-[200px] bg-teal-500 opacity-50 blur-3xl z-0" />

        {/* Title */}
        <p className="text-center font-semibold text-lg mb-4">
          {step === "otp" ? "Enter UPI PIN" : "Confirm UPI PIN"}
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-red-500 text-center mb-2 text-sm">{error}</p>
        )}

        {/* PIN Dots */}
        <div className="flex justify-center gap-3 mb-8">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full border ${
                currentPin.length > i
                  ? "bg-teal-400 border-teal-400"
                  : "border-gray-500"
              }`}
            />
          ))}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[1,2,3,4,5,6,7,8,9].map((num) => (
            <button
              key={num}
              onClick={() => handleClick(num)}
              className="p-4 rounded-lg bg-gray-800 hover:bg-teal-500 transition"
            >
              {num}
            </button>
          ))}

          {/* Action Button */}
          
          {step === "otp" ? (
            <button
              onClick={handleNext}
              className="bg-teal-600 flex items-center justify-center rounded-full"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSetPin}
              className="bg-teal-600 flex items-center justify-center rounded-full"
            >
              Set
            </button>
          )}

          <button
            onClick={() => handleClick(0)}
            className="p-4 rounded-lg bg-gray-800 hover:bg-teal-500 transition"
          >
            0
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center text-2xl p-4 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            <FiDelete />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;