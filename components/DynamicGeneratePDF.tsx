"use client";

import React from "react";
import ReactDOM from "react-dom/client";

import { BlobProvider } from "@react-pdf/renderer";
import MyPDFDocument from "@/components/MyPDFDocument"; // Path to your PDF document component
import {
  Patient,
  Conclusion,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
} from "@/utils/object"; // Adjust the path to your types

interface DynamicGeneratePDFProps {
  patient: Patient;
  listConc: Conclusion[];
  listRec: Recommendation[];
  listSelVariants: SelectedVariant[];
  variantInter: VariantInterpretation[];
  ensembleVersion: string;
  ensembleRestVersion: string;
}

const DynamicGeneratePDF: React.FC<DynamicGeneratePDFProps> = ({
  patient,
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
            patient={patient}
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

  return (
    <button onClick={handleGeneratePDF} className="btn btn-primary">
      Download PDF
    </button>
  );
};

export default DynamicGeneratePDF;
