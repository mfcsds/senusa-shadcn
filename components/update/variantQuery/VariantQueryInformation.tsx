"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/update/ui/tabs";
import React from "react";
import { AcmgCriteria } from "@/utils/object";
import VariantAlellel from "@/components/update/detailVariantReport/selectVariant/VariantAlellel";
import VariantComputationalPrediction from "@/components/update/detailVariantReport/selectVariant/VariantComputationalPrediction";
import FunctionalAnnotations from "@/components/update/detailVariantReport/selectVariant/FunctionalAnnotations";
import ACMGVariantQuery from "./ACMGVariantQuery";
import { Badge } from "@/components/ui/badge";

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
  ];

  return (
    <div className="flex flex-col w-full px-5">
      <Tabs defaultValue="ACMG" className="w-full">
        <TabsList>
          {tabs.map((item, index) => (
            <TabsTrigger
              key={index}
              value={item.value}
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
