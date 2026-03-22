import React from "react";

const ContactsSkeleton = () => {
  return (
    <div className="pt-[10px] px-2 animate-pulse">
      {[1, 2, 3, 4, 5, 6, 7].map((item) => (
        <div
          key={item}
          className="flex items-center justify-between p-3 border-b border-gray-800"
        >
          <div className="flex gap-3 items-center">
            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-gray-700"></div>

            {/* Name + Mobile */}
            <div>
              <div className="w-32 h-4 bg-gray-700 rounded mb-2"></div>
              <div className="w-24 h-3 bg-gray-800 rounded"></div>
            </div>
          </div>

          {/* Button Skeleton */}
          <div className="w-16 h-7 bg-gray-700 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default ContactsSkeleton;