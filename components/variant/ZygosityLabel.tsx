import {
  ACMG_BENIGN,
  ACMG_LIKELY_BENIGN,
  ACMG_LIKELY_PATHOGENIC,
  ACMG_PATHOGENIC,
  ACMG_VUS,
  ZYGOSITY_HETEROZYGOUS,
  ZYGOSITY_HOMOZYGOUS,
} from "@/utils/Constant";
import React from "react";

function getBorderColor(zygosity: string) {
  switch (zygosity) {
    case ZYGOSITY_HETEROZYGOUS:
      return "border-blue-600";
    case ZYGOSITY_HOMOZYGOUS:
      return "border-red-600";
  }
  return "";
}

function getBackgroundColor(zygosity: string) {
  switch (zygosity) {
    case ZYGOSITY_HETEROZYGOUS:
      return "bg-blue-50";
    case ZYGOSITY_HOMOZYGOUS:
      return "bg-red-50";
  }
  return "";
}

interface ZygosityLabelProops {
  label: string;
}
const ZygosityLabel: React.FC<ZygosityLabelProops> = ({ label }) => {
  return (
    <p
      className={`p-2 border-2 rounded-sm ${getBackgroundColor(
        label
      )} ${getBorderColor(label)}`}
    >
      {label}
    </p>
  );
};

export default ZygosityLabel;
