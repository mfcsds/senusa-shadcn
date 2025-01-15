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
    <div className="flex flex-col w-[90%]">
      <div className="flex flex-row w-full justify-between border rounded border-gray-400 items-center shadow-lg">
        <div className="p-2 flex gap-2 flex-row items-center justify-center space-y-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm font-semibold text-gray-700 tracking-wide">
            {`Report ID: ${reportID}`}
          </p>
          <p className="text-sm font-semibold text-gray-700 tracking-wide">
            {`Patient ID: ${patientID}`}
          </p>
        </div>
        <div className="flex flex-row">
          <Select
            disabled={loadingVariant}
            onValueChange={(value) => {
              const selectedVCF = listVCF.find((vcf) => vcf.id === value); // Find selected VCF
              if (selectedVCF) {
                console.log(`${selectedVCF.id} is selected`); // Log selected VCF ID
                fetchListVariant(selectedVCF.id ?? ""); // Uncomment this to fetch variants
                setSelectedVCF(selectedVCF.id);
                // Uncomment this to set selected VCF
              }
            }}
          >
            <SelectTrigger className="w-[280px] ">
              <SelectValue placeholder="Select VCF Data" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select VCF</SelectLabel>
                {listVCF.map((item, index) => (
                  <SelectItem key={index} value={`${item.id}`}>
                    {item.id}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {/* Show loading or selected VCF */}
          <div className="mt-2">
            {loadingVariant ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin h-4 w-4 border-2 border-blue-500 rounded-full border-t-transparent"></div>
                <p className="text-sm text-blue-600 font-semibold">
                  Loading variants...
                </p>
              </div>
            ) : selectedVCF ? (
              <p className="text-sm text-green-600 font-semibold">
                Selected VCF: {selectedVCF}
              </p>
            ) : (
              <p className="text-sm text-gray-500">No VCF selected.</p>
            )}
          </div>
        </div>

        <div className="flex flex-row items-center p-2 w-[400px]">
          <ButtonAddPatientDisease
            patient_id={patientID}
          ></ButtonAddPatientDisease>
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
