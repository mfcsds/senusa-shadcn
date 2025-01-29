import {
  ACMG_BENIGN,
  ACMG_LIKELY_BENIGN,
  ACMG_LIKELY_PATHOGENIC,
  ACMG_PATHOGENIC,
  ACMG_VUS,
  ZYGOSITY_HETEROZYGOUS,
  ZYGOSITY_HOMOZYGOUS,
} from "@/utils/Contanst";
import React from "react";

function getBorderColor(zygosity: string) {
  switch (zygosity) {
    case ZYGOSITY_HETEROZYGOUS:
      return "border-blue-600";
    case ZYGOSITY_HOMOZYGOUS:
      return "border-red-600";
  }
  return "border-gray-500";
}

function getBackgroundColor(zygosity: string) {
  switch (zygosity) {
    case ZYGOSITY_HETEROZYGOUS:
      return "bg-blue-400 text-black";
    case ZYGOSITY_HOMOZYGOUS:
      return "bg-red-400 text-black";
  }
  return "bg-foreground text-red-primary";
}

interface ZygosityLabelProops {
  label: string;
}
const ZygosityLabel: React.FC<ZygosityLabelProops> = ({ label }) => {
  return (
    <p
      className={`p-2 border-2 font-semibold rounded-sm text-sm  ${getBackgroundColor(
        label
      )} ${getBorderColor(label)} text-center`}
    >
      {label}
    </p>
  );
};

export default ZygosityLabel;
