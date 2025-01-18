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
import { VcfData } from "@/utils/object";
import ResultAndInterpretation from "@/components/items/ResultAndInterpretation";
import { fetchVCFData } from "@/hooks/useVcfData";

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
        {data.map((report) => ( 
          setPatientId(report.idPatient!)
        ))}
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

  const [levelAccount, setLevelAccount] = useState("");
  const optionVCFData = vcfData.map((item) => ({
    label: item.id!, 
    value: item.id!,  
  }));

  const variantReportData = variantReport.map((item) => ({
    label: item.id!, 
    value: item.id!,  
  }));

  return (
    <div className="p-8 min-h-screen">
      {loading ? (
        <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
        Loading...
      </p>
      ) : (
        <div className="p-8 bg-foreground shadow-lg">
           {variantReport.map((report) => ( 
          <div key={report.id} className="flex flex-wrap justify-between items-start gap-6">
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
                  <p className="text-center">{ReportStatus(report.status ?? 4)}</p>
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

              <div>
                <Dropdown
                  options={optionVCFData}
                  selectedValue={levelAccount}
                  onChange={setLevelAccount}
                  placeholder="Select VCF Data"
                  variant="default"
                />
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
      <div className="mt-8 w-auto">
        {/* Tabs */}
        <Tabs defaultValue="information-approvel">
          <TabsList>
            <TabsTrigger value="information-approvel">
              Information Approvel Report
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
            <InformationApprovalReport />
          </TabsContent>

          <TabsContent value="select-variant">
            <SelectVariant />
          </TabsContent>

          <TabsContent value="result-interpretation">
          <ResultAndInterpretation
          patientid={patientId}
          id_report={id}
        ></ResultAndInterpretation>
          </TabsContent>

          <TabsContent value="recommendation">
            <p>Content for Recommendation and Conclusion...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
