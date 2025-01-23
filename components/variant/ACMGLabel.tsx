import {
  ACMG_BENIGN,
  ACMG_LIKELY_BENIGN,
  ACMG_LIKELY_PATHOGENIC,
  ACMG_PATHOGENIC,
  ACMG_VUS,
} from "@/utils/Contanst";
import React from "react";

function getBorderColor(acmgclass: string) {
  switch (acmgclass) {
    case ACMG_PATHOGENIC:
      return "border-2 border-red-600";
    case ACMG_LIKELY_PATHOGENIC:
      return "border-2 border-red-600";
    case ACMG_LIKELY_BENIGN:
      return "border-2 border-primary";
    case ACMG_BENIGN:
      return "border-2 border-primary";
    case ACMG_VUS:
      return "border-2 border-yellow-primary";
  }
  return "border-gray-500";
}

function getBackgroundColor(acmgclass: string) {
  switch (acmgclass) {
    case ACMG_PATHOGENIC:
      return "bg-red-primary";
    case ACMG_LIKELY_PATHOGENIC:
      return "bg-red-secondary";
    case ACMG_LIKELY_BENIGN:
      return "bg-secondary";
    case ACMG_BENIGN:
      return "bg-accent";
    case ACMG_VUS:
      return "bg-yellow-secondary";
  }
  return "bg-foregrond";
}

interface ACMGLabelProops {
  label: string;
}
const ACMGLabel: React.FC<ACMGLabelProops> = ({ label }) => {
  return (
    <p
      className={`p-2 border-2 rounded-sm text-text-black text-sm ${getBackgroundColor(
        label
      )} ${getBorderColor(label)} text-center`}
    >
      {label}
    </p>
  );
};

export default ACMGLabel;
