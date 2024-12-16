"use client";
import React, { useEffect, useState } from "react";
import { downloadData } from "aws-amplify/storage";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { VariantRawData } from "@/utils/object";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { generateClient } from "aws-amplify/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  TableHead,
} from "../ui/table";

// Import Table Component
import { RawVariant, columns } from "../rawvariant/column";
import { DataTable } from "../rawvariant/data-table";

Amplify.configure(config);

interface VCFRawTableProps {
  filepath: string;
}

const VCFRawTable: React.FC<VCFRawTableProps> = ({ filepath }) => {
  const client = generateClient();
  const [variantRaw, setVariantRaw] = useState<RawVariant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [vcfContent, setVcfContent] = useState("");

  const readDownloadedVCFData = async () => {
    setLoading(true);
    try {
      const downloadResult = await downloadData({
        path: filepath,
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

          // Display the content of the file
          console.log("VCF File Content:", vcfText);

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
              const variant: RawVariant = {
                chrom: fields[0],
                pos: fields[1],
                id_var: fields[2],
                ref: fields[3],
                alt: fields[4],
                qual: fields[5],
                filter: fields[6],
                info: fields[7],
              };
              return variant;
            }
          );

          setVariantRaw(parsedVariants);
          setLoading(false);
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

  useEffect(() => {
    readDownloadedVCFData();
  }, []);

  return (
    <div className="flex flex-col">
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Variant Call Format (VCF) Data Overview</CardTitle>
          <CardDescription>
            Detailed View of Genomic Variants from VCF File
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col ">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <>
                <DataTable columns={columns} data={variantRaw}></DataTable>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VCFRawTable;
