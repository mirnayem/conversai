import React from "react";
import { Hand } from "lucide-react";

const NoMessage = () => {
  return (
    <div>
      <div className="w-fit mx-auto flex items-center justify-center p-4 bg-black text-white rounded-full mb-4">
        <Hand size={40} />
      </div>

      <h1 className="text-2xl font-semibold text-gray-800">Hi, User</h1>

      <h2 className="text-lg text-gray-600 mt-2">
        Ask me anything about Learnfun
      </h2>

      <p className="text-sm text-gray-500 mt-4 px-4 max-w-md">
        LearnFun - Affordable, flexible, industry-relevant education with
        scholarships, career support, and global reach.
      </p>
    </div>
  );
};

export default NoMessage;
