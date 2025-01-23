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

interface ConservationScoresProops {
  data?: TranscriptConsequence[];
}

interface FeatureGroup {
  groupName: string;
  features: { key: keyof TranscriptConsequence; label: string }[];
  color: string; // Tailwind CSS class for background color
}

const ConservationScores: React.FC<ConservationScoresProops> = ({ data }) => {
  if (!data || data.length === 0) {
    return <div>No computational predictions available.</div>;
  }

  const groupedFeatures: FeatureGroup[] = [
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
    <div className="overflow-auto max-w-full overflow-x-auto max-h-[500px] overflow-y-auto mt-10">
      <Table>
        <thead>
          {/* Group Headers */}
          <TableRow className="text-sm">
            {groupedFeatures.map((group) => (
              <TableHead
                key={group.groupName}
                colSpan={group.features.length}
                className={`text-center ${group.color} border-2 border-border text-text-primary`}
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
                className={`${feature.color} border-2 border-border text-text-primary`}
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
                    className={`${feature.color} border border-border text-text-secondary`}
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

export default ConservationScores;
