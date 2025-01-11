"use client"; 

import React from "react";
import { useRouter } from "next/navigation"; 
const DropDownSelectPatient = ({ options, selectedValue, onChange, placeholder }: any) => {
  const router = useRouter(); 

  const handleChange = (value: string) => {
    onChange(value); 
    router.push(`/features//manage-patients/${value}`);
  };

  return (
    <select
      value={selectedValue}
      onChange={(e) => handleChange(e.target.value)}
      className={`bg-background text-text-primary border-border focus:border-primary focus:ring-primary text-sm h-10 px-4`}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option: any) => (
        <option key={option.id} value={option.id} className="text-sm">
          {option.id}
        </option>
      ))}
    </select>
  );
};

export default DropDownSelectPatient;
