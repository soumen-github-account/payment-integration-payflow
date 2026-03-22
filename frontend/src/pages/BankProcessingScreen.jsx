import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { bank_data } from "../assets/bank_data";

const BankProcessingScreen = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState("");

  // useEffect(() => {
  //   if (!state) {
  //     navigate("/", { replace: true });
  //     return;
  //   }

  //   const { accountno, ifsc } = state;

  //   // simulate bank verification delay
  //   const timer = setTimeout(() => {
  //     let foundAccount = null;
  //     let foundBank = null;

  //     bank_data.forEach(bank => {
  //       bank.accounts.forEach(acc => {
  //         if (
  //           acc.accountNumber === accountno &&
  //           acc.ifscCode.toUpperCase() === ifsc.toUpperCase()
  //         ) {
  //           foundAccount = acc;
  //           foundBank = bank;
  //         }
  //       });
  //     });

  //     if (!foundAccount) {
  //       setError("Account not found. Please check details.");
  //       return;
  //     }

  //     if (foundAccount.status !== "ACTIVE") {
  //       setError("This account is inactive.");
  //       return;
  //     }

  //     // VERIFIED → go to confirm page
  //     navigate("/bank-confirm", {
  //       replace: true,
  //       state: {
  //         account: foundAccount,
  //         bank: foundBank
  //       }
  //     });
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [state, navigate]);

  useEffect(() => {
  if (!state) {
    navigate("/", { replace: true });
    return;
  }

  const verifyAccount = async () => {
    try {
      const { accountno, ifsc } = state;

      const res = await fetch("http://localhost:8080/api/account/verify-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          accountNumber: accountno,
          ifscCode: ifsc
        })
      });

      const data = await res.json(); // assuming you return JSON

      console.log("API response:", data);

      // ❌ If backend returns string (error)
      if (typeof data === "string") {
        setError(data);
        return;
      }

      // ❌ Optional: check account status
      if (data.status && data.status !== "ACTIVE") {
        setError("This account is inactive.");
        return;
      }

      // ✅ SUCCESS
      navigate("/bank-confirm", {
        replace: true,
        state: {
          account: data
        }
      });

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
    }
  };

  verifyAccount();
}, [state, navigate]);

  if (!state) return null;

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center">
      {!error ? (
        <>
          <div className="w-14 h-14 border-4 border-gray-700 border-t-teal-500 rounded-full animate-spin" />
          <p className="mt-6 text-lg font-medium">Verifying bank details</p>
          <p className="text-gray-400 text-sm mt-1">Please wait</p>
        </>
      ) : (
        <>
          <p className="text-red-500 text-lg">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-6 px-6 py-2 rounded-full bg-teal-600"
          >
            Go Back
          </button>
        </>
      )}
    </div>
  );
};

export default BankProcessingScreen;
