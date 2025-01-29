import React from "react";
import { TranscriptConsequence } from "@/utils/object";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/update/ui/table";

interface FunctionalAnnotationsProps {
  data?: TranscriptConsequence[];
}

interface FeatureGroup {
  groupName: string;
  features: { key: keyof TranscriptConsequence; label: string }[];
  color: string; // Tailwind CSS class for background color
}

const FunctionalAnnotations: React.FC<
  FunctionalAnnotationsProps
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
  ];

  // Flatten the features for easy access to the total number of columns
  const allFeatures = groupedFeatures.flatMap((group) =>
    group.features.map((feature) => ({
      ...feature,
      color: group.color,
    }))
  );

  return (
    <div className="max-w-full max-h-[500px] overflow-y-auto mt-10">
      <Table>
        <thead>
          {/* Group Headers */}
          <TableRow className="text-sm">
            {groupedFeatures.map((group) => (
              <TableHead
                key={group.groupName}
                colSpan={group.features.length}
                className={`text-center ${group.color} border-2 text-text-primary border-border`}
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

export default FunctionalAnnotations;
