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
      return "border-blue-primary";
    case ZYGOSITY_HOMOZYGOUS:
      return "border-red-primary";
  }
  return "border-gray-500";
}

function getBackgroundColor(zygosity: string) {
  switch (zygosity) {
    case ZYGOSITY_HETEROZYGOUS:
      return "bg-blue-secondary";
    case ZYGOSITY_HOMOZYGOUS:
      return "bg-red-secondary";
  }
  return "bg-foreground";
}

interface ZygosityLabelProops {
  label: string;
}
const ZygosityLabel: React.FC<ZygosityLabelProops> = ({ label }) => {
  return (
    <p
      className={`p-2 border-2 rounded-sm text-sm text-black ${getBackgroundColor(
        label
      )} ${getBorderColor(label)} text-center`}
    >
      {label}
    </p>
  );
};

export default ZygosityLabel;
