import React from "react";
import { Loader2 } from "lucide-react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <Loader2 className="animate-spin h-5 w-5 text-purple-300" />
    </div>
  );
};

export default LoadingSpinner;
