import React from "react";

interface ErrorRetryProps {
  onRetry: () => void;
}

const ErrorRetry: React.FC<ErrorRetryProps> = ({ onRetry }) => {
  return (
    <div className="w-full flex items-center justify-center gap-3">
      <div>An error occurred.</div>
      <button
        className="underline text-blue-500 hover:text-blue-700"
        type="button"
        onClick={onRetry}
      >
        Retry
      </button>
    </div>
  );
};

export default ErrorRetry;
