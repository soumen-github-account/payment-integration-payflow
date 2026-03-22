import React from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink } from "react-router-dom";

const TransactionSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white p-4 animate-pulse">
      
      {/* Header */}
      <nav className="flex items-center mb-6 gap-3">
        <GoArrowLeft className="text-2xl text-gray-600" />
        <div className="w-40 h-5 bg-gray-700 rounded"></div>
      </nav>

      {/* Transactions Skeleton */}
      <div className="flex flex-col gap-3">
        {[1,2,3,4,5,6,7].map((item) => (
          <div
            key={item}
            className="p-4 bg-zinc-900 rounded-xl flex justify-between"
          >
            <div>
              <div className="w-40 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-28 h-3 bg-gray-800 rounded"></div>
            </div>

            <div className="text-right">
              <div className="w-16 h-4 bg-gray-700 rounded mb-2 ml-auto"></div>
              <div className="w-10 h-3 bg-gray-800 rounded ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionSkeleton;