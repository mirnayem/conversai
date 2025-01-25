import React from "react";

const SkeletonLoader: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 max-w-md w-full p-4">
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl">
        <div className="flex-1 space-y-4">
          <div className="h-4 w-3/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          <div className="h-4 w-full rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
          <div className="h-4 w-4/5 rounded bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
