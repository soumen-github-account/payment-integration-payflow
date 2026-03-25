import React from "react";

const PeopleKnowSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4 mt-3 px-2 animate-pulse">
      {Array(8) // number of skeleton items
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2"
          >
            {/* Avatar Skeleton */}
            <div className="w-14 h-14 rounded-full bg-gray-700"></div>

            {/* Name Skeleton */}
            <div className="w-12 h-3 bg-gray-700 rounded"></div>
          </div>
        ))}
    </div>
  );
};

export default PeopleKnowSkeleton;