"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Variant,
  VariantInterpretation,
  VariantRawData,
  VcfData,
} from "@/utils/object";
import {
  generateHGVS,
  extractZygosity,
  fetchVariantDetails,
  fetchVariantDetails2,
  generateVariantInterpretation,
  generateVariantSampleID,
  fetchVariantDetails3,
} from "@/utils/function";
import { Button } from "../ui/button";
import { Ellipsis, PlusCircle, TableOfContents } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { listVcfdata } from "@/src/graphql/queries";
import LabelAndDescription from "./LabelAndDescription";
import { downloadData } from "aws-amplify/storage";
import {
  createSelectedVariant,
  createVariantInterpretation,
} from "@/src/graphql/mutations";

import { Select, SelectTrigger } from "../ui/select";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
} from "@radix-ui/react-select";

import { generateClient } from "aws-amplify/api";
import { CreateSelectedVariantInput, SelectedVariant } from "@/src/API";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import VariantInformationModal from "./VariantInformationModal";

interface SelectVariantProops {
  patientid: string | null;
  id_report: string | null;
}

const SelectVariant: React.FC<SelectVariantProops> = ({
  patientid,
  id_report,
}) => {
  const tempColumns = [
    { header: "Gene", width: "75px", dataKey: "gene_symbol" },
    { header: "Variant Detail", width: "120px", dataKey: "hgvs" },
    { header: "Zygosity", width: "80px", dataKey: "zygosity" },
    { header: "Global Allele", width: "70px", dataKey: "globalallele" },

    { header: "Gnomade", width: "50px", dataKey: "gnomade" },
    { header: "Gnomadg", width: "50px", dataKey: "gnomadg" },
    { header: "Clinical Sign", width: "140px", dataKey: "clinicalSign" },
    {
      header: "Most Severe Consequences",
      width: "180px",
      dataKey: "severeconsequence",
    },
    { header: "rsID", width: "100px", dataKey: "rsID" },
    { header: "Sift Score", width: "100px", dataKey: "sift_score" },
    { header: "Sift Prediction", width: "100px", dataKey: "sift_prediction" },
    { header: "Phenotypes", width: "200px", dataKey: "phenotypes" },
    { header: "Action", width: "80px", dataKey: "action" },
  ];

  const [vcfData, setVCFData] = useState<VcfData[]>([]);

  const [columns, setColumns] = useState(tempColumns);
  const [error, setError] = useState<string | null>(null);
  const [variantItem, setVariantList] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);

  // State variables for filtering and sorting
  const [filterClinicalSign, setFilterClinicalSign] = useState("");
  const [filterZygosity, setFilterZygosity] = useState("");
  const [sortGlobalAlleleAsc, setSortGlobalAlleleAsc] = useState(false);
  // **Added state variable for Phenotypes filter**
  const [filterPhenotypes, setFilterPhenotypes] = useState("");
  const client = generateClient();

  const [selectedVariant, setSelectedVariant] = useState<Variant>();

  const fetchVCFData = async () => {
    try {
      const result = await client.graphql({
        query: listVcfdata,
        variables: { filter: { id_patient: { eq: patientid } } },
      });
      setVCFData(result.data.listVcfdata.items as VcfData[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVCFData();
  }, []);

  const [selectedVCF, setSelectedVCF] = useState<VcfData | null>(null);
  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [vcfContent, setVcfContent] = useState("");
  // Handle VCF selection change
  const handleVCFSelection = (vcfId: string) => {
    // Find the selected VCF data based on the ID
    const selected = vcfData.find((item) => item.id === vcfId);
    setSelectedVCF(selected ?? null);
    setError(null);
    readSelectedVCF();
    // setVariantList([]); // Clear previous variant list
    // setColumns(tempColumns); // Reset columns
  };

  const readSelectedVCF = async () => {
    setLoading(true);
    try {
      const downloadResult = await downloadData({
        path: selectedVCF?.pathfile ?? "",
      }).result;

      if (!downloadResult || !downloadResult.body) {
        throw new Error("Failed to download file from AWS.");
      }
      const blob = await downloadResult.body.blob();
      const file = new File([blob], "downloaded.vcf", { type: blob.type });

      if (file && file.name.endsWith(".vcf")) {
        const reader = new FileReader();

        reader.onload = async (e) => {
          const vcfText = e.target?.result as string;

          // Handle empty or unreadable file
          if (!vcfText || vcfText.trim() === "") {
            setError("The file appears to be empty or unreadable.");
            setLoading(false);
            return;
          }

          // Store the content of the VCF file in state for display
          setVcfContent(vcfText);

          const lines = vcfText.split("\n");
          const headerLine = lines.find((line: string) =>
            line.startsWith("#CHROM")
          );

          if (!headerLine) {
            setError("Invalid VCF file: Missing header line (#CHROM)");
            setLoading(false);
            return;
          }

          const dataLines = lines.filter(
            (line: string) => !line.startsWith("#") && line.trim() !== ""
          );

          const parsedVariants = dataLines.map(
            (line: string, index: number) => {
              const fields = line.split("\t");

              const variant: Variant = {
                id: generateVariantSampleID(),
                id_patient: patientid ?? "",
                id_vcf: selectedVCF?.id ?? "",
                chrom: fields[0],
                pos: fields[1],
                id_var: fields[2],
                ref: fields[3],
                alt: fields[4],
                qual: fields[5],
                filter: fields[6],
                info: fields[7],
                hgvs: "",
                variantReportID: id_report ?? "",
                zygosity: extractZygosity(fields[7]),
                globalallele: null, // Set to null to indicate loading state
                functional_impact: "",
                acmg: "",
                clinicalSign: null, // Set to null to indicate loading state
                gene_id: null,
                gene_symbol: null,
                severeconsequence: null,
                sift_score: null,
                sift_prediction: null,
                phenotypes: null,
                rsID: null,
                gnomade: null,
                gnomadg: null,
                alldesc: null,
              };
              variant.hgvs = generateHGVS(variant);
              return variant;
            }
          );

          setVariantList(parsedVariants);
          parsedVariants.forEach((variant, index) => {
            fetchVariantDetails2(variant).then((details) => {
              setVariantList((prevVariants) => {
                const newVariants = [...prevVariants];
                newVariants[index] = { ...newVariants[index], ...details };
                return newVariants;
              });
            });
          });
          setLoading(false); // Set loading to false after parsing the file
          // setLoading(false);
        };

        reader.onerror = () => {
          setError("Error reading the file. Please try again.");
          setLoading(false);
        };

        reader.readAsText(file);
      } else {
        setError("Please upload a valid .vcf file.");
        setLoading(false);
      }
    } catch (error) {
      setError(`Failed to download or parse the file: ${error}`);
      setLoading(false);
    }
  };

  const handleAddSelectedVariant = async (idvar: string) => {
    // Find the variant that matches the provided idvar
    const variant = variantItem.find((varItem) => varItem.id === idvar);

    // Check if variant is found before proceeding
    if (!variant) {
      console.error(`Variant with ID ${idvar} not found`);
      return;
    }

    // Create the selected variant object based on the Variant object
    // Create the selected variant object based on the Variant object
    const selectedVarItem: CreateSelectedVariantInput = {
      id: variant.id, // Generate or assign an ID if necessary
      id_patient: variant.id_patient ?? "", // Use empty string if null or undefined
      id_vcf: variant.id_vcf ?? "",
      id_report: variant.variantReportID, // Set default empty string value
      gene_id: variant.gene_id ?? "",
      gene_symbol: variant.gene_symbol ?? "",
      chrom: variant.chrom ?? "",
      pos: variant.pos ?? "",
      id_var: variant.id_var ?? "",
      ref: variant.ref ?? "",
      alt: variant.alt ?? "",
      qual: variant.qual ?? "",
      zigosity: variant.zygosity ?? "",
      global_allele: variant.globalallele ?? 0, // Assuming 0 as a default for number fields
      functional_impact: variant.functional_impact ?? "",
      acmg: variant.acmg ?? "",
      reviewer_class: "", // Default empty string value
      clinical_sign: variant.clinicalSign ?? "",
      hgvs: variant.hgvs ?? "",
      severe_consequence: variant.severeconsequence ?? "",
      sift_score: variant.sift_score ?? 0,
      sift_prediction: variant.sift_prediction ?? "",
      phenotypes: variant.phenotypes ?? "",
      rsID: variant.rsID ?? "", // Default // Current timestamp as ISO string
      gnomade: variant.gnomade,
      gnomadg: variant.gnomadg,
      alldesc: variant.alldesc,
    };

    const saveToAnalysisAndResult = async () => {
      try {
        const result = await client.graphql({
          query: createSelectedVariant,
          variables: { input: selectedVarItem },
        });
      } catch (error) {
        console.log(error);
      }
    };
    await saveToAnalysisAndResult();

    const newVarInter: VariantInterpretation = {
      id: selectedVarItem.id ?? "",
      text: "No Interpretation",
      hgvs: selectedVarItem.hgvs ?? "",
      id_patient: selectedVarItem.id_patient ?? "",
      id_report: selectedVarItem.id_report ?? "",
      id_varsample: selectedVarItem.id ?? "",
      gene: selectedVarItem.gene_symbol ?? "",
      alldesc: selectedVarItem.alldesc ?? "",
    };
    const saveInterpretation = async () => {
      try {
        const result = await client.graphql({
          query: createVariantInterpretation,
          variables: { input: newVarInter },
        });
      } catch (error) {
        console.log("Error Add Selected Variant Interpretation");
      }
    };
    await saveInterpretation();
  };

  const isOpenVarDetail = async (idvar: string) => {
    await setSelectedVariant(variantItem.find((item) => item.id === idvar));
    await setIsOpenDetailVariantDialog(!isOpenDetailVariantDialog);
  };

  // Function to render cell content based on dataKey
  const renderCellContent = (item: Variant, dataKey: string) => {
    switch (dataKey) {
      case "gene_symbol":
        return item.gene_symbol !== null ? (
          item.gene_symbol
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "hgvs":
        return <p className="text-wrap text-[11px] break-words">{item.hgvs}</p>;
      case "rsID":
        return item.rsID != null ? (
          <p className="text-wrap text-[11px] break-words">{item.rsID}</p>
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "zygosity":
        return item.zygosity;
      case "globalallele":
        return item.globalallele !== null ? (
          item.globalallele
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "clinicalSign":
        return item.clinicalSign !== null ? (
          item.clinicalSign
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "severeconsequence":
        return item.severeconsequence !== null ? (
          item.severeconsequence
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "gnomade":
        return item.gnomade !== null ? (
          item.gnomade
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "gnomadg":
        return item.gnomadg !== null ? (
          item.gnomadg
        ) : (
          <Skeleton className="h-4 w-full" />
        );

      case "sift_score":
        return item.sift_score !== null ? (
          item.sift_score
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "sift_prediction":
        return item.sift_prediction !== null ? (
          item.sift_prediction
        ) : (
          <Skeleton className="h-4 w-full" />
        );
      case "phenotypes":
        return item.phenotypes !== null ? (
          <p className="text-balance">{item.phenotypes}</p>
        ) : (
          <Skeleton className="h-4 w-full"></Skeleton>
        );
      case "action":
        return (
          <div className="flex flex-row">
            <Button variant={"ghost"} onClick={(e) => isOpenVarDetail(item.id)}>
              <TableOfContents className="w-4 h-4 text-gray-600" />
            </Button>
            <Button
              onClick={(e) => handleAddSelectedVariant(item.id)}
              variant={"ghost"}
              className="hover:text-green-400"
            >
              <PlusCircle className="w-4 h-4 text-gray-600" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-col w-full border rounded-md py-4 px-5 gap-4">
        <LabelAndDescription
          label="Choose Variant Data"
          desc="Select the Variant Call Files"
        ></LabelAndDescription>
        <select
          onChange={(e) => handleVCFSelection(e.target.value)}
          className="h-[70px] p-3 border rounded-md"
        >
          {vcfData.map((item, index) => (
            <option key={index} value={`${item.id}`}>
              {item.id}
            </option>
          ))}
        </select>
      </div>
      {/* <h1 className="text-xl font-bold mb-4">VCF File Uploader</h1>
      <input
        type="file"
        accept=".vcf"
        onChange={handleFileUpload}
        className="mb-4"
      /> */}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        columns.length > 0 && (
          <div className="w-full h-screen">
            {/* Filter and Sort Controls */}
            <div className="mb-4 flex items-center">
              <label htmlFor="clinicalSignFilter" className="mr-2">
                Filter by Clinical Sign:
              </label>
              <input
                id="clinicalSignFilter"
                type="text"
                value={filterClinicalSign}
                onChange={(e) => setFilterClinicalSign(e.target.value)}
                className="border rounded p-1 mr-4"
              />
              <label htmlFor="phenotypesFilter" className="mr-2">
                Filter by Phenotypes:
              </label>
              <input
                id="phenotypesFilter"
                type="text"
                value={filterPhenotypes}
                onChange={(e) => setFilterPhenotypes(e.target.value)}
                className="border rounded p-1 mr-4"
              />
              <label htmlFor="zygosityFilter" className="mr-2">
                Filter by Zygosity:
              </label>
              <select
                id="zygosityFilter"
                value={filterZygosity}
                onChange={(e) => setFilterZygosity(e.target.value)}
                className="border rounded p-1 mr-4"
              >
                <option value="">All</option>
                <option value="Heterozygous">Heterozygous</option>
                <option value="Homozygous">Homozygous</option>
              </select>
              <button
                onClick={() => setSortGlobalAlleleAsc((prev) => !prev)}
                className="border rounded p-1"
              >
                Sort Global Allele {sortGlobalAlleleAsc ? "▲" : "▼"}
              </button>
            </div>

            <div className="overflow-x-auto">
              <Table
                className="table-auto border-collapse w-full"
                style={{ tableLayout: "fixed" }}
              >
                <TableHeader className="sticky top-0 bg-gray-100 z-10">
                  <TableRow className="text-xs text-black">
                    {columns.map((col, index) => (
                      <TableHead
                        key={index}
                        className="border py-2 text-left text-black font-semibold"
                        style={{ width: col.width }}
                      >
                        {col.header}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
              </Table>
            </div>
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 8rem)" }} // Adjusted for filter controls
            >
              <Table
                className="table-auto border-collapse w-full"
                style={{ tableLayout: "fixed" }}
              >
                <TableBody>
                  {variantItem
                    .filter((item) => {
                      // Filter by Clinical Sign
                      if (filterClinicalSign) {
                        if (!item.clinicalSign) return false;
                        if (
                          !item.clinicalSign
                            .toLowerCase()
                            .includes(filterClinicalSign.toLowerCase())
                        )
                          return false;
                      }
                      // **Filter by Phenotypes**
                      if (filterPhenotypes) {
                        if (!item.phenotypes) return false;
                        if (
                          !item.phenotypes
                            .toLowerCase()
                            .includes(filterPhenotypes.toLowerCase())
                        )
                          return false;
                      }
                      // Filter by Zygosity
                      if (filterZygosity && item.zygosity !== filterZygosity) {
                        return false;
                      }
                      return true;
                    })
                    .sort((a, b) => {
                      const gaA = a.globalallele;
                      const gaB = b.globalallele;
                      if (gaA == null && gaB == null) return 0;
                      if (gaA == null) return 1;
                      if (gaB == null) return -1;
                      return sortGlobalAlleleAsc ? gaA - gaB : gaB - gaA;
                    })
                    .map((item, index) => (
                      <TableRow
                        key={index}
                        className="text-wrap text-[10px] break-words"
                      >
                        {columns.map((col, colIndex) => (
                          <TableCell
                            key={colIndex}
                            className="border px-4 py-2 text-wrap break-words"
                            style={{ width: col.width }}
                          >
                            {renderCellContent(item, col.dataKey)}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )
      )}

      {/* Variant Interpretation Modal */}
      <Dialog
        open={isOpenDetailVariantDialog}
        onOpenChange={() => setIsOpenDetailVariantDialog(false)}
      >
        {/* <div className="fixed inset-0 bg-black bg-opacity-0 pointer-events-none"></div> */}
        <DialogContent className="max-w-7xl max-h-4xl ">
          <DialogTitle>Variant Information</DialogTitle>
          <DialogDescription>
            Here is the detailed information about the variant.
          </DialogDescription>
          {/* Pass the hgvsNotation as a prop to the VariantInformationModal */}
          <VariantInformationModal hgvsNotation={`${selectedVariant?.hgvs}`} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SelectVariant;
