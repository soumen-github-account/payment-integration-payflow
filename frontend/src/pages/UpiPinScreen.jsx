// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { GoArrowLeft } from "react-icons/go";
// import { FiDelete } from "react-icons/fi";

// const UpiPinScreen = () => {
//   const navigate = useNavigate();
//   const { state } = useLocation();

//   const [pin, setPin] = useState("");
//   const [error, setError] = useState("");

//   // safety check
//   if (!state) {
//     navigate(-1);
//     return null;
//   }

//   const { amount, contact } = state;

//   // MOCK LOGGED-IN USER ACCOUNT
//   const userAccount = {
//     upiPin: "1234",
//     bankName: "HDFC Bank",
//     upiId: "rahul@okhdfc"
//   };

//   const handleNumberClick = (num) => {
//     if (pin.length < 4) setPin(prev => prev + num);
//   };

//   const handleDelete = () => {
//     setPin(prev => prev.slice(0, -1));
//   };

//   const verifyPin = () => {
//     if (pin === userAccount.upiPin) {
//       navigate("/payment-success", { replace: true });
//     } else {
//       setError("Incorrect UPI PIN");
//       setPin("");
//     }
//   };

//   return (
//     <div className="min-h-screen  w-full bg-black text-white flex flex-col">

//       {/* Header */}
//       <div className="p-4 flex items-center gap-3">
//         <GoArrowLeft
//           className="text-2xl cursor-pointer"
//           onClick={() => navigate(-1)}
//         />
//         <p className="text-lg font-medium">Enter UPI PIN</p>
//       </div>

//       {/* Amount Card */}
//       <div className="bg-[#121212] mx-4 mt-6 rounded-2xl p-4 text-center">
//         <p className="text-gray-400 text-sm">Paying</p>
//         <p className="text-lg font-medium">{contact.name}</p>
//         <p className="text-2xl font-semibold mt-2">₹{amount}</p>
//         <p className="text-xs text-gray-500 mt-1">{userAccount.bankName}</p>
//       </div>

//       {/* PIN DOTS */}
//       <div className="flex justify-center gap-4 mt-10">
//         {[0, 1, 2, 3].map(i => (
//           <div
//             key={i}
//             className={`w-4 h-4 rounded-full border 
//               ${pin.length > i ? "bg-white" : "border-gray-500"}`}
//           />
//         ))}
//       </div>

//       {error && (
//         <p className="text-red-500 text-center mt-3">{error}</p>
//       )}

//       {/* Keypad */}
//       <div className="grid grid-cols-3 gap-6 mt-auto mb-10 px-12 text-xl">
//         {[1,2,3,4,5,6,7,8,9].map(n => (
//           <button
//             key={n}
//             className="py-3 bg-gray-800 rounded-full active:bg-gray-600"
//             onClick={() => handleNumberClick(n.toString())}
//           >
//             {n}
//           </button>
//         ))}

//         {pin.length === 4 ? (
//             <button
//             onClick={verifyPin}
//             className="py-3 rounded-full bg-teal-600 font-medium"
//             >
//             Pay 
//             </button>
//         ) : <div></div>}

//         <button
//           className="py-3 rounded-full bg-gray-800 active:bg-gray-600"
//           onClick={() => handleNumberClick("0")}
//         >
//           0
//         </button>

//         <button
//           className="py-3 flex items-center justify-center text-[28px] text-gray-200 bg-red-700 active:bg-red-600"
//           onClick={handleDelete}
//         >
//           <FiDelete />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpiPinScreen;

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FiDelete } from "react-icons/fi";

const UpiPinScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const state = location.state;

  // SAFE redirect after render
  useEffect(() => {
    if (!state) {
      navigate("/", { replace: true });
    }
  }, [state, navigate]);

  // Stop rendering until redirect happens
  if (!state) return null;

  const { amount, contact } = state;

  // MOCK LOGGED-IN USER ACCOUNT
  const userAccount = {
    upiPin: "1234",
    bankName: "HDFC Bank",
    upiId: "rahul@okhdfc"
  };

  const handleNumberClick = (num) => {
    if (pin.length < 4) setPin(prev => prev + num);
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
  };

const verifyPin = () => {
    if (pin === userAccount.upiPin) {
        navigate("/payment-processing", {
        replace: true,
        state: { amount, contact }
        });
    } else {
        setError("Incorrect UPI PIN");
        setPin("");
    }
};

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* Header */}
      <div className="p-4 flex items-center gap-3">
        <GoArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-medium">Enter UPI PIN</p>
      </div>

      {/* Amount Card */}
      <div className="bg-[#121212] mx-4 mt-6 rounded-2xl p-4 text-center">
        <p className="text-gray-400 text-sm">Paying</p>
        <p className="text-lg font-medium">{contact.name}</p>
        <p className="text-2xl font-semibold mt-2">₹{amount}</p>
        <p className="text-xs text-gray-500 mt-1">{userAccount.bankName}</p>
      </div>

      {/* PIN DOTS */}
      <div className="flex justify-center gap-4 mt-10">
        {[0, 1, 2, 3].map(i => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border
              ${pin.length > i ? "bg-white" : "border-gray-500"}`}
          />
        ))}
      </div>

      {error && (
        <p className="text-red-500 text-center mt-3">{error}</p>
      )}

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-6 max-sm:gap-2 mt-auto mb-10 px-12 max-sm:px-5 text-xl">
        {[1,2,3,4,5,6,7,8,9].map(n => (
          <button
            key={n}
            className="py-3 bg-gray-800 rounded-full active:bg-gray-600"
            onClick={() => handleNumberClick(n.toString())}
          >
            {n}
          </button>
        ))}

        {pin.length === 4 ? (
          <button
            onClick={verifyPin}
            className="py-3 rounded-full bg-teal-600 font-medium"
          >
            Pay
          </button>
        ) : <div />}

        <button
          className="py-3 rounded-full bg-gray-800 active:bg-gray-600"
          onClick={() => handleNumberClick("0")}
        >
          0
        </button>

        <button
          className="py-3 flex items-center justify-center text-[28px]
          text-gray-200 bg-red-700 active:bg-red-600"
          onClick={handleDelete}
        >
          <FiDelete />
        </button>
      </div>
    </div>
  );
};

export default UpiPinScreen;
