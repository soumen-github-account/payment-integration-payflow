// import React, { useContext, useState } from "react";
// import { findAccountByMobile } from "../utils/findAccount";
// import { GoArrowLeft } from "react-icons/go";
// import { NavLink } from "react-router-dom";
// import axios from "axios";
// import { AppContext } from "../contexts/AppContext";

// const CheckBalance = () => {
//   // assume logged-in user mobile
//   const USER_MOBILE = "9876543210"; // Rahul Sharma (HDFC)
//   const {backendUrl, user} = useContext(AppContext)
//   const [upiPin, setUpiPin] = useState("");
//   const [error, setError] = useState("");
//   const [balance, setBalance] = useState(null);
//   const [bankName, setBankName] = useState("");
//   const [bankLogo, setBankLogo] = useState("");
//   const [loading, setLoading] = useState(false)

//   const handleCheckBalance = async() => {
//     setLoading(true)
//     try {
//       const {data} = await axios.post(`${backendUrl}/api/payment/balance`, 
//         {
//           mobileNumber: user?.mobileNumber,
//           pin: upiPin
//         }
//       )

//       console.log(data)
//       // success
//       setBankName(bank.bankName);
//       setBalance(account.balance);
//       // setBankLogo(bank.logo)
//       setError("");
     
//     } catch (error) {
//       console.log(error)
//     }
//   };

//   return (
//     <div className="min-h-screen w-full bg-black text-white p-4">
//       <nav className="flex items-center mb-6 gap-3">
//         <NavLink to={-1}><GoArrowLeft className="text-2xl cursor-pointer" /></NavLink>
//         <h1 className="text-lg font-medium">Check Balance</h1>
//       </nav>
//       {balance === null ? (
//         <>
//           <label className="text-gray-400">Enter UPI PIN</label>
//           <input
//             type="password"
//             maxLength={6}
//             value={upiPin}
//             onChange={(e) => setUpiPin(e.target.value)}
//             className="w-full mt-2 px-4 py-3 rounded-full bg-black border border-gray-600 outline-teal-500"
//             placeholder="••••"
//           />

//           {error && <p className="text-red-500 mt-2">{error}</p>}

//           <button
//             onClick={handleCheckBalance}
//             className="w-full mt-6 py-3 rounded-full bg-teal-600 font-medium"
//           >
//             Check Balance
//           </button>
//         </>
//       ) : (
//         <div className="text-center mt-10">
//           <span className="text-gray-400 flex items-center justify-center gap-3">
//             <img src={bankLogo} className="w-6" alt="" />
//             <p>{bankName}</p>
//           </span>
//           <p className="text-3xl font-semibold mt-2">₹ {' '}{balance}</p>
//           <p className="text-gray-500 mt-1">Available Balance</p>
//           <NavLink to={-1}><button className="px-20 py-2 rounded-full bg-teal-500 mt-3">Done</button></NavLink>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CheckBalance;


import React, { useContext, useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../contexts/AppContext";
import MobileNavbar from "../components/MobileNavbar";

const CheckBalance = () => {
  const { backendUrl, user } = useContext(AppContext);

  const [upiPin, setUpiPin] = useState("");
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);
  const [bankName, setBankName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckBalance = async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await axios.post(
        `${backendUrl}/api/payment/balance`,
        {
          mobileNumber: user?.mobileNumber,
          pin: upiPin,
        }
      );

      console.log(data);

      // CORRECT DATA
      setBankName(data.bankName);
      setBalance(data.balance);

    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white p-4">

      {/* NAV */}
      <nav className="flex items-center mb-6 gap-3">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl cursor-pointer" />
        </NavLink>
        <h1 className="text-lg font-medium">Check Balance</h1>
      </nav>

      {/* LOADING SCREEN */}
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="w-14 h-14 border-4 border-gray-700 border-t-teal-500 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400">Fetching your balance...</p>
        </div>
      ) : balance === null ? (
        <>
          {/* INPUT */}
          <label className="text-gray-400">Enter UPI PIN</label>
          <input
            type="password"
            maxLength={6}
            value={upiPin}
            onChange={(e) => setUpiPin(e.target.value)}
            className="w-full mt-2 px-4 py-3 rounded-full bg-black border border-gray-600 outline-teal-500"
            placeholder="••••"
          />

          {error && <p className="text-red-500 mt-2">{error}</p>}

          <button
            onClick={handleCheckBalance}
            className="w-full mt-6 py-3 rounded-full bg-teal-600 font-medium"
          >
            Check Balance
          </button>
        </>
      ) : (
        /*  RESULT SCREEN */
        <div className="text-center mt-10">
          <p className="text-gray-400">{bankName}</p>

          <p className="text-3xl font-semibold mt-2">
            ₹ {balance}
          </p>

          <p className="text-gray-500 mt-1">Available Balance</p>

          <NavLink to={-1}>
            <button className="px-20 py-2 rounded-full bg-teal-500 mt-3">
              Done
            </button>
          </NavLink>
        </div>
      )}
      <MobileNavbar />
    </div>
  );
};

export default CheckBalance;