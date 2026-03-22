import React, { useContext, useEffect, useState } from "react";
import { useParams, NavLink, useNavigate, useLocation } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { contact_users } from "../assets/contact_user";
import { transaction_data } from "../assets/transaction_data";
import { user_data } from "../assets/user_data";
import { MdVerifiedUser } from "react-icons/md";
import { LuIndianRupee } from "react-icons/lu";
import { assets } from "../assets/assets";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AppContext } from "../contexts/AppContext";
import ChatSkeleton from "../components/ChatSkeleton";

const ChatPayScreen = () => {
  const {user, getChatScreenDetails, chatData, chatScreenLoading} = useContext(AppContext)
  const { receiverNumber } = useParams();
  const navigate = useNavigate();
  // const contact = contact_users.find(c => c.mobileNumber === receiverNumber);

  const [amount, setAmount] = useState("");
  const user_number = user?.mobileNumber;

  /* Filter ONLY transactions between logged-in user & this contact */
  // const contactTransactions = transaction_data
  //   .filter(txn =>
  //     (txn.sender.mobileNumber === user_number &&
  //       txn.receiver.mobileNumber === contact.mobileNumber) ||
  //     (txn.receiver.mobileNumber === user_number &&
  //       txn.sender.mobileNumber === contact.mobileNumber)
  //   )
  //   .sort(
  //     (a, b) =>
  //       new Date(a.initiatedAt) - new Date(b.initiatedAt)
  //   );

    const handlePay = () => {
        if (!amount || amount <= 0) return;

        navigate(`/upi-pin/${receiverNumber}`, {
            state: {
            amount,
            contact,
            transferType: "MOBILE"
            }
        });
    };

  useEffect(() => {
    if (user?.mobileNumber && receiverNumber) {
      getChatScreenDetails(user.mobileNumber, receiverNumber);
    }
  }, [user, receiverNumber]);

  if (!chatData) {
    return <ChatSkeleton />
  }
  if(chatScreenLoading) return <ChatSkeleton />
  const contact = chatData
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">

      {/* Header */}
      <nav className="p-3 flex items-center gap-3 border-b border-gray-800">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl" />
        </NavLink>
        <img
          src={`https://ui-avatars.com/api/?name=${contact.name}`}
          className="w-10 h-10 rounded-full"
          alt={contact.name}
        />
        <div>
          <p className="font-medium">{contact.name}</p>
          <p className="text-xs text-gray-400">
            +91 {contact.mobileNumber}
          </p>
        </div>
      </nav>

      <div className="flex-1 p-3 overflow-y-auto">

        {/* First-time payment UI */}
        {contact.transactions.length === 0 && (
          <div className="flex justify-center mt-12">
            <div className="bg-[#121212] border border-gray-800 rounded-2xl p-6 w-[90%] text-center">
              <img
                src={`https://ui-avatars.com/api/?name=${contact.name}`}
                className="w-20 h-20 rounded-xl mx-auto mb-3"
                alt={contact.name}
              />
              <p className="text-lg font-medium">{contact.name}</p>
              <p className="text-gray-400 text-sm mb-4">
                +91 {contact.mobileNumber}
              </p>

              <hr className="border-gray-700 my-3" />

              <p className="text-sm text-gray-400">
                Banking name :
              </p>
              <p className="text-lg font-semibold flex justify-center items-center gap-2">
                {contact.name}
                <span className="text-teal-500"><MdVerifiedUser /></span>
              </p>
            </div>
          </div>
        )}

        {/* Transaction chat */}
        {contact?.transactions.map(txn => {
          const isSent =
            txn.sender.mobileNumber === user_number;

          return (
            <div
              key={txn.transactionId}
              className={`max-w-[39%] max-sm:max-w-[58%] px-3 py-6 max-sm:py-4 rounded-xl mb-5 text-sm
                ${isSent ? "border-teal-600 border-2 ml-auto" : "bg-gray-700"}
              `}
            >
                <div className="flex items-center justify-between">
                    <p className="font-medium text-[20px]">₹{txn.amount}</p>
                    {isSent ?
                      <FaArrowRight className="bg-red-700 p-2 text-3xl rounded-full -rotate-50" />
                      :
                      <FaArrowLeft className="bg-teal-700 p-2 text-3xl rounded-full -rotate-50" />
                    }
                </div>
              <div className="text-xs flex justify-between text-gray-200 mt-2">
                <span className="flex items-center gap-1">
                    <img src={assets.check} alt="" className="w-4"/>
                    <p>{txn.status}</p>
                </span>
                <span>{new Date(txn.completedAt).toLocaleTimeString()}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Amount + Pay */}
      <div className="p-3 border-t border-gray-800">

          {/* Receiver banking info */}
          <div
          className={`
              overflow-hidden transition-all duration-300 ease-out
              ${amount && Number(amount) > 0
              ? "max-h-32 opacity-100 translate-y-0"
              : "max-h-0 opacity-0 translate-y-4"}
          `}
          >
          <div className="mb-3 bg-[#121212] border border-gray-800 rounded-xl p-3">
              <p className="text-xs text-gray-400">Paying to</p>

              <div className="flex items-center gap-2 mt-1">
              <p className="font-medium">{contact.name}</p>
              <MdVerifiedUser className="text-teal-500" />
              </div>

              <p className="text-xs text-gray-400">
              UPI ID: {contact.upiId || `${contact.mobileNumber}@upi`}
              </p>
          </div>
          </div>


          {/* Input */}
          <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1 w-full bg-gray-900 px-4 py-2 rounded-full">
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
              onClick={handlePay}
              className="bg-teal-600 px-7 py-2 rounded-full font-medium"
              >
              Pay
              </button>
          </div>
      </div>


    </div>
  );
};

export default ChatPayScreen;
