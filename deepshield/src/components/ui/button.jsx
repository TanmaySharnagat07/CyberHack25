import React from "react";

export const Button = ({ children, className = "", disabled = false, ...props }) => {
  return (
    <button
      className={`bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50 ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
