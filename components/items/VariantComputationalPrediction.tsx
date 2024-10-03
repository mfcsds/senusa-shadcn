import React from "react";
import { TranscriptConsequence } from "@/utils/object";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";

interface VariantComputationalPredictionProps {
  data?: TranscriptConsequence[];
}

interface FeatureGroup {
  groupName: string;
  features: { key: keyof TranscriptConsequence; label: string }[];
  color: string; // Tailwind CSS class for background color
}

const VariantComputationalPrediction: React.FC<
  VariantComputationalPredictionProps
> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No computational predictions available.</div>;
  }

  const groupedFeatures: FeatureGroup[] = [
    {
      groupName: "Gene and Transcript Information",
      features: [
        { key: "transcript_id", label: "Transcript ID" },
        { key: "gene_symbol", label: "Gene Symbol" },
        { key: "gene_id", label: "Gene ID" },
        { key: "biotype", label: "Biotype" },
        { key: "canonical", label: "Canonical" },
        { key: "appris", label: "APPRIS" },
        { key: "tsl", label: "TSL" },
      ],
      color: "bg-blue-50",
    },
    {
      groupName: "Consequence Terms",
      features: [
        { key: "consequence_terms", label: "Consequence Terms" },
        { key: "impact", label: "Impact" },
      ],
      color: "bg-green-50",
    },
    {
      groupName: "Variant Impact and Functional Significance",
      features: [
        { key: "cadd_phred", label: "CADD Phred" },
        { key: "cadd_raw", label: "CADD Raw" },
        { key: "sift_prediction", label: "SIFT Prediction" },
        { key: "sift_score", label: "SIFT Score" },
        { key: "polyphen_prediction", label: "PolyPhen Prediction" },
        { key: "polyphen_score", label: "PolyPhen Score" },
        { key: "conservation", label: "Conservation" },
      ],
      color: "bg-yellow-50",
    },
    {
      groupName: "Location Information",
      features: [
        { key: "location", label: "Location" },
        { key: "distance", label: "Distance" },
        { key: "strand", label: "Strand" },
      ],
      color: "bg-red-50",
    },
    {
      groupName: "Transcript and Protein Impact",
      features: [
        { key: "hgvsc", label: "HGVSc" },
        { key: "hgvsp", label: "HGVSp" },
        { key: "aa", label: "Amino Acid Change" },
        { key: "protein_id", label: "Protein ID" },
        { key: "variant_allele", label: "Variant Allele" },
      ],
      color: "bg-purple-50",
    },
    {
      groupName: "Annotations and External Database References",
      features: [
        { key: "refseq_transcript_ids", label: "RefSeq Transcript IDs" },
        { key: "ccds", label: "CCDS" },
        { key: "swissprot", label: "SwissProt" },
        { key: "trembl", label: "TrEMBL" },
        { key: "uniparc", label: "UniParc" },
        { key: "uniprot_isoform", label: "UniProt Isoform" },
        { key: "gene_symbol_source", label: "Gene Symbol Source" },
        { key: "hgnc_id", label: "HGNC ID" },
        { key: "mane_select", label: "MANE Select" },
      ],
      color: "bg-gray-50",
    },
  ];

  // Flatten the features for easy access to the total number of columns
  const allFeatures = groupedFeatures.flatMap((group) =>
    group.features.map((feature) => ({
      ...feature,
      color: group.color,
    }))
  );

  return (
    <div className="overflow-auto max-w-[1200px] overflow-x-auto max-h-[500px] overflow-y-auto">
      <Table>
        <thead>
          {/* Group Headers */}
          <TableRow className="text-sm">
            {groupedFeatures.map((group) => (
              <TableHead
                key={group.groupName}
                colSpan={group.features.length}
                className={`text-center ${group.color} border border-gray-200`}
              >
                {group.groupName}
              </TableHead>
            ))}
          </TableRow>
          {/* Feature Headers */}
          <TableRow>
            {allFeatures.map((feature) => (
              <TableHead
                key={feature.key}
                className={`${feature.color} border border-gray-200`}
              >
                {feature.label}
              </TableHead>
            ))}
          </TableRow>
        </thead>
        <TableBody>
          {data.map((transcript, index) => (
            <TableRow className="text-sm" key={index}>
              {allFeatures.map((feature) => {
                let value = transcript[feature.key];

                if (Array.isArray(value)) {
                  value = value.join(", ");
                } else if (typeof value === "object" && value !== null) {
                  value = JSON.stringify(value);
                }

                return (
                  <TableCell
                    key={feature.key}
                    className={`${feature.color} border border-gray-200`}
                  >
                    {value !== undefined && value !== null && value !== ""
                      ? value
                      : "N/A"}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VariantComputationalPrediction;
