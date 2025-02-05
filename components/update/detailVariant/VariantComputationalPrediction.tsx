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

interface VariantVariantComputationalPredictionProops {
  data?: TranscriptConsequence[];
}

interface FeatureGroup {
  groupName: string;
  features: { key: keyof TranscriptConsequence; label: string }[];
  color: string; // Tailwind CSS class for background color
}

const VariantComputationalPrediction: React.FC<VariantVariantComputationalPredictionProops> = ({
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
      color: "bg-table-yellow",
    },
    {
      groupName: "Location Information",
      features: [
        { key: "location", label: "Location" },
        { key: "distance", label: "Distance" },
        { key: "strand", label: "Strand" },
      ],
      color: "bg-table-red",
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
    <div className="overflow-x-auto mt-10">
      <div className="inline-block min-w-full overflow-hidden">
        <Table className="min-w-[800px]">
          <thead>
            {/* Group Headers */}
            <TableRow className="text-sm">
              {groupedFeatures.map((group) => (
                <TableHead
                  key={group.groupName}
                  colSpan={group.features.length}
                  className={`text-center ${group.color} border-2 border-background text-text-primary`}
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
                  className={`${feature.color} border-2 border-background text-text-primary`}
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
                      className={`${feature.color} border-2 border-background text-text-secondary`}
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
    </div>
  );
};

export default VariantComputationalPrediction;
