import React from "react";

const ErrorBox = ({ message = "" }) => {
  return (
    <div className="bg-yellow-500 text-black p-4 rounded-[4px]">{message}</div>
  );
};

export default ErrorBox;
