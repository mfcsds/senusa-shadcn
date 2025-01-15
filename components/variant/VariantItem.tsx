import React from "react";
import { Skeleton } from "../ui/skeleton";
import { SelectedVariant } from "@/utils/object";

interface VariantItemProops {
  variantData?: SelectedVariant;
}
// Function to Get Gene Border Color
const getGeneColor = (item?: SelectedVariant) => {
  const highRiskGenes = [
    "BRCA1",
    "BRCA2",
    "TP53",
    "PTEN",
    "CDH1",
    "STK11",
    "CHEK2",
    "PALB2",
    "ATM",
    "MLH1",
    "MSH2",
    "MSH6",
    "PMS2",
    "RAD51C",
    "RAD51D",
    "BARD1",
  ];
  return highRiskGenes.includes(item?.gene_symbol || "")
    ? "border-red-600"
    : "border-gray-300"; // Default color
};

// Function to Get Gene Text Color
const getTextGeneColor = (item?: SelectedVariant) => {
  const highRiskGenes = [
    "BRCA1",
    "BRCA2",
    "TP53",
    "PTEN",
    "CDH1",
    "STK11",
    "CHEK2",
    "PALB2",
    "ATM",
    "MLH1",
    "MSH2",
    "MSH6",
    "PMS2",
    "RAD51C",
    "RAD51D",
    "BARD1",
  ];
  return highRiskGenes.includes(item?.gene_symbol || "")
    ? "text-red-600 font-semibold"
    : "text-gray-600"; // Default color
};

const VariantItem: React.FC<VariantItemProops> = ({ variantData }) => {
  return (
    <div className="flex flex-row gap-5 ml-5 items-center">
      <div
        className={`border-l-4 ${getGeneColor(
          variantData
        )} w-[200px] items-start flex flex-col justify-start pl-5`}
      >
        <div className=" px-2 rounded-md border-gray-500 border-2">
          {variantData?.gene_symbol ? (
            <p
              className={`text-lg font-medium ${getTextGeneColor(variantData)}`}
            >
              {variantData?.gene_symbol}
            </p>
          ) : (
            <Skeleton aria-label="..." className="h-6 w-[100px]  bg-gray-300" />
          )}
        </div>
        {variantData?.gene_id ? (
          <p className="text-lg font-medium text-gray-400 ">
            {variantData?.gene_id}
          </p>
        ) : (
          <Skeleton
            vocab="Loading"
            className="h-6 w-[150px] pl-2 mt-2 bg-gray-300"
          />
        )}
      </div>
      <div className="flex flex-col">
        <p className="text-lg">{variantData?.hgvs}</p>
        {variantData?.rsID ? (
          <p className="text-lg font-sans text-gray-500 ">{`RSID: ${variantData?.rsID?.toUpperCase()}`}</p>
        ) : (
          <Skeleton vocab="Loading" className="h-6 w-[100px] bg-gray-300" />
        )}
      </div>
    </div>
  );
};

export default VariantItem;
