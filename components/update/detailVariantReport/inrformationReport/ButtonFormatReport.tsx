import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/update/ui/according";
import {
  FileSpreadsheet,
  FileCode,
  FileText,
} from "lucide-react";
import Button from "@/components/update/button/Button";
import {
  Conclusion,
  Patient,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
  VariantReportData,
} from "@/utils/object";
import dynamic from "next/dynamic";
import ReactDOM from "react-dom/client";
import { BlobProvider } from "@react-pdf/renderer";
import MyPDFDocument from "@/components/MyPDFDocument";

interface ButtonFormatProps {
  id_patient: string;
  listSelVariants: SelectedVariant[];
  variantInter: VariantInterpretation[];
  listConc: Conclusion[];
  listRec: Recommendation[];
  ensembleVersion: string;
  ensembleRestVersion: string;
}
const ButtonFormatReport: React.FC<ButtonFormatProps> = ({
  id_patient,
  listConc,
  listRec,
  listSelVariants,
  variantInter,
  ensembleVersion,
  ensembleRestVersion,
}) => {
  const handleGeneratePDF = () => {
    const container = document.createElement("div");
    document.body.appendChild(container);

    ReactDOM.createRoot(container).render(
      <BlobProvider
        document={
          <MyPDFDocument
            id_patient={id_patient}
            listConc={listConc}
            listRec={listRec}
            listSelVariants={listSelVariants}
            variantInter={variantInter}
            ensembleVersion={ensembleVersion}
            ensembleRestVersion={ensembleRestVersion}
          />
        }
      >
        {({ url, loading }: { url: string | null; loading: boolean }) => {
          if (loading) {
            console.log("Generating PDF...");
            return null;
          }

          if (url) {
            const link = document.createElement("a");
            link.href = url;
            link.download = "variant_analysis_report.pdf";
            link.click();

            // Clean up the container
            setTimeout(() => {
              document.body.removeChild(container);
            }, 0);
          }

          return null;
        }}
      </BlobProvider>
    );
  };

  const handleGenerateXML = () => {
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

  const handleGenerateCSV = () => {
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

  return (
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Download Format</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-row gap-2">
              <div className="flex flex-row gap-4">
                <Button
                  label="CSV"
                  variant="borderPrimary"
                  size="large"
                  icon={<FileSpreadsheet className="w-6 h-6" />}
                  onClick={handleGenerateCSV}
                />
                <Button
                  label="XML"
                  variant="borderSecondary"
                  size="large"
                  onClick={handleGenerateXML}
                  icon={<FileCode className="w-6 h-6" />}
                />
                <Button
                  label="PDF"
                  variant="borderDanger"
                  size="large"
                  onClick={handleGeneratePDF}
                  icon={<FileText className="w-6 h-6" />}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
  );
};

export default ButtonFormatReport;
