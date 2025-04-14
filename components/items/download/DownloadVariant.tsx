"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import React, { useState } from "react";

interface DownloadReportProops {
  hgvs: string;
  data?: any;
}

const DownloadVariant: React.FC<DownloadReportProops> = ({ hgvs, data }) => {
  const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
  const [isDownloadingXML, setIsDownloadingXML] = useState(false);

  const fetchAPIData = async (hgvs: string) => {
    const requestBody = {
      body: JSON.stringify({ variants: [hgvs] }),
    };

    const response = await fetch(
      "https://iti7fmrlmj.execute-api.us-east-1.amazonaws.com/Dev/variant_extract",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      }
    );

    const result = await response.json();
    const apiData = JSON.parse(result.body);
    return apiData[0];
  };

  const generateCSV = async () => {
    setIsDownloadingCSV(true);
    try {
      const apiData = await fetchAPIData(hgvs);

      const row = {
        id: data?.id || "N/A",
        id_patient: data?.id_patient || "N/A",
        id_report: data?.id_report || "N/A",
        chrom: data?.chrom || "N/A",
        pos: data?.pos || "N/A",
        ref: data?.ref || "N/A",
        alt: data?.alt || "N/A",
        hgvs: data?.hgvs || hgvs,
        api_clin_sig:
          apiData?.colocated_variants?.[0]?.clin_sig?.join("; ") || "N/A",
        api_frequencies:
          JSON.stringify(apiData?.colocated_variants?.[0]?.frequencies) ||
          "N/A",
        api_variant_class: apiData?.variant_class || "N/A",
        api_consequence: apiData?.most_severe_consequence || "N/A",
        api_gene_symbol:
          apiData?.transcript_consequences?.[0]?.gene_symbol || "N/A",
        api_gene_id: apiData?.transcript_consequences?.[0]?.gene_id || "N/A",
        api_impact: apiData?.transcript_consequences?.[0]?.impact || "N/A",
        api_protein_id:
          apiData?.transcript_consequences?.[0]?.protein_id || "N/A",
        api_hgvsc: apiData?.transcript_consequences?.[0]?.hgvsc || "N/A",
        api_hgvsp: apiData?.transcript_consequences?.[0]?.hgvsp || "N/A",
      };

      const headers = Object.keys(row).join(",");
      const values = Object.values(row).join(",");

      const csvContent = `${headers}\n${values}`;
      const blob = new Blob([csvContent], { type: "text/csv" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `variant_${hgvs}.csv`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("CSV download failed", error);
    } finally {
      setIsDownloadingCSV(false);
    }
  };

  const generateXML = async () => {
    setIsDownloadingXML(true);
    try {
      const apiData = await fetchAPIData(hgvs);

      const row = {
        id: data?.id || "N/A",
        id_patient: data?.id_patient || "N/A",
        id_report: data?.id_report || "N/A",
        chrom: data?.chrom || "N/A",
        pos: data?.pos || "N/A",
        ref: data?.ref || "N/A",
        alt: data?.alt || "N/A",
        hgvs: data?.hgvs || hgvs,
        api_clin_sig:
          apiData?.colocated_variants?.[0]?.clin_sig?.join("; ") || "N/A",
        api_frequencies:
          JSON.stringify(apiData?.colocated_variants?.[0]?.frequencies) ||
          "N/A",
        api_variant_class: apiData?.variant_class || "N/A",
        api_consequence: apiData?.most_severe_consequence || "N/A",
        api_gene_symbol:
          apiData?.transcript_consequences?.[0]?.gene_symbol || "N/A",
        api_gene_id: apiData?.transcript_consequences?.[0]?.gene_id || "N/A",
        api_impact: apiData?.transcript_consequences?.[0]?.impact || "N/A",
        api_protein_id:
          apiData?.transcript_consequences?.[0]?.protein_id || "N/A",
        api_hgvsc: apiData?.transcript_consequences?.[0]?.hgvsc || "N/A",
        api_hgvsp: apiData?.transcript_consequences?.[0]?.hgvsp || "N/A",
      };

      const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<VariantReport reportId="${row.id_report}" patientId="${row.id_patient}">
  <Variant>
    ${Object.entries(row)
      .map(([key, value]) => `    <${key}>${value}</${key}>`)
      .join("\n")}
  </Variant>
</VariantReport>`;

      const blob = new Blob([xmlContent], { type: "application/xml" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `variant_${hgvs}.xml`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("XML download failed", error);
    } finally {
      setIsDownloadingXML(false);
    }
  };

  return (
    <div className="flex p-5 flex-row items-center justify-between border border-1 shadow-sm rounded-sm">
      <div className="border-l-2 border-l-red-500 bg-gray-50 pr-10 rounded-r-md shadow-sm">
        <p className="text-lg p-3 rounded-sm">{hgvs}</p>
      </div>

      <div className="flex flex-row mr-10">
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>Download Format</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-row gap-2">
                <Button
                  variant={"outline"}
                  onClick={generateCSV}
                  disabled={isDownloadingCSV}
                >
                  {isDownloadingCSV ? "Downloading..." : "CSV"}
                </Button>
                <Button
                  variant={"outline"}
                  onClick={generateXML}
                  disabled={isDownloadingXML}
                >
                  {isDownloadingXML ? "Downloading..." : "XML"}
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default DownloadVariant;
