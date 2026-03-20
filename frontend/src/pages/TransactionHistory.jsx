import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { transaction_data } from "../assets/transaction_data";
import { getTransactionType } from "../utils/transactionType";
import { user_data } from "../assets/user_data";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const currentUser = user_data;

  return (
    <div className="min-h-screen w-full bg-black text-white p-4">
      <nav className="flex items-center mb-6 gap-3">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl cursor-pointer" />
        </NavLink>
        <h1 className="text-lg font-medium">All Transactions</h1>
      </nav>

      <div className="flex flex-col gap-3">
        {transaction_data.map((txn) => {
          const type = getTransactionType(txn, currentUser);

          return (
            <div
              key={txn.transactionId}
              onClick={() =>
                navigate(`/transaction/${txn.transactionId}`, {
                  state: txn
                })
              }
              className="p-4 bg-zinc-900 rounded-xl flex justify-between cursor-pointer active:scale-[0.98]"
            >
              <div>
                <p className="font-medium">
                  {type === "DEBIT"
                    ? `Paid to ${txn.receiver.upiId}`
                    : `Received from ${txn.sender.upiId}`}
                </p>

                <p className="text-sm text-gray-400">
                  {new Date(txn.initiatedAt).toLocaleString()}
                </p>
              </div>

              <div className="text-right">
                <p
                  className={`font-semibold ${
                    type === "DEBIT"
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {type === "DEBIT" ? "-" : "+"}₹{txn.amount}
                </p>
                <p className="text-xs text-gray-400">{type}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionHistory;
