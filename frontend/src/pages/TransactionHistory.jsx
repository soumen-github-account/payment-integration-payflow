import React, { useContext, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { transaction_data } from "../assets/transaction_data";
import { getTransactionType } from "../utils/transactionType";
import { user_data } from "../assets/user_data";
import { AppContext } from "../contexts/AppContext";
import TransactionSkeleton from "../components/TransactionSkeleton";
import MobileNavbar from "../components/MobileNavbar";

const TransactionHistory = () => {
  const {getAllTransactions, transactions, user, getTransactionsLoading} = useContext(AppContext)
  const navigate = useNavigate();
  const currentUser = user;
  useEffect(()=>{
    getAllTransactions()
  }, [])
  if(getTransactionsLoading) return <TransactionSkeleton />
  return (
    <div className="min-h-screen w-full bg-black text-white p-4 pb-30">
      <nav className="flex items-center mb-6 gap-3">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl cursor-pointer" />
        </NavLink>
        <h1 className="text-lg font-medium">All Transactions</h1>
      </nav>

      <div className="flex flex-col gap-3">
        {transactions.length > 0 && transactions.map((txn) => {
          const type = getTransactionType(txn, currentUser)

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
              <div className="flex items-center gap-4">
                <img
                  src={`https://ui-avatars.com/api/?name=${txn.receiver.name}`}
                  className="w-10 h-10 rounded-full"
                  alt={txn.receiver.name}
                />
                <div>
                  <p className="font-medium">
                    {type === "DEBIT"
                      ? `Paid to ${txn.receiver.name}`
                      : `Received from ${txn.sender.name}`}
                  </p>

                  <p className="text-sm text-gray-400">
                    {new Date(txn.initiatedAt).toLocaleString()}
                  </p>
                </div>
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
      <MobileNavbar />
    </div>
  );
};

export default TransactionHistory;
