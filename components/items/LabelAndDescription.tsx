import React from "react";
import { Label } from "../ui/label";

interface LabelDescProops {
  label: string;
  desc: string;
}

const LabelAndDescription: React.FC<LabelDescProops> = ({ label, desc }) => {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
  );
};

export default LabelAndDescription;
