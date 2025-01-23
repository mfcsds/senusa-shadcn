import { FileText, FilePen, FileCheck2, Save } from "lucide-react";
import Dropdown from "@/components/update/input/Dropdown";
import Button from "@/components/update/button/Button";
import ButtonFormatReport from "@/components/update/detailVariantReport/inrformationReport/ButtonFormatReport";
import React, { useState, useEffect } from "react";
import PriviewReportDialog from "./inrformationReport/PriviewReportDialog";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { getPatient } from "@/src/graphql/queries";
import { getVariantReport } from "@/src/graphql/queries";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Conclusion,
  Patient,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
  VariantReportData,
} from "@/utils/object";
import {
  ReportStatus,
  ReportStatusStringToNumber,
} from "@/utils/DateHelperFunction";
import { updateVariantReport } from "@/src/graphql/mutations";
import { listSelectedVariants } from "@/src/graphql/queries";
import { listVariantInterpretations } from "@/src/graphql/queries";
import { listRecommendations, listConclusions } from "@/src/graphql/queries";
import { useToast } from "@/components/ui/use-toast";

Amplify.configure(config);

interface InformationApprovalReportProops {
  id_report: string;
  id_patient: string;
}

const InformationApprovalReport: React.FC<InformationApprovalReportProops> = ({
  id_report,
  id_patient,
}) => {
  const { toast } = useToast();
  const client = generateClient();
  const [ensembleVersion, setEnsembleVersion] = useState<string>("");
  const [ensembleRestVersion, setEnsembleRestVersion] = useState<string>("");
  const [patient, setPatient] = useState<Patient>({
    id: "",
    name: "",
    sex: "",
    dob: "",
  });
  const [listConc, setListConclusion] = useState<Conclusion[]>([]);
  const [listRec, setListRecommendation] = useState<Recommendation[]>([]);
  const [listSelVariants, setListSelectedVariant] = useState<SelectedVariant[]>(
    []
  );
  const [newStatus, setNewStatus] = useState("");
  const [variantInter, setVariantInter] = useState<VariantInterpretation[]>([]);
  const [variantReport, setVariantReport] = useState<VariantReportData>();

  
  const fetchVariantReport = async () => {
    try {
      const result = await client.graphql({
        query: getVariantReport,
        variables: { id: id_report },
      });
      setVariantReport(result.data.getVariantReport as VariantReportData);
    } catch (error) {
      console.log("Error fetch variant report");
    }
  };

  const fetchVariantInterpretation = async () => {
    try {
      const result = await client.graphql({
        query: listVariantInterpretations,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      await setVariantInter(
        result.data.listVariantInterpretations.items as VariantInterpretation[]
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPatient = async () => {
    try {
      const result = await client.graphql({
        query: getPatient,
        variables: { id: id_patient },
      });
      console.log("result", result);
      console.log("result", id_patient);
      setPatient(result.data.getPatient as Patient);
    } catch (error) {
      console.log("errror fetch patient data");
    }
  };

  const fecthSelectedVariant = async () => {
    try {
      const result = await client.graphql({
        query: listSelectedVariants,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      setListSelectedVariant(
        result.data.listSelectedVariants.items as SelectedVariant[]
      );
    } catch (error) {
      console.log("Error FetchSelectedVariant");
    }
  };

  const fetchRecommendation = async () => {
    try {
      const result = await client.graphql({
        query: listRecommendations,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      setListRecommendation(
        result.data.listRecommendations.items as Recommendation[]
      );
    } catch (error) {
      console.log("Error Recommendation");
    }
  };

  const fetchConclusion = async () => {
    try {
      const result = await client.graphql({
        query: listConclusions,
        variables: { filter: { id_report: { eq: id_report } } },
      });
      setListConclusion(result.data.listConclusions.items as Conclusion[]);
    } catch (error) {
      console.log("Error Fetch Conclusion");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchConclusion();
        await fetchRecommendation();
        await fecthSelectedVariant();
        await fetchPatient();
        await fetchVariantInterpretation();
        await fetchVariantReport();
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    const fetchEnsemblVersion = async () => {
      try {
        const response = await fetch(
          "https://rest.ensembl.org/info/software?content-type=application/json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Ensembl version");
        }
        const data = await response.json();
        setEnsembleVersion(data.release); // Assuming the "release" key contains the version
      } catch (error) {
        console.error("Error fetching Ensembl version:", error);
      }
    };

    const fetchEnsemblRestVersion = async () => {
      try {
        const response = await fetch(
          "https://rest.ensembl.org/info/rest?content-type=application/json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch Ensembl version");
        }
        const data = await response.json();
        setEnsembleRestVersion(data.release); // Assuming the "release" key contains the version
      } catch (error) {
        console.error("Error fetching Ensembl Rest version:", error);
      }
    };

    fetchData(); // Call all data fetching functions
    fetchEnsemblVersion(); // Call Ensembl version
    fetchEnsemblRestVersion(); // Call Ensembl REST version
  }, []);

  const handleUpdateReportStatus = async () => {
    const temp: VariantReportData = {
      id: variantReport?.id ?? "",
      status: ReportStatusStringToNumber(newStatus) ?? 0,
    };
    try {
      const result = await client.graphql({
        query: updateVariantReport,
        variables: { input: temp },
      });
      if (result.data.updateVariantReport) {
        fetchVariantReport();
      }
    } catch (error) {
      console.error("Error updating status report:", error);
    } finally {
      toast({
        title: "Update Successfully",
        description: "Status report updated successfully.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
      <div className="bg-foreground p-6 rounded-lg shadow-lg text-text-primary">
        <div className="flex items-center gap-4 mb-8">
          <FileText className="text-blue-primary w-10 h-10" />
          <h3 className="font-semibold text-xl">Testing Detail</h3>
        </div>
        <p className="mb-8">
          <span className="font-medium">Testing Method Sequencing:</span> Next
          Generation
        </p>
        <p className="mb-8">
          <span className="font-medium">Gene Panel Cardiomyopathy Panel:</span>{" "}
          Comprehensive
        </p>
        <p className="font-medium mb-4">Testing Description:</p>
        <p className="text-text-secondary">
          The genetic analysis was performed using high-throughput Next
          Generation Sequencing (NGS) on a blood sample. DNA was extracted using
          the QIAamp DNA Blood Mini Kit. Sequencing was carried out on an
          Illumina HiSeq 4000 platform, covering all coding regions and
          intron-exon boundaries of the genes listed.
        </p>
      </div>

      <div className="bg-foreground p-10 rounded-lg shadow-lg">
        <div className="flex flex-col gap-4 justify-start w-full sm:w-auto">
          <div className="flex justify-between items-center gap-6">
            <div className="flex items-center gap-2 text-text-primary">
              <FilePen className="text-blue-primary w-8 h-8" />
              <h3 className="font-semibold text-md">Update Report Status</h3>
            </div>
            <PriviewReportDialog
              name={patient?.name ?? ""}
              sex={patient?.sex ?? ""}
              dob={patient?.id}
              listSelVariants={listSelVariants}
              listRecommendation={listRec}
              listConclusion={listConc}
              ensembleVersion={ensembleVersion}
              ensembleRestVersion={ensembleRestVersion}
            />
          </div>
          <div className="flex justify-between items-center gap-6">

            <Select onValueChange={setNewStatus}>
              <SelectTrigger className="w-full]">
                <SelectValue placeholder="Select Report Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Report Status</SelectLabel>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="process">In Process</SelectItem>
                  <SelectItem value="wait">Waiting for Approval</SelectItem>
                  <SelectItem value="complete">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button
              variant="borderSecondary"
              size="md"
              icon={<Save className="w-5 h-5" />}
              onClick={handleUpdateReportStatus}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 justify-start w-full sm:w-auto mt-10">
          <div className="flex items-center gap-2 text-text-primary">
            <FileCheck2 className="text-blue-primary w-8 h-8" />
            <h3 className="font-semibold text-md">
              Approved By: <span>Example Name</span>
            </h3>
          </div>
        </div>

        <div className="mt-6">
          <ButtonFormatReport
            id_patient={id_patient}
            listSelVariants={listSelVariants}
            variantInter={variantInter}
            listRec={listRec}
            listConc={listConc}
            ensembleVersion={ensembleVersion}
            ensembleRestVersion={ensembleRestVersion}
          />
        </div>
      </div>
    </div>
  );
};

export default InformationApprovalReport;
