import React from "react";

const Spinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-4 mt-24 animate-icon">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-primary animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-t-accent border-r-transparent border-b-transparent border-l-accent animate-spin"></div>
        <div className="absolute inset-4 bg-secondary rounded-full"></div>
      </div>
    </div>
  );
};

export default Spinner;
