import React, { useState } from "react";
import { LuIndianRupee } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { user_data } from "../assets/user_data";

const ScanPayScreen = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
    const id = user_data.id
  if (!state) return null;

  const { upiId, name, amount: qrAmount } = state;
  const [amount, setAmount] = useState(qrAmount || "");

  const handleContinue = () => {
    navigate(`/upi-pin/${id}`, {
      state: {
        amount,
        contact: { name, upiId }
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-4">
      <p className="text-gray-400">Paying</p>
      <p className="text-xl font-medium">{name}</p>
      <p className="text-sm text-gray-500">{upiId}</p>
    
      <div className="flex items-center gap-1 mt-3 w-full bg-gray-900 px-4 py-2 rounded-full">
        {amount && Number(amount) > 0 && (<LuIndianRupee className="text-[20px]" />)}
        <input
        type="text"
        value={amount}
        onChange={(e) =>
            setAmount(e.target.value.replace(/\D/g, ""))
        }
        placeholder="Enter amount"
        className="w-full outline-none text-[20px] font-medium placeholder:text-[16px]"
        />
    </div>

      <button
        onClick={handleContinue}
        className="w-full mt-6 py-3 rounded-full bg-teal-600 font-medium"
      >
        Continue
      </button>
    </div>
  );
};

export default ScanPayScreen;
