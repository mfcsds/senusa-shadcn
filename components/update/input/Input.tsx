"use client";

import React from "react";
import clsx from "clsx"; 

interface InputProps {
  type?: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  max?: string;
}

const Input: React.FC<InputProps> = ({
  type = "text",
  id,
  value,
  onChange,
  placeholder = "",
  className = "",
  size = "medium", 
  disabled = false, 
  max,
}) => {
  const sizeClasses = {
    small: "text-sm h-8 px-2",
    medium: "text-sm h-10 px-4",
    large: "text-base h-12 px-6",
  };
  const disabledStyles = 'opacity-50 cursor-not-allowed disabled:pointer-events-none disabled:opacity-50'; 

  return (
    <input
      type={type}
      id={id}
      value={value}
      onChange={onChange}
      className={clsx(
        `w-full border rounded-lg text-text-secondary focus:outline-primary focus:ring-primary bg-background border-border ${className}`,
        sizeClasses[size],  
      )}
      placeholder={placeholder}
      disabled={disabled}
      max={type === "date" ? max : undefined} 
    />
  );
};

export default Input;
