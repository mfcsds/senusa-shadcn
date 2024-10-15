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
import DemoTableVariant from "@/components/datatable/Demo";

const EditVariantReport = () => {
  const searchParams = useSearchParams();
  const reportID = searchParams.get("id");
  const patientID = searchParams.get("patientid");

  const tabs = [
    {
      tab: "Patient Information",
      value: "Patient Information",
      comp: (
        <PatientInformation
          id_report={reportID ?? ""}
          patientid={patientID ?? ""}
        ></PatientInformation>
      ),
    },
    {
      tab: "Testing Information",
      value: "Testing Information",
      comp: (
        <TestingInformation idpatient={patientID ?? ""}></TestingInformation>
      ),
    },
    {
      tab: "Select Variant",
      value: "Select Variant",
      comp: (
        <SelectVariant
          patientid={patientID}
          id_report={reportID}
        ></SelectVariant>
      ),
    },
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
    <Suspense>
      <div className="flex w-full">
        <Card>
          <CardHeader>
            <CardTitle>{reportID}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex">
              <Tabs className="gap-x-2" defaultValue="Patient Information">
                <TabsList>
                  {tabs.map((item, index) => (
                    <TabsTrigger
                      className="w-[250px]"
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
          </CardContent>
        </Card>
      </div>
    </Suspense>
  );
};

export default EditVariantReport;
