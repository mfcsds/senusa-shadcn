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

interface VariantFunctionalAnnotationsProops {
  data?: TranscriptConsequence[];
}

interface FeatureGroup {
  groupName: string;
  features: { key: keyof TranscriptConsequence; label: string }[];
  color: string; // Tailwind CSS class for background color
}

const FunctionalAnnotations: React.FC<VariantFunctionalAnnotationsProops> = ({
  data,
}) => {
  if (!data || data.length === 0) {
    return <div>No computational predictions available.</div>;
  }

  const groupedFeatures: FeatureGroup[] = [
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
  ];

  // Flatten the features for easy access to the total number of columns
  const allFeatures = groupedFeatures.flatMap((group) =>
    group.features.map((feature) => ({
      ...feature,
      color: group.color,
    }))
  );

  return (
    <div className="overflow-auto w-full overflow-x-auto max-h-[500px] overflow-y-auto mt-10">
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

export default FunctionalAnnotations;
