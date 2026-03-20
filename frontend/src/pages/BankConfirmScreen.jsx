import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { LuIndianRupee } from "react-icons/lu";
import { user_data } from "../assets/user_data";

const BankConfirmScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [amount, setAmount] = useState("");
    const id = user_data.id
  useEffect(() => {
    if (!state) navigate("/", { replace: true });
  }, [state, navigate]);

  if (!state) return null;

  const { account, bank } = state;
  const handlePay = () => {
        if (!amount || amount <= 0) return;

        navigate(`/upi-pin/${id}`, {
              state: {
                amount,
                contact: {
                  name: account.name,
                  mobileNumber: account.mobileNumber
                }
              }
            })
    };
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      <nav className="p-4 flex gap-3 border-b border-gray-800">
        <GoArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="font-medium">Confirm Bank Transfer</p>
      </nav>

      <div className="p-4 space-y-4">
        <div className="bg-[#121212] rounded-2xl p-4 border border-gray-800">
          <div className="flex items-center gap-3 mb-3">
            <img src={bank.logo} alt={bank.bankName} className="w-10 h-10" />
            <p className="font-medium">{bank.bankName}</p>
          </div>

          <p className="text-gray-400 text-sm">Account Holder</p>
          <p className="text-lg font-medium">{account.name}</p>

          <p className="text-gray-400 text-sm mt-3">Account Number</p>
          <p>XXXX XXXX {account.accountNumber.slice(-4)}</p>

          <p className="text-gray-400 text-sm mt-3">IFSC</p>
          <p>{account.ifscCode}</p>
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="w-full flex items-center mb-3 px-4 py-2 rounded-full border-2 border-gray-600">
            {amount && Number(amount) > 0 && (<LuIndianRupee className="text-[20px]" />)}
            <input
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
            placeholder="Enter amount"
            className="w-full outline-none text-[20px] mb-1 ml-1 placeholder:text-[17px]"
            />
        </div>

        <button
          disabled={!amount}
          onClick={handlePay}
          className="w-full py-3 rounded-full bg-teal-600 font-medium disabled:opacity-50"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BankConfirmScreen;
