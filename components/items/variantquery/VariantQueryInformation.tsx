"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import ACMGVariantQuery from "./ACMGVariantQuery";
import { AcmgCriteria } from "@/utils/object";
import VariantAlellel from "../VariantAlellel";
import VariantComputationalPrediction from "../VariantComputationalPrediction";
import FunctionalAnnotations from "../FunctionalAnnotations";
import DownloadVariant from "../download/DownloadVariant";

interface VariantQueryInformationProops {
  acmgdata?: AcmgCriteria;
  variantdata?: any;
  hgvs?: string;
}

const VariantQueryInformation: React.FC<VariantQueryInformationProops> = ({
  acmgdata,
  variantdata,
  hgvs,
}) => {
  const tabs = [
    {
      tab: "ACMG Classification",
      value: "ACMG",
      comp: <ACMGVariantQuery data={acmgdata} />,
    },
    {
      tab: "AI Variant Prediction",
      value: "AI",
      comp: (
        <div className="flex flex-col w-full border rounded-lg items-center p-10">
          <p className="text-gray-400"> AI Variant Prediction</p>
        </div>
      ),
    },

    {
      tab: "Allele Population Frequency",
      value: "Allele Population Frequency",
      comp: (
        <VariantAlellel data={variantdata.colocated_variants}></VariantAlellel>
      ),
    },
    {
      tab: "Computational Prediction",
      value: "Computational Prediction",
      comp: (
        <VariantComputationalPrediction
          data={variantdata.transcript_consequences}
        />
      ),
    },
    {
      tab: "Functional Annotation",
      value: "Functional Annotation",
      comp: (
        <FunctionalAnnotations data={variantdata.transcript_consequences} />
      ),
    },
    {
      tab: "Extract Data",
      value: "Extract Data",
      comp: <DownloadVariant hgvs={hgvs ?? ""}></DownloadVariant>,
    },
  ];

  return (
    <div className="flex flex-col w-full p-5">
      <Tabs defaultValue="ACMG" className="w-full">
        <TabsList className="bg-white h-[50px] border-1 gap-4 border w-full justify-start">
          {tabs.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.value}
              className="w-[200px] text-left hover:border-b-4 hover:border-violet-600 data-[state=active]:border-b-4 data-[state=active]:border-violet-600"
            >
              {item.tab}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((item, index) => (
          <TabsContent key={index} value={item.value}>
            {item.comp}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
export default VariantQueryInformation;
