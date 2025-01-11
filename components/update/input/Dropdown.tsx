import React from "react";
import clsx from "clsx";

interface DropdownProps {
  options: { label: string; value: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  size?: "small" | "medium" | "large";
  variant?: "default" | "primary" | "secondary";
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  selectedValue,
  onChange,
  placeholder = "Select an option",
  className = "",
  size = "medium",
  variant = "default", 
}) => {
  const sizeClasses = {
    small: "text-sm h-8 px-2",
    medium: "text-sm h-10 px-4",
    large: "text-base h-10 px-8",
  };

  const variantClasses = {
    default: "bg-foreground border-border text-text-primary focus:border-primary focus:ring-primary",
    primary: "bg-background text-text-primary border-border focus:border-primary focus:ring-primary",
    secondary: "bg-red-500 text-white border-red-500 focus:ring-red-700",
  };

  return (
    <div className="relative w-full">
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className={clsx(
          "w-full border-2 rounded-lg focus:outline-none focus:ring-2",
          sizeClasses[size],
          variantClasses[variant], 
          className
        )}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="hover:bg-gray-100">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
