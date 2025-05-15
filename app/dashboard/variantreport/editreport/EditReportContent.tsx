"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TestingInformation from "@/components/items/TestingInformation";
import SelectVariant from "@/components/items/SelectVariant";
import ResultAndInterpretation from "@/components/items/ResultAndInterpretation";
import RecommendationAndConclusion from "@/components/items/RecommendationAndConclusion";
import PreviewReport from "@/components/items/PreviewReport";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ButtonAddFamilyDisease from "@/components/button/ButtonAddFamilyDisease";
import { listVariants, listVcfdata } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { useToast } from "@/components/ui/use-toast";
import ButtonAddPatientDisease from "@/components/button/ButtonAddPatientDisease";
import { VariantRawData, VcfData } from "@/utils/object";
import { Card, CardContent } from "@/components/ui/card";
import { Ban, CircleCheck } from "lucide-react";

const EditVariantReport = () => {
  const searchParams = useSearchParams();
  const reportID = searchParams?.get("id") || ""; // Provide a default value (e.g., empty string)
  const patientID = searchParams?.get("patientid") || "";

  const [listVariant, setVariantList] = useState<VariantRawData[]>([]);
  const [loadingVariant, setLoadingVariant] = useState(false);
  const [listVCF, setVCF] = useState<VcfData[]>([]);
  const [selectedVCF, setSelectedVCF] = useState<string | null>(null);

  const client = generateClient();
  const { toast } = useToast();

  const handleUpdateVariant = (id: string, updatedACMGClass: string) => {
    setVariantList((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, acmg: updatedACMGClass } : variant
      )
    );
  };

  const fetchListVariant = async (vcfID: string) => {
    setVariantList([]); // Clear previous data
    setLoadingVariant(true);
    let allVariants: VariantRawData[] = []; // Array to hold all fetched items
    let nextToken: string | null = null; // Token to fetch the next page
    try {
      do {
        const result = (await client.graphql({
          query: listVariants,
          variables: {
            filter: { id_vcf: { eq: vcfID } },
            limit: 100,
            nextToken,
          },
        })) as {
          data: {
            listVariants: { items: VariantRawData[]; nextToken: string | null };
          };
        };
        // Concatenate the new items to the allVariants array
        allVariants = allVariants.concat(result.data.listVariants.items);
        nextToken = result.data.listVariants.nextToken; // Update nextToken for the next iteration
      } while (nextToken); // Continue until there's no more data to fetch
      setVariantList(allVariants);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Load Sample Variant",
        description: `Failed load all sample ${error}`,
      });
    } finally {
      setLoadingVariant(false);
      toast({
        title: "Load Sample Variant",
        description: `${listVariant.length} variants are successfully loaded`,
      });
    }
  };

  const fetchVCF = async () => {
    try {
      if (patientID) {
        const result = await client.graphql({
          query: listVcfdata,
          variables: { filter: { id_patient: { eq: patientID } } },
        });

        if (result.data) {
          setVCF(result.data.listVcfdata.items as VcfData[]);
        }
        toast({
          title: `Successfull load VCF Data`,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: `Failed Process`,
        description: `Can not load VCF data ${error}`,
      });
    }
  };

  useEffect(() => {
    fetchVCF();
  }, []);

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
    {
      tab: "Select Variant",
      value: "Select Variant",
      comp: (
        <SelectVariant
          patientid={patientID}
          id_report={reportID}
          data={listVariant}
          onUpdateVariant={handleUpdateVariant}
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
    <div className="flex flex-col w-full">
      <div className="inline-flex items-baseline w-full p-4 border rounded-lg justify-between border-gray-300 shadow-lg bg-white">
        <div className="inline-flex items-baseline  gap-x-8">
          <div className="flex flex-col gap-y-1 ">
            <p className="text-sm text-gray-500">Report ID</p>
            <p className="text-lg font-semibold text-gray-800">{reportID}</p>
          </div>
          <div className="flex flex-col gap-y-1">
            <p className="text-sm text-gray-500 mt-2">Patient ID</p>
            <p className="text-lg font-semibold text-gray-800">{patientID}</p>
          </div>
        </div>

        <div className="inline-flex items-center">
          <Select
            disabled={loadingVariant}
            onValueChange={(value) => {
              const sel = listVCF.find((v) => v.id === value);
              if (sel) {
                fetchListVariant(sel.id ?? "");
                setSelectedVCF(sel.id);
              }
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select VCF Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Available VCF</SelectLabel>
                {listVCF.map((item) => (
                  <SelectItem key={item.id} value={item.id ?? ""}>
                    {item.id}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <div className="pl-2">
            {loadingVariant ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent" />
                <span className="text-sm text-blue-600 font-semibold"></span>
              </div>
            ) : selectedVCF ? (
              <span className="text-sm text-green-600 font-semibold">
                <CircleCheck className="text-green-700"></CircleCheck>
              </span>
            ) : (
              <span className="text-sm text-gray-500">
                <Ban></Ban>
              </span>
            )}
          </div>
        </div>

        <div className="inline-flex items-baseline">
          <ButtonAddPatientDisease patient_id={patientID} />
          <ButtonAddFamilyDisease patient_id={patientID} />
        </div>
      </div>

      <div className="flex flex-col gap-5  mt-5">
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
