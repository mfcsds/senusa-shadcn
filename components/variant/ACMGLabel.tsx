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
    case ACMG_LIKELY_PATHOGENIC:
      return "border-red-600";
    case ACMG_LIKELY_BENIGN:
    case ACMG_BENIGN:
      return "border-green-600";
    case ACMG_VUS:
      return "border-yellow-600";
  }
  return "";
}

function getBackgroundColor(acmgclass: string) {
  switch (acmgclass) {
    case ACMG_PATHOGENIC:
    case ACMG_LIKELY_PATHOGENIC:
      return "bg-red-50";
    case ACMG_LIKELY_BENIGN:
    case ACMG_BENIGN:
      return "bg-green-50";
    case ACMG_VUS:
      return "bg-yellow-50";
  }
  return "bg-red-50";
}

interface ACMGLabelProops {
  label: string;
}
const ACMGLabel: React.FC<ACMGLabelProops> = ({ label }) => {
  return (
    <p
      className={`p-2 border-2 rounded-sm ${getBackgroundColor(
        label
      )} ${getBorderColor(label)} text-center`}
    >
      {label}
    </p>
  );
};

export default ACMGLabel;
