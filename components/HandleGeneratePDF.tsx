import React from "react";
import ReactDOM from "react-dom/client";
import { BlobProvider } from "@react-pdf/renderer";
import MyPDFDocument from "../components/MyPDFDocument";
import {
  Patient,
  Conclusion,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
} from "@/utils/object"; // Adjust the import path to your types

interface GeneratePDFProps {
  patient: Patient;
  listConc: Conclusion[];
  listRec: Recommendation[];
  listSelVariants: SelectedVariant[];
  variantInter: VariantInterpretation[];
}

const handleGeneratePDF = ({
  patient,
  listConc,
  listRec,
  listSelVariants,
  variantInter,
}: GeneratePDFProps) => {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);

  root.render(
    <BlobProvider
      document={
        <MyPDFDocument
          patient={patient}
          listConc={listConc}
          listRec={listRec}
          listSelVariants={listSelVariants}
          variantInter={variantInter}
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

          // Clean up the container after the PDF is downloaded
          setTimeout(() => {
            root.unmount();
            document.body.removeChild(container);
          }, 0);
        }

        return null;
      }}
    </BlobProvider>
  );
};

export default handleGeneratePDF;
