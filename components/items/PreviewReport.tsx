"use client";
import dynamic from "next/dynamic";
// import { PDFDocument, rgb, StandardFonts, PDFPage, PDFFont } from "pdf-lib";

// import handleGeneratePDF from "@/components/HandleGeneratePDF";
// import DynamicGeneratePDF from "../DynamicGeneratePDF";

const DynamicGeneratePDF = dynamic(() => import("../DynamicGeneratePDF"), {
  ssr: false,
});

import React, { useEffect, useState } from "react";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
Amplify.configure(config);
import { generateClient } from "aws-amplify/api";
import { listSelectedVariants } from "@/src/graphql/queries";
import { listVariantInterpretations } from "@/src/graphql/queries";
import { listRecommendations, listConclusions } from "@/src/graphql/queries";
import { getPatient } from "@/src/graphql/queries";
import { getVariantReport } from "@/src/graphql/queries";
import { Building2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Conclusion,
  Patient,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
  VariantReportData,
} from "@/utils/object";
import LabelAndDescription from "./LabelAndDescription";
import {
  ReportStatus,
  ReportStatusStringToNumber,
} from "@/utils/DateHelperFunction";
import { updateVariantReport } from "@/src/graphql/mutations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

interface PreviewReportProops {
  id_report: string;
  id_patient: string;
}

const getGeneColor = (item: SelectedVariant) => {
  switch (item.gene_symbol) {
    case "BRCA1":
    case "BRCA2":
    case "TP53":
    case "PTEN":
    case "CDH1":
    case "STK11":
    case "CHEK2":
    case "PALB2":
    case "ATM":
    case "MLH1":
    case "MSH2":
    case "MSH6":
    case "PMS2":
    case "RAD51C":
    case "RAD51D":
    case "BARD1":
      return "border-red-600 ";
    default:
      return "border-gray-300"; // Default color if value doesn't match
  }
};
const getTextGeneColor = (item: SelectedVariant) => {
  switch (item.gene_symbol) {
    case "BRCA1":
    case "BRCA2":
    case "TP53":
    case "PTEN":
    case "CDH1":
    case "STK11":
    case "CHEK2":
    case "PALB2":
    case "ATM":
    case "MLH1":
    case "MSH2":
    case "MSH6":
    case "PMS2":
    case "RAD51C":
    case "RAD51D":
    case "BARD1":
      return "text-red-600 font-semibold ";
    default:
      return "text-gray-600"; // Default color if value doesn't match
  }
};

const getBadgeColor = (item: SelectedVariant) => {
  switch (item.acmg) {
    case "Pathogenic":
      return "border-red-300 bg-red-50 text-gray-700";
    case "Likely Pathogenic":
      return "border-red-300 bg-red-50 text-gray-700";
    case "Likely Benign":
      return "border-green-300 bg-green-50"; // Red for pathogenic
    case "Benign":
      return "border-green-300 bg-green-50"; // Green for benign
    case "VUS":
      return "border-yellow-200 bg-yellow-50"; // Yellow for VUS
    default:
      return "border-gray-500"; // Default color if value doesn't match
  }
};

const PreviewReport: React.FC<PreviewReportProops> = ({
  id_report,
  id_patient,
}) => {
  const client = generateClient();
  const [ensembleVersion, setEnsembleVersion] = useState<string>("");

  const [ensembleRestVersion, setEnsembleRestVersion] = useState<string>("");

  const generateXML = () => {
    // Create XML root
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const rootStart = "<VariantReport>";
    const rootEnd = "</VariantReport>";

    // Generate XML for each variant
    const variantsXML = listSelVariants
      .map((variant) => {
        const interpretation =
          variantInter.find(
            (inter) => inter.gene_symbol === variant.gene_symbol
          )?.text || "No interpretation available";

        return `
          <Variant>
            <Detail>${variant.gene_symbol} (${variant.gene_id}): ${variant.hgvs}</Detail>
            <Zygosity>${variant.zygosity}</Zygosity>
            <ACMG>${variant.acmg}</ACMG>
            <Interpretation>${interpretation}</Interpretation>
          </Variant>`;
      })
      .join("");

    // Combine XML parts
    const xmlContent = `${xmlHeader}\n${rootStart}\n${variantsXML}\n${rootEnd}`;

    // Create a Blob and trigger download
    const blob = new Blob([xmlContent], { type: "application/xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "variant_analysis.xml";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  const generateCSV = () => {
    // Define CSV headers
    const headers = ["Variant Detail", "Zygosity", "ACMG", "Interpretation"];

    // Map the data to rows
    const rows = listSelVariants.map((variant) => {
      return [
        `${variant.gene_symbol} (${variant.gene_id}): ${variant.hgvs}`,
        variant.zygosity,
        variant.acmg,
        variant.text_interpretation,
      ];
    });

    // Combine headers and rows into a CSV format
    const csvContent = [
      headers.join(","), // Join header row
      ...rows.map((row) => row.join(",")), // Join data rows
    ].join("\n");

    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "variant_analysis.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

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

  const [variantInter, setVariantInter] = useState<VariantInterpretation[]>([]);
  const [variantReport, setVariantReport] = useState<VariantReportData>();

  const [isPreviewReport, setIsPreviewReport] = useState(false);
  const [newStatus, setNewStatus] = useState("");

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
      console.log("error update status report");
    }
  };

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

  // const fetchVariantInterpretation = async () => {
  //   try {
  //     const result = await client.graphql({
  //       query: listVariantInterpretations,
  //       variables: { filter: { id_report: { eq: id_report } } },
  //     });
  //     await setVariantInter(
  //       result.data.listVariantInterpretations.items as VariantInterpretation[]
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const fetchPatient = async () => {
    try {
      const result = await client.graphql({
        query: getPatient,
        variables: { id: id_patient },
      });
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
        // await fetchVariantInterpretation();
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

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col min-fit">
        <Card>
          <CardHeader>
            <CardTitle>Preview and Approval</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/12">Report Status</TableHead>
                    <TableHead className="w-10/12">Approved By</TableHead>
                    <TableHead className="w-1/12">Preview Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="flex flex-col gap-4">
                        <LabelAndDescription
                          label="Current Report Status"
                          desc={`${ReportStatus(variantReport?.status ?? 0)}`}
                        ></LabelAndDescription>
                        <Separator></Separator>
                      </div>
                      <div className="flex flex-row gap-2 items-center">
                        <Select onValueChange={setNewStatus}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Report Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Report Status</SelectLabel>
                              <SelectItem value="draft">Draft</SelectItem>
                              <SelectItem value="process">
                                In Process
                              </SelectItem>
                              <SelectItem value="wait">
                                Waiting for Approval
                              </SelectItem>
                              <SelectItem value="complete">
                                Completed
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <Separator
                          orientation="vertical"
                          className="h-5"
                        ></Separator>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant={"ghost"}
                                className="hover:bg-green-500 hover:text-white"
                                onClick={(e) => handleUpdateReportStatus()}
                              >
                                <small>
                                  <Save className="w-5 h-5"></Save>
                                </small>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Save Change Status</TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <div className="flex flex-row items-center gap-2">
                        <Button
                          variant={"outline"}
                          onClick={(e) => setIsPreviewReport(!isPreviewReport)}
                        >
                          Preview Report
                        </Button>
                        <Separator
                          orientation="vertical"
                          className="h-5"
                        ></Separator>
                        <Accordion type="single" collapsible>
                          <AccordionItem value="item-1">
                            <AccordionTrigger>Download Format</AccordionTrigger>
                            <AccordionContent>
                              <div className="flex flex-row gap-2">
                                <div className="flex flex-row gap-1">
                                  {/* <Button
                                    variant={"outline"}
                                    onClick={(e) => generatePDF()}
                                  >
                                    PDF
                                  </Button> */}
                                  <DynamicGeneratePDF
                                    patient={patient}
                                    listConc={listConc}
                                    listRec={listRec}
                                    variantInter={variantInter}
                                    listSelVariants={listSelVariants}
                                    ensembleRestVersion={ensembleRestVersion}
                                    ensembleVersion={ensembleVersion}
                                  ></DynamicGeneratePDF>
                                  <Button
                                    variant={"outline"}
                                    onClick={generateCSV}
                                  >
                                    CSV
                                  </Button>
                                  <Button
                                    variant={"outline"}
                                    onClick={generateXML}
                                  >
                                    XML
                                  </Button>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {isPreviewReport && (
        <div className="p-8 border overflow-y-auto h-[700px] w-10/12 mt-10 shadow-xl">
          <div className="bg-white p-6 rounded-lg ">
            <div className="flex justify-between items-center mb-8">
              <div>
                <Building2 className="w-[65px] h-[65px] py-2 items-center"></Building2>
                {/* <Image
              src="/assets/logo.png"
              alt="Lab Logo"
              width={64}
              height={64}
              className="py-2 items-center"
            /> */}
                <h2 className="font-bold text-gray-800">Lab. Company</h2>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">
                  Variant Analysis Report
                </h1>
                <p>
                  Genusa Labs
                  <br />
                  123 Genome Way
                  <br />
                  Jakarta Pusat, Cempaka Putih, 62701
                  <br />
                  Jakarta, Indonesia
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Patient Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p>
                    <strong>Patient Detail</strong>
                  </p>
                  <p>Name: {patient?.name ?? ""}</p>
                  <p>Sex: {patient?.sex}</p>
                  <p>Date of Birth: {patient?.dob}</p>
                  <p>Sample: Blood</p>
                </div>
                <div>
                  <p>
                    <strong>Test Ordered By</strong>
                  </p>
                  <p>Name: Dr. Fulan</p>
                  <p>Organization: Amazing Hospital Centre</p>
                  <p>Phone: +6712 - 232 - 233</p>
                </div>
                <div>
                  <p>
                    <strong>Test Carried out By</strong>
                  </p>
                  <p>Genetic Counselor: Dr. Fulan</p>
                  <p>Laboratory: Lab. ID</p>
                  <p>Phone: +6712 - 232 - 233</p>
                  <p>Date of Test: 12-April-2024</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Executive Summary
              </h2>
              <p className="text-sm text-gray-600">
                This genetic testing report summarizes the findings from the
                sample provided. The analysis was focused on identifying
                variants associated with hereditary cardiomyopathy. The results
                include information on detected genetic variants, their
                classification, and potential clinical implications.
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Testing Material and Methods
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>Testing Method: Next Generation Sequencing (NGS)</li>
                <li>Gene Panel: Comprehensive Cardiomyopathy Panel</li>
                <li>
                  The genetic analysis was performed using high-throughput Next
                  Generation Sequencing (NGS) on a blood sample. DNA was
                  extracted using the QIAamp DNA Blood Mini Kit. Sequencing was
                  carried out on an Illumina HiSeq 4000 platform, covering all
                  coding regions and intron-exon boundaries of the genes listed.
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Result & Interpretations
              </h2>
              <Table className="min-w-full bg-white text-sm mb-4">
                <TableHeader className="bg-gray-900 ">
                  <TableRow className="border-b text-white">
                    <TableHead className="px-6 py-4 text-left font-medium text-white-900">
                      Variant Detail
                    </TableHead>
                    <TableHead className="px-6 py-4 text-left font-medium text-white-900">
                      Zygosity
                    </TableHead>

                    <TableHead className="px-6 py-4 text-left font-medium text-white-900">
                      ACMG
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listSelVariants.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>
                        {`${item.gene_symbol}(${item.gene_id}):${item.hgvs}`}
                      </TableCell>
                      <TableCell>{item.zygosity}</TableCell>
                      <TableCell>{item.acmg}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <p className="font-semibold pl-3">Variant Interpretation</p>

              <ul>
                {listSelVariants.map((item, index) => (
                  <li
                    key={index}
                    className="text-balance font-sans font-light text-justify my-3 mx-2 text-xm "
                  >
                    <strong className="font-extrabold">
                      {`(${item.gene_symbol}):${item.hgvs}`}:{" "}
                    </strong>
                    {item.text_interpretation}
                  </li>
                ))}
              </ul>
            </div>

            {/* Conclusion */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Conclusions
              </h2>
              {listConc.map((item, idx) => (
                <p key={idx} className="text-sm text-gray-600 text-justify">
                  {item.text}
                </p>
              ))}
            </div>

            {/* Recommendation */}
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Recommendation
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                {listRec.map((item, idx) => (
                  <li key={idx} className="text-justify font-light">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* <div className="bg-gray-200 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Counselor is Notes
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  <strong>MYH7 Variant:</strong> Given the benign nature of the
                  MYH7 variant, no immediate clinical action is required.
                  However, it is important to note that genetic factors are just
                  one aspect of disease risk.
                </li>
                <li>
                  <strong>TNNT2 Variant:</strong> The identification of the
                  pathogenic variant in TNNT2 suggests a significant risk for
                  hypertrophic cardiomyopathy. It is strongly recommended that
                  the patient engage in a detailed discussion with a
                  cardiologist. Screening of first-degree relatives may also be
                  considered.
                </li>
                <li>
                  <strong>TNNI3 Variant:</strong> The uncertainty associated
                  with the TNNI3 variant warrants cautious interpretation. We
                  recommend periodic review of the scientific literature and
                  potential re-evaluation of this variant is clinical
                  significance as new data emerge.
                </li>
              </ul>
            </div> */}

            <div className="flex flex-col">
              <h2>Database Info</h2>
              <p>{`Ensemble Software Release: ${ensembleVersion}; Ensemble Rest API: ${ensembleRestVersion}; Senusa Version: 1.00`}</p>
            </div>
            {/* <div className="bg-gray-200 p-4 rounded-md mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Supporting Evidence from Academic Journal
              </h2>
              <ul className="list-disc pl-5 text-gray-600">
                <li>
                  BRCA1 c.5266dupC: Smith et al., Journal of Medical Genetics,
                  2023.
                  {/* "Impact of recurrent BRCA1 mutations in breast cancer
              susceptibility." */}
            {/* </li>
                <li>
                  MLH1 c.3503_3504delTA: Lee et al., Clinical Cancer Research,
                  2022. */}
            {/* "Genetic landscape of Lynch syndrome: early detection and new
              treatments." */}
            {/* </li>
              </ul>
            </div> */}

            <div className="flex justify-between items-center mt-8">
              <div className="text-center">
                <p className="font-semibold">Rina Maheswari, M.Sc., Ph.D.</p>
                <p>Head Laboratory</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Lia Kartika, M.D.</p>
                <p>Genetic Counsellor</p>
              </div>
              <div className="text-center">
                <p className="font-semibold">Putu Bagus, M.G.C</p>
                <p>Clinical Pathology</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreviewReport;
