"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/update/ui/tabs";
import { ReportStatus } from "@/utils/DateHelperFunction";
import { Accessibility, FileText } from "lucide-react";
import ButtonAddFamilyDisease from "@/components/update/button/ButtonAddFamilyDisease";
import ButtonAddPatientDisease from "@/components/update/button/ButtonAddPatientDisease";
import Dropdown from "@/components/update/input/Dropdown";
import InformationApprovalReport from "@/components/update/detailVariantReport/InformationApprovelReport";
import SelectVariant from "@/components/update/detailVariantReport/SelectVariant";
import { fetchDetailVariantReport } from "@/hooks/useVariantReport";
import { CreateVariantReportInput } from "@/src/API";
import { VariantRawData, VcfData } from "@/utils/object";
import ResultAndInterpretation from "@/components/update/detailVariantReport/ResultAndInterpretation";
import { fetchVCFData } from "@/hooks/useVcfData";
import { useToast } from "@/components/ui/use-toast";
import { generateClient } from "aws-amplify/api";
import { listVariants } from "@/src/graphql/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/update/ui/Spinner";
import RecommendationAndConclusion from "@/components/update/detailVariantReport/RecommendationAndConclusion";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailVariantReport({ params }: PageProps) {
  const [id, setId] = useState<string | null>(null);
  const [patientId, setPatientId] = useState("");
  const [loading, setLoading] = useState(true);
  const [variantReport, setVariantReport] = useState<
    CreateVariantReportInput[]
  >([]);
  const [vcfData, setVcfData] = useState<VcfData[]>([]);

  const [listVariant, setListVariant] = useState<VariantRawData[]>([]);
  const [loadingVariant, setLoadingVariant] = useState(false);
  const [listVCF, setVCF] = useState<VcfData[]>([]);
  const [selectedVCF, setSelectedVCF] = useState<string | null>(null);
  const client = generateClient();
  const { toast } = useToast();

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        if (resolvedParams.id) {
          setId(resolvedParams.id);
        } else {
          console.error("Variant ID is not available in params.");
        }
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const loadDetailVariantReport = async () => {
      try {
        setLoading(true);
        const data = await fetchDetailVariantReport(id);
        {
          data.map((report) => setPatientId(report.idPatient!));
        }
        setVariantReport(data);
      } catch (error) {
        console.error("Error loading detail variant report:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetailVariantReport();
  }, [id]);

  useEffect(() => {
    if (!patientId) return;
    console.log(patientId);
    const loadVCFData = async () => {
      try {
        setLoading(true);
        const data = await fetchVCFData(patientId);
        setVcfData(data);
      } catch (error) {
        console.error("Failed to fetch VCF data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVCFData();
  }, [patientId]);

  const handleUpdateVariant = (id: string, updatedACMGClass: string) => {
    setListVariant((prevVariants) =>
      prevVariants.map((variant) =>
        variant.id === id ? { ...variant, acmg: updatedACMGClass } : variant
      )
    );
  };

  const fetchListVariant = async (vcfID: string) => {
    setListVariant([]); // Clear previous data
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
      setListVariant(allVariants);
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

  return (
    <div className="p-8 min-h-screen">
      {loading ? (
        <Spinner />
      ) : (
        <div className="p-8 bg-foreground shadow-lg">
          {variantReport.map((report) => (
            <div
              key={report.id}
              className="flex flex-wrap justify-between items-start gap-6"
            >
              <div className="flex flex-col gap-4 justify-end w-full sm:w-auto">
                <div className="flex items-center gap-4">
                  <div>
                    <FileText className="text-primary w-12 h-12" />
                  </div>
                  <div className="space-y-1 ml-2">
                    <p className="font-semibold text-lg text-text-primary">
                      Report ID
                    </p>
                    <p className="text-text-secondary">{report.id}</p>
                  </div>
                </div>

                <div>
                  <div className="border-2 text-primary border-primary py-1 rounded-lg text-sm">
                    <p className="text-center">
                      {ReportStatus(report.status ?? 4)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-end w-full sm:w-auto">
                <div className="flex items-center gap-4">
                  <div>
                    <Accessibility className="text-primary w-12 h-12" />
                  </div>
                  <div className="space-y-1 ml-2">
                    <p className="font-semibold text-md text-text-primary">
                      Patient ID
                    </p>
                    <p className="text-text-secondary">{report.idPatient}</p>
                  </div>
                </div>

                <div className="flex flex-row">
                  <Select
                    disabled={loadingVariant}
                    onValueChange={(value) => {
                      const selectVCF = vcfData.find((vcf) => vcf.id === value); // Find selected VCF
                      if (selectVCF) {
                        console.log(`${selectVCF.id} is selected`); // Log selected VCF ID
                        fetchListVariant(selectVCF.id ?? ""); // Uncomment this to fetch variants
                        setSelectedVCF(selectVCF.id);
                      }
                    }}
                  >
                    <SelectTrigger className="w-[280px]">
                      <SelectValue placeholder="Select VCF Data" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Select VCF</SelectLabel>
                        {vcfData.map((item) => (
                          <SelectItem key={item.id} value={`${item.id}`}>
                            {" "}
                            {/* Use item.id here */}
                            {item.id} {/* Display item.id */}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex flex-col gap-4 justify-end w-full sm:w-auto">
                <ButtonAddPatientDisease patient_id={report.idPatient!} />
                <ButtonAddFamilyDisease patient_id={report.idPatient!} />
              </div>
            </div>
          ))}
        </div>
      )}

      {loadingVariant ? (
        <div className="mt-4 w-auto">
          <Spinner />
          <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      ) : selectedVCF ? (
        <div className="mt-8 w-auto">
          {/* Tabs */}
          <Tabs defaultValue="select-variant">
            <TabsList>
              <TabsTrigger value="information-approvel">
                Information Approval Report
              </TabsTrigger>
              <TabsTrigger value="select-variant">Select Variant</TabsTrigger>
              <TabsTrigger value="result-interpretation">
                Result and Interpretation
              </TabsTrigger>
              <TabsTrigger value="recommendation">
                Recommendation and Conclusion
              </TabsTrigger>
            </TabsList>

            <TabsContent value="information-approvel">
              <InformationApprovalReport id_patient={patientId} id_report={id!}/>
            </TabsContent>

            <TabsContent value="select-variant">
              <SelectVariant
                patientid={patientId}
                id_report={id}
                data={listVariant}
                onUpdateVariant={handleUpdateVariant}
              />
            </TabsContent>

            <TabsContent value="result-interpretation">
              <ResultAndInterpretation
                patientid={patientId}
                id_report={id}
              ></ResultAndInterpretation>
            </TabsContent>

            <TabsContent value="recommendation">
            <RecommendationAndConclusion
          id_patient={patientId}
          id_report={id}
        ></RecommendationAndConclusion>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="text-center mt-12">
          <p className="text-md font-semibold text-primary">No VCF selected.</p>
        </div>
      )}
    </div>
  );
}
