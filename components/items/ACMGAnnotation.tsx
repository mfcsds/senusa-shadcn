"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Switch } from "../ui/switch";
import { Badge } from "../ui/badge";

const ACMGAnnotation = () => {
  const [acmgData, setAcmgData] = useState([
    {
      status: true,
      criteria: "PVS1",
      description:
        "Null variant (nonsense, frameshift, canonical ±1 or 2 splice sites, initiation codon, single or multiexon deletion) in a gene where LOF is a known mechanism of disease.",
    },
    {
      status: true,
      criteria: "PS1",
      description:
        "Same amino acid change as a previously established pathogenic variant regardless of nucleotide change.",
    },
    {
      status: false,
      criteria: "PS2",
      description:
        "De novo (both maternity and paternity confirmed) in a patient with the disease and no family history.",
    },
    {
      status: false,
      criteria: "PS3",
      description:
        "Well-established in vitro or in vivo functional studies supportive of a damaging effect on the gene or gene product.",
    },
    {
      status: false,
      criteria: "PS4",
      description:
        "The prevalence of the variant in affected individuals is significantly increased compared with the prevalence in controls.",
    },
    {
      status: true,
      criteria: "PP1 Strong",
      description:
        "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease (Strong evidence).",
    },
    {
      status: true,
      criteria: "PM1",
      description:
        "Located in a mutational hot spot and/or critical and well-established functional domain (e.g., active site of an enzyme) without benign variation.",
    },
    {
      status: false,
      criteria: "PM2",
      description:
        "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes Project, or Exome Aggregation Consortium.",
    },
    {
      status: true,
      criteria: "PM3",
      description:
        "For recessive disorders, detected in trans with a pathogenic variant.",
    },
    {
      status: false,
      criteria: "PM4",
      description:
        "Protein length changes as a result of in-frame deletions/insertions in a nonrepeat region or stop-loss variants.",
    },
    {
      status: true,
      criteria: "PM5",
      description:
        "Novel missense change at an amino acid residue where a different missense change determined to be pathogenic has been seen before.",
    },
    {
      status: false,
      criteria: "PM6",
      description:
        "Assumed de novo, but without confirmation of paternity and maternity.",
    },
    {
      status: true,
      criteria: "PP1 Moderate",
      description:
        "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease (Moderate evidence).",
    },
    {
      status: true,
      criteria: "PP1 Cosegregation",
      description:
        "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease.",
    },
    {
      status: true,
      criteria: "PP2",
      description:
        "Missense variant in a gene that has a low rate of benign missense variation and in which missense variants are a common mechanism of disease.",
    },
    {
      status: false,
      criteria: "PP3",
      description:
        "Multiple lines of computational evidence support a deleterious effect on the gene or gene product (conservation, evolutionary, splicing impact, etc.).",
    },
    {
      status: true,
      criteria: "PP4",
      description:
        "Patient’s phenotype or family history is highly specific for a disease with a single genetic etiology.",
    },
    {
      status: false,
      criteria: "PP5",
      description:
        "Reputable source recently reports variant as pathogenic, but the evidence is not available to the laboratory to perform an independent evaluation.",
    },
    {
      status: false,
      criteria: "BP1",
      description:
        "Missense variant in a gene for which primarily truncating variants are known to cause disease.",
    },
    {
      status: true,
      criteria: "BP2",
      description:
        "Observed in trans with a pathogenic variant for a fully penetrant dominant gene/disorder or observed in cis with a pathogenic variant in any inheritance pattern.",
    },
    {
      status: false,
      criteria: "BP3",
      description:
        "In-frame deletions/insertions in a repetitive region without a known function.",
    },
    {
      status: false,
      criteria: "BP4",
      description:
        "Multiple lines of computational evidence suggest no impact on gene or gene product (conservation, evolutionary, splicing impact, etc.).",
    },
    {
      status: true,
      criteria: "BP5",
      description:
        "Variant found in a case with an alternate molecular basis for disease.",
    },
    {
      status: false,
      criteria: "BP6",
      description:
        "Reputable source recently reports variant as benign, but the evidence is not available to the laboratory to perform an independent evaluation.",
    },
    {
      status: false,
      criteria: "BP7",
      description:
        "A synonymous (silent) variant for which splicing prediction algorithms predict no impact to the splice consensus sequence nor the creation of a new splice site AND the nucleotide is not highly conserved.",
    },
    {
      status: true,
      criteria: "BS1",
      description: "Allele frequency is greater than expected for disorder.",
    },
    {
      status: false,
      criteria: "BS2",
      description:
        "Observed in a healthy adult individual for a recessive (homozygous), dominant (heterozygous), or X-linked (hemizygous) disorder, with full penetrance expected at an early age.",
    },
    {
      status: false,
      criteria: "BS3",
      description:
        "Well-established in vitro or in vivo functional studies show no damaging effect on protein function or splicing.",
    },
    {
      status: false,
      criteria: "BS4",
      description: "Lack of segregation in affected members of a family.",
    },
    {
      status: false,
      criteria: "BA1",
      description:
        "Allele frequency is >5% in Exome Sequencing Project, 1000 Genomes Project, or Exome Aggregation Consortium.",
    },
  ]);

  const [acmgClass, setACMGClass] = useState("VUS");
  // Function to determine ACMG classification
  const determineACMGClassification = () => {
    const criteriaMap = acmgData.reduce((acc, item) => {
      acc[item.criteria] = item.status;
      return acc;
    }, {} as Record<string, boolean>);

    if (
      criteriaMap["PVS1"] &&
      (criteriaMap["PS1"] ||
        criteriaMap["PS2"] ||
        criteriaMap["PS3"] ||
        criteriaMap["PS4"])
    ) {
      return "Pathogenic";
    }

    if (
      (criteriaMap["PM1"] && criteriaMap["PM2"]) ||
      (criteriaMap["PM1"] && criteriaMap["PM3"]) ||
      (criteriaMap["PM2"] && criteriaMap["PM3"])
    ) {
      return "Likely Pathogenic";
    }

    if (
      (criteriaMap["BP1"] && criteriaMap["BP2"]) ||
      (criteriaMap["BP2"] && criteriaMap["BS1"]) ||
      (criteriaMap["BP1"] && criteriaMap["BS1"])
    ) {
      return "Likely Benign";
    }

    if (criteriaMap["BA1"] || (criteriaMap["BS1"] && criteriaMap["BS2"])) {
      return "Benign";
    }

    return "VUS";
  };

  useEffect(() => {
    setACMGClass(determineACMGClassification());
  }, [acmgData]);

  // Handle switch toggle
  const handleToggle = (index: number) => {
    // Toggle the status of the specific item by index
    setAcmgData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, status: !item.status } : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full overflow-x-auto h-[500px] gap-3">
      <div className="flex flex-col border rounded-sm p-5">
        <div className="flex flex-row gap-3">
          <p className="font-semibold text-xl">ACMG Classification : </p>
          <p className="font-semibold text-xl">{acmgClass}</p>
        </div>
      </div>
      <Table className="min-w-full border border-gray-200 min-h-40 ">
        <TableHeader>
          <TableRow className="bg-gray-100 sticky top-0 z-10">
            <TableHead className="px-4 py-2 text-left text-xl font-semibold text-gray-700">
              Status
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xl font-semibold text-gray-700">
              Criteria
            </TableHead>
            <TableHead className="px-4 py-2 text-left text-xl font-semibold text-gray-700">
              Description
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {acmgData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="px-4 py-2 text-xl text-gray-600">
                <div className="flex flex-row w-[150px] justify-between items-center">
                  <Switch
                    id={item.criteria}
                    checked={item.status}
                    onCheckedChange={() => handleToggle(index)}
                  />
                  {item.status ? (
                    <Badge className="bg-rose-600 hover:bg-rose-600 rounded-xl">
                      Active
                    </Badge>
                  ) : (
                    <span className="text-gray-500">Not Active</span>
                  )}
                </div>
              </TableCell>
              <TableCell className="px-4 py-2 text-xl text-gray-600">
                {item.criteria}
              </TableCell>
              <TableCell className="px-4 py-2 text-xl text-gray-600">
                {item.status ? (
                  <p className="text-gray-900 text-xl">{item.description}</p>
                ) : (
                  <p className="text-gray-300 text-xl">{item.description}</p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ACMGAnnotation;
