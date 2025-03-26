"use client";

import React, { Suspense } from "react";

import { useSearchParams } from "next/navigation";
import { Card } from "@aws-amplify/ui-react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PatientInformation from "@/components/items/PatientInformation";
import TestingInformation from "@/components/items/TestingInformation";
import SelectVariant from "@/components/items/SelectVariant";
import ResultAndInterpretation from "@/components/items/ResultAndInterpretation";
import RecommendationAndConclusion from "@/components/items/RecommendationAndConclusion";
import PreviewReport from "@/components/items/PreviewReport";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ButtonAddFamilyDisease from "@/components/button/ButtonAddFamilyDisease";

const EditVariantReport = () => {
  const searchParams = useSearchParams();
  const reportID = searchParams?.get("id") || ""; // Provide a default value (e.g., empty string)
  const patientID = searchParams?.get("patientid") || "";

  const tabs = [
    // {
    //   tab: "Patient Information",
    //   value: "Patient Information",
    //   comp: (
    //     <PatientInformation
    //       id_report={reportID ?? ""}
    //       patientid={patientID ?? ""}
    //     ></PatientInformation>
    //   ),
    // },
    {
      tab: "Testing Information",
      value: "Testing Information",
      comp: (
        <TestingInformation idpatient={patientID ?? ""}></TestingInformation>
      ),
    },
    // {
    //   tab: "Select Variant",
    //   value: "Select Variant",
    //   comp: (
    //     <SelectVariant
    //       patientid={patientID}
    //       id_report={reportID}
    //       onUpdateVariant={}
    //     ></SelectVariant>
    //   ),
    // },
    {
      tab: "Result and Interpretation",
      value: "Result and Interpretation",
      comp: (
        <ResultAndInterpretation
          patientid={patientID}
          id_report={reportID}
        ></ResultAndInterpretation>
      ),
    },
    {
      tab: "Recommendation and Conclusion",
      value: "Recommendation and Conclusion",
      comp: (
        <RecommendationAndConclusion
          id_patient={patientID ?? ""}
          id_report={reportID ?? ""}
        ></RecommendationAndConclusion>
      ),
    },
    {
      tab: "Approval and Preview Report",
      value: "Approval and Preview Report",
      comp: (
        <PreviewReport
          id_report={reportID ?? ""}
          id_patient={patientID ?? ""}
        ></PreviewReport>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row w-full justify-between border rounded border-gray-400 items-center shadow-lg">
        <div className=" p-2 flex flex-row w-full px-5">
          <p className="text-lg  border-gray-400 p-2">{`Report ID :  ${reportID}`}</p>
          <p className="text-lg  border-gray-400 p-2">{`Patient ID : ${patientID}`}</p>
        </div>
        <div className="flex flex-row items-center p-2 w-[400px]">
          <ButtonAddFamilyDisease
            patient_id={patientID}
          ></ButtonAddFamilyDisease>
        </div>
      </div>
      <div className="flex flex-col gap-5 border mt-5">
        <Tabs className="gap-x-1 " defaultValue="Select Variant">
          <TabsList className="bg-white border h-[50px] border-b-1  border-t-1 border-l-0 border-r-0">
            {tabs.map((item, index) => (
              <TabsTrigger
                className="w-[230px] h-full hover:border-b-4 hover:border-b-violet-600 data-[state=active]:border-b-4 data-[state=active]:border-violet-900 rounded-none"
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
      {/* <Card>
        <CardHeader></CardHeader>
        <CardContent></CardContent>
      </Card> */}
    </div>
  );
};

export default EditVariantReport;
