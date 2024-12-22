"use client";
import React from "react";
import { Hospital, Accessibility } from "lucide-react";

interface PatientItemsProops {
  id?: string | null;
  name?: string | null;
}

const PatientItem: React.FC<PatientItemsProops> = ({ id, name }) => {
  return (
    <div className="flex flex-row items-center">
      <span className="mr-2">
        <Accessibility />
      </span>
      <div className="flex flex-col text-left border-l-4 rounded-lg pl-2 border-blue-600">
        <p className="text-xl text-black-900">{name}</p>
        <p className="text-lg text-gray-500">{id}</p>
      </div>
    </div>
  );
};

export default PatientItem;
