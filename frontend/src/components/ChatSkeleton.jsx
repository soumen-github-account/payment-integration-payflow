import React from "react";

const ChatSkeleton = () => {
  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col animate-pulse">
      
      {/* Header Skeleton */}
      <nav className="p-3 flex items-center gap-3 border-b border-gray-800">
        <div className="w-6 h-6 bg-gray-700 rounded"></div>
        <div className="w-10 h-10 rounded-full bg-gray-700"></div>
        <div>
          <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
          <div className="w-24 h-3 bg-gray-800 rounded"></div>
        </div>
      </nav>

      {/* Chat Skeleton */}
      <div className="flex-1 p-3 overflow-y-auto space-y-4">
        
        {/* Incoming txn */}
        <div className="max-w-[58%] px-3 py-5 rounded-xl bg-gray-800">
          <div className="w-20 h-5 bg-gray-700 rounded mb-2"></div>
          <div className="flex justify-between">
            <div className="w-16 h-3 bg-gray-700 rounded"></div>
            <div className="w-10 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Sent txn */}
        <div className="max-w-[58%] px-3 py-5 rounded-xl border-2 border-gray-700 ml-auto">
          <div className="w-20 h-5 bg-gray-700 rounded mb-2"></div>
          <div className="flex justify-between">
            <div className="w-16 h-3 bg-gray-700 rounded"></div>
            <div className="w-10 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>

        {/* Incoming txn */}
        <div className="max-w-[58%] px-3 py-5 rounded-xl bg-gray-800">
          <div className="w-20 h-5 bg-gray-700 rounded mb-2"></div>
          <div className="flex justify-between">
            <div className="w-16 h-3 bg-gray-700 rounded"></div>
            <div className="w-10 h-3 bg-gray-700 rounded"></div>
          </div>
        </div>

      </div>

      {/* Bottom Input Skeleton */}
      <div className="p-3 border-t border-gray-800">
        
        {/* Paying to card skeleton */}
        <div className="mb-3 bg-[#121212] border border-gray-800 rounded-xl p-3">
          <div className="w-20 h-3 bg-gray-700 rounded mb-2"></div>
          <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
          <div className="w-40 h-3 bg-gray-800 rounded"></div>
        </div>

        {/* Input Skeleton */}
        <div className="flex gap-2 items-center">
          <div className="w-full h-10 bg-gray-800 rounded-full"></div>
          <div className="w-20 h-10 bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default ChatSkeleton;