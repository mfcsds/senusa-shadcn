"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Variant } from "@/utils/object";
import {
  generateHGVS,
  extractZygosity,
  fetchVariantDetails,
  generateVCFDataID,
} from "@/utils/function";
import { Skeleton } from "@/components/ui/skeleton";
import { generateClient } from "aws-amplify/api";
import { createVariant } from "@/src/graphql/mutations";
import { CreateVariantInput } from "@/src/API";
import { Button } from "../ui/button";

interface VCFUploaderProops {
  id_patient: string;
}

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

Amplify.configure(config);

const VCFUploader: React.FC<VCFUploaderProops> = ({ id_patient }) => {
  const tempColumns = [
    { header: "Patient ID", width: "60px", dataKey: "id_patient" },
    { header: "Variant VCF", width: "60px", dataKey: "id_vcf" },
    { header: "Zygosity", width: "70px", dataKey: "zygosity" },
    { header: "POS", width: "20px", dataKey: "pos" },
    { header: "ID", width: "20px", dataKey: "id" },
    { header: "REF", width: "20px", dataKey: "ref" },
    { header: "ALT", width: "20px", dataKey: "alt" },
    { header: "QUAL", width: "20px", dataKey: "qual" },
    { header: "INFO", width: "20px", dataKey: "info" },
  ];

  const [columns, setColumns] = useState(tempColumns);
  const [error, setError] = useState<string | null>(null);
  const [variantItem, setVariantList] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);
  const [vcfID, setVCFID] = useState("");
  const [progress, setProgress] = useState(0); // New state to track progress

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    // Reset state when a new file is uploaded
    setColumns([]);
    setVariantList([]);
    setError(null);
    setLoading(true);
    const vcfID = generateVCFDataID();
    if (file && file.name.endsWith(".vcf")) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const vcfText = e.target?.result as string;
        // If file is empty or unreadable, show error
        if (!vcfText || vcfText.trim() === "") {
          setError("The file appears to be empty or unreadable.");
          setLoading(false);
          return;
        }
        const lines = vcfText.split("\n");
        const headerLine = lines.find((line: string) =>
          line.startsWith("#CHROM")
        );
        if (headerLine) {
          setColumns(tempColumns);
        } else {
          setError("Invalid VCF file: Missing header line (#CHROM)");
          setLoading(false);
          return;
        }
        const dataLines = lines.filter(
          (line: string) => !line.startsWith("#") && line.trim() !== ""
        );

        const parsedVariants = dataLines.map((line: string, index: number) => {
          const fields = line.split("\t");
          const variant: Variant = {
            id: `variant-${index}`,
            id_patient: id_patient,
            id_vcf: vcfID ?? " Hallo",
            chrom: fields[0],
            pos: fields[1],
            id_var: fields[2],
            ref: fields[3],
            alt: fields[4],
            qual: fields[5],
            filter: fields[6],
            info: fields[7],
            hgvs: "",
            variantReportID: "",
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
          };
          variant.hgvs = generateHGVS(variant);
          return variant;
        });

        setVariantList(parsedVariants);
        setLoading(false); // Set loading to false after parsing the file
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
  };

  const saveToDynamoDB = async () => {
    if (variantItem.length === 0) {
      alert("No variants to save. Please upload a VCF file first.");
      return;
    }

    setProgress(0); // Reset progress bar
    try {
      const client = generateClient();
      for (let i = 0; i < variantItem.length; i++) {
        const variant = variantItem[i];

        const input = {
          id: variant.id,
          id_vcf: variant.id_vcf,
          id_patient: variant.id_patient,
          filter: variant.filter,
          pos: variant.pos,
          id_var: variant.id_var,
          ref: variant.ref,
          alt: variant.alt,
          qual: variant.qual,
          info: variant.info,
          chrom: variant.chrom,
          hgvs: "",
        };

        await client.graphql({
          query: createVariant,
          variables: { input: input },
        });

        // Update progress after each successful save
        setProgress(((i + 1) / variantItem.length) * 100);
      }

      alert("Data successfully saved to DynamoDB!");
    } catch (error) {
      console.error("Error saving data to DynamoDB: ", error);
      alert("Failed to save data to DynamoDB.");
    }
  };

  const renderCellContent = (item: Variant, dataKey: string) => {
    switch (dataKey) {
      case "id_patient":
        return item.id_patient;
      case "id_vcf":
        return item.id_vcf;
      case "hgvs":
        return <p className="text-wrap text-[11px] break-words">{item.hgvs}</p>;
      case "zygosity":
        return item.zygosity;
      case "id":
        return item.id_var;
      case "pos":
        return item.pos;
      case "ref":
        return item.ref;
      case "alt":
        return item.alt;
      case "qual":
        return item.qual;
      case "info":
        return item.info;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input type="file" accept=".vcf" onChange={handleFileUpload} />
        <Button variant={"secondary"} onClick={saveToDynamoDB}>
          Save to Database
        </Button>
      </div>
      {variantItem.length > 0 && (
        <div className="mt-4">
          <label>Progress:</label>
          <progress value={progress} max="100" className="w-full"></progress>
          <p>{Math.round(progress)}% completed</p>
        </div>
      )}
      <h1 className="text-xl font-bold mb-4">VCF File Uploader</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        columns.length > 0 && (
          <div className="overflow-x-auto overflow-y-auto h-screen">
            <Table
              className="table-auto border-collapse w-full"
              style={{ tableLayout: "fixed" }}
            >
              <TableHeader>
                <TableRow>
                  {columns.map((col, index) => (
                    <TableHead key={index} style={{ width: col.width }}>
                      {col.header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {variantItem.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((col, colIndex) => (
                      <TableCell key={colIndex} style={{ width: col.width }}>
                        {renderCellContent(item, col.dataKey)}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )
      )}
    </div>
  );
};

export default VCFUploader;
