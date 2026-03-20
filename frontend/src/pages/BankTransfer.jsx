import React, { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";

const BankTransfer = () => {
  const navigate = useNavigate();
  const [accountno, setAccountno] = useState("");
  const [ifsc, setIfsc] = useState("");

  const handleContinue = () => {
    if (!accountno || !ifsc) return;

    navigate("/bank-processing", {
      state: { accountno, ifsc }
    });
  };

  return (
    <div className="w-full min-h-screen text-white bg-black">
      <nav className="p-3 border-b border-gray-800 flex gap-3">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl" />
        </NavLink>
        <p className="font-medium">Bank Transfer</p>
      </nav>

      <div className="mt-10 px-4">
        <div className="flex flex-col gap-2">
          <label className="text-gray-300">Receiver Account No</label>
          <input
            value={accountno}
            onChange={(e) => setAccountno(e.target.value)}
            className="rounded-full px-4 py-2 bg-black border border-gray-600 outline-teal-600"
            placeholder="Account number"
          />
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label className="text-gray-300">IFSC Code</label>
          <input
            value={ifsc}
            onChange={(e) => setIfsc(e.target.value)}
            className="rounded-full px-4 py-2 bg-black border border-gray-600 outline-teal-600"
            placeholder="IFSC"
          />
        </div>

        <button
          onClick={handleContinue}
          className="w-full mt-6 py-3 rounded-full bg-teal-600 font-medium"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BankTransfer;
