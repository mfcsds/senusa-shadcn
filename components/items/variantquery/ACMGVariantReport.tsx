"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Switch } from "../../ui/switch";
import { Badge } from "../../ui/badge";
import { AcmgCriteria } from "@/utils/object";
import { generateClient } from "aws-amplify/api";
import { listAcmgAnnotations, getVariant } from "@/src/graphql/queries";
import { Button } from "@/components/ui/button";
import { Save, SaveAll } from "lucide-react";
import { createAcmgAnnotation } from "@/src/graphql/mutations";
import { generateACMGID } from "@/utils/function";
import { Variant } from "@/src/API";

interface ACMGVariantQueryProops {
  id_variantku?: string;
  hgvs?: string;
}

interface AcmgData {
  status: boolean;
  criteria: string;
  description: string;
}

function evaluateACMGClass(dataACMG: AcmgCriteria) {
  const pathogenicCriteria = [
    "PVS1",
    "PS1",
    "PS2",
    "PS3",
    "PS4",
    "PM1",
    "PM2",
    "PM3",
    "PM4",
    "PM5",
    "PM6",
    "PP1_Strong",
    "PP1_Moderate",
    "PP1_Cosegregation",
    "PP2",
    "PP3",
    "PP4",
    "PP5",
  ];

  const benignCriteria = [
    "BP1",
    "BP2",
    "BP3",
    "BP4",
    "BP5",
    "BP6",
    "BP7",
    "BS1",
    "BS2",
    "BS3",
    "BS4",
    "BA1",
  ];

  let pathogenicCount = 0;
  let benignCount = 0;

  // Count active criteria
  for (const key of Object.keys(dataACMG) as Array<keyof AcmgCriteria>) {
    if (dataACMG[key] === true) {
      if (pathogenicCriteria.includes(key)) pathogenicCount++;
      if (benignCriteria.includes(key)) benignCount++;
    }
  }

  // Evaluate ACMG classification based on active criteria
  if (pathogenicCount >= 2 && benignCount === 0) {
    return "Pathogenic";
  } else if (pathogenicCount === 1 && benignCount === 0) {
    return "Likely Pathogenic";
  } else if (pathogenicCount === 0 && benignCount === 0) {
    return "VUS"; // Variant of Uncertain Significance
  } else if (benignCount === 1 && pathogenicCount === 0) {
    return "Likely Benign";
  } else if (benignCount >= 2 && pathogenicCount === 0) {
    return "Benign";
  }

  return "VUS"; // Default case
}

const ACMGVariantReport: React.FC<ACMGVariantQueryProops> = ({
  id_variantku,
  hgvs,
}) => {
  const client = generateClient();
  const [dataACMG, setDataACMG] = useState<AcmgCriteria>();
  const [theVariant, setVariant] = useState<Variant>();
  const [historyListACMG, setHistoryListACMG] = useState<AcmgCriteria[]>([]);

  const [isSaveActive, setIsSaveActive] = useState(true);

  const fetchVariant = async () => {
    try {
      const result = await client.graphql({
        query: getVariant,
        variables: { id: id_variantku ?? "" },
      });
      setVariant((await result).data.getVariant as Variant);
    } catch (error) {}
  };

  const fetchACMGCriteria = async () => {
    try {
      const result = client.graphql({
        query: listAcmgAnnotations,
        variables: { filter: { id_variant: { eq: id_variantku } } },
      });
      const items = (await result).data.listAcmgAnnotations
        .items as AcmgCriteria[];
      if (items.length === 0) {
        // Ambil langsung ke database
        const apiUrl =
          "https://yyj4sdbsd6.execute-api.us-east-1.amazonaws.com/dev-acmg/classification";

        // Fetch ACMG classification from the API
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({
              variants: [hgvs ?? ""],
            }),
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch ACMG classification");
        }

        const data = await response.json();
        const acmgResults = JSON.parse(data.body);
        if (acmgResults && acmgResults.length > 0) {
          const acmgData = acmgResults[0];

          console.log("Masuk sini", acmgData);
          console.log("Label ACMG", acmgData.acmg);
          const acmgCriteria: AcmgCriteria = {
            id_variant: id_variantku,
            PVS1: acmgData?.PVS1 || false,
            PS1: acmgData?.PS1 || false,
            PS2: acmgData?.PS2 || false,
            PS3: acmgData?.PS3 || false,
            PS4: acmgData?.PS4 || false,
            PP1_Strong: acmgData?.PP1_Strong || false,
            PM1: acmgData?.PM1 || false,
            PM2: acmgData?.PM2 || false,
            PM3: acmgData?.PM3 || false,
            PM4: acmgData?.PM4 || false,
            PM5: acmgData?.PM5 || false,
            PM6: acmgData?.PM6 || false,
            PP1_Moderate: acmgData?.PP1_Moderate || false,
            PP1_Cosegregation: acmgData?.PP1_Cosegregation || false,
            PP2: acmgData?.PP2 || false,
            PP3: acmgData?.PP3 || false,
            PP4: acmgData?.PP4 || false,
            PP5: acmgData?.PP5 || false,
            BP1: acmgData?.BP1 || false,
            BP2: acmgData?.BP2 || false,
            BP3: acmgData?.BP3 || false,
            BP4: acmgData?.BP4 || false,
            BP5: acmgData?.BP5 || false,
            BP6: acmgData?.BP6 || false,
            BP7: acmgData?.BP7 || false,
            BS1: acmgData?.BS1 || false,
            BS2: acmgData?.BS2 || false,
            BS3: acmgData?.BS3 || false,
            BS4: acmgData?.BS4 || false,
            BA1: acmgData?.BA1 || false,
            acmg_class: acmgData?.acmg || "",
          };

          setDataACMG(acmgCriteria);
          console.log(dataACMG?.acmg_class);
          // Store ACMG Criteria if variant is saved
          const acmgResult = await client.graphql({
            query: createAcmgAnnotation,
            variables: { input: acmgCriteria },
          });
        }
      }

      if (items.length > 0) {
        setDataACMG(items[0]);
        setHistoryListACMG(items); // Set the current update as the first item in history
      }
    } catch (error) {
      console.log("Error fetching ACMG Criteria:", error);
    }
  };

  useEffect(() => {
    fetchVariant();
    fetchACMGCriteria();
  }, [id_variantku]);

  const getBadgeColor = () => {
    switch (dataACMG?.acmg_class) {
      case "Pathogenic":
        return "border-red-300 bg-red-50 text-gray-700";
      case "Likely Pathogenic":
        return "border-red-300 bg-red-50 text-gray-700";
      case "Likely Benign":
        return "border-green-300 bg-green-50"; // Red for pathogenic
      case "Benign":
        return "border-green-300 bg-green-50"; // Green for benign
      case "VUS":
        return "border-yellow-200 bg-yellow-50"; // Yellow for VUS
      default:
        return "border-gray-500"; // Default color if value doesn't match
    }
  };

  const [acmgData, setAcmgData] = useState<AcmgData[]>([]);

  useEffect(() => {
    if (dataACMG) {
      const updateDataACMG: AcmgData[] = [
        {
          status: dataACMG?.PVS1,
          criteria: "PVS1",
          description:
            "Null variant (nonsense, frameshift, canonical ±1 or 2 splice sites, initiation codon, single or multiexon deletion) in a gene where LOF is a known mechanism of disease.",
        },
        {
          status: dataACMG?.PS1,
          criteria: "PS1",
          description:
            "Same amino acid change as a previously established pathogenic variant regardless of nucleotide change.",
        },
        {
          status: dataACMG?.PS2,
          criteria: "PS2",
          description:
            "De novo (both maternity and paternity confirmed) in a patient with the disease and no family history.",
        },
        {
          status: dataACMG?.PS3,
          criteria: "PS3",
          description:
            "Well-established in vitro or in vivo functional studies supportive of a damaging effect on the gene or gene product.",
        },
        {
          status: dataACMG?.PS4,
          criteria: "PS4",
          description:
            "The prevalence of the variant in affected individuals is significantly increased compared with the prevalence in controls.",
        },
        {
          status: dataACMG?.PP1_Strong,
          criteria: "PP1 Strong",
          description:
            "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease (Strong evidence).",
        },
        {
          status: dataACMG?.PM1,
          criteria: "PM1",
          description:
            "Located in a mutational hot spot and/or critical and well-established functional domain (e.g., active site of an enzyme) without benign variation.",
        },
        {
          status: dataACMG?.PM2,
          criteria: "PM2",
          description:
            "Absent from controls (or at extremely low frequency if recessive) in Exome Sequencing Project, 1000 Genomes Project, or Exome Aggregation Consortium.",
        },
        {
          status: dataACMG?.PM3,
          criteria: "PM3",
          description:
            "For recessive disorders, detected in trans with a pathogenic variant.",
        },
        {
          status: dataACMG?.PM4,
          criteria: "PM4",
          description:
            "Protein length changes as a result of in-frame deletions/insertions in a nonrepeat region or stop-loss variants.",
        },
        {
          status: dataACMG?.PM5,
          criteria: "PM5",
          description:
            "Novel missense change at an amino acid residue where a different missense change determined to be pathogenic has been seen before.",
        },
        {
          status: dataACMG?.PM6,
          criteria: "PM6",
          description:
            "Assumed de novo, but without confirmation of paternity and maternity.",
        },
        {
          status: dataACMG?.PP1_Moderate,
          criteria: "PP1 Moderate",
          description:
            "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease (Moderate evidence).",
        },
        {
          status: dataACMG?.PP1_Cosegregation,
          criteria: "PP1",
          description:
            "Cosegregation with disease in multiple affected family members in a gene definitively known to cause the disease.",
        },
        {
          status: dataACMG?.PP2,
          criteria: "PP2",
          description:
            "Missense variant in a gene that has a low rate of benign missense variation and in which missense variants are a common mechanism of disease.",
        },
        {
          status: dataACMG?.PP3,
          criteria: "PP3",
          description:
            "Multiple lines of computational evidence support a deleterious effect on the gene or gene product (conservation, evolutionary, splicing impact, etc.).",
        },
        {
          status: dataACMG?.PP4,
          criteria: "PP4",
          description:
            "Patient’s phenotype or family history is highly specific for a disease with a single genetic etiology.",
        },
        {
          status: dataACMG?.PP5,
          criteria: "PP5",
          description:
            "Reputable source recently reports variant as pathogenic, but the evidence is not available to the laboratory to perform an independent evaluation.",
        },
        {
          status: dataACMG?.BP1,
          criteria: "BP1",
          description:
            "Missense variant in a gene for which primarily truncating variants are known to cause disease.",
        },
        {
          status: dataACMG?.BP2,
          criteria: "BP2",
          description:
            "Observed in trans with a pathogenic variant for a fully penetrant dominant gene/disorder or observed in cis with a pathogenic variant in any inheritance pattern.",
        },
        {
          status: dataACMG?.BP3,
          criteria: "BP3",
          description:
            "In-frame deletions/insertions in a repetitive region without a known function.",
        },
        {
          status: dataACMG?.BP4,
          criteria: "BP4",
          description:
            "Multiple lines of computational evidence suggest no impact on gene or gene product (conservation, evolutionary, splicing impact, etc.).",
        },
        {
          status: dataACMG?.BP5,
          criteria: "BP5",
          description:
            "Variant found in a case with an alternate molecular basis for disease.",
        },
        {
          status: dataACMG?.BP6,
          criteria: "BP6",
          description:
            "Reputable source recently reports variant as benign, but the evidence is not available to the laboratory to perform an independent evaluation.",
        },
        {
          status: dataACMG?.BP7,
          criteria: "BP7",
          description:
            "A synonymous (silent) variant for which splicing prediction algorithms predict no impact to the splice consensus sequence nor the creation of a new splice site AND the nucleotide is not highly conserved.",
        },
        {
          status: dataACMG?.BS1,
          criteria: "BS1",
          description:
            "Allele frequency is greater than expected for disorder.",
        },
        {
          status: dataACMG?.BS2,
          criteria: "BS2",
          description:
            "Observed in a healthy adult individual for a recessive (homozygous), dominant (heterozygous), or X-linked (hemizygous) disorder, with full penetrance expected at an early age.",
        },
        {
          status: dataACMG?.BS3,
          criteria: "BS3",
          description:
            "Well-established in vitro or in vivo functional studies show no damaging effect on protein function or splicing.",
        },
        {
          status: dataACMG?.BS4,
          criteria: "BS4",
          description: "Lack of segregation in affected members of a family.",
        },
        {
          status: dataACMG?.BA1,
          criteria: "BA1",
          description:
            "Allele frequency is >5% in Exome Sequencing Project, 1000 Genomes Project, or Exome Aggregation Consortium.",
        },
      ];

      setAcmgData(updateDataACMG);
    }
  }, [dataACMG]);

  const handleToggle = (index: number, checked: boolean) => {
    const updatedCriteria = acmgData[index].criteria; // Get the criteria key

    // Update the ACMG criteria state
    setAcmgData((prevData) => {
      const updatedData = [...prevData];
      updatedData[index].status = checked;
      return updatedData;
    });

    // Update the main ACMG data
    setDataACMG((prevACMG) => {
      if (prevACMG) {
        const updatedACMG = {
          ...prevACMG,
          [updatedCriteria]: checked,
        };
        const updatedClass = evaluateACMGClass(updatedACMG);

        setIsSaveActive(
          JSON.stringify(updatedACMG) !== JSON.stringify(historyListACMG[0])
        );
        return { ...updatedACMG, acmg_class: updatedClass };
      }
      return prevACMG;
    });
  };

  const handleSave = async () => {
    try {
      // Construct the new record using AcmgCriteria type structure
      // Construct newRecord with strict type enforcement
      const newRecord: AcmgCriteria = {
        // ...dataACMG, // Spread existing values
        id: generateACMGID() || "", // Fallback to empty string if undefined
        id_variant: id_variantku || "", // Ensure id_variant is never undefined
        acmg_class: dataACMG?.acmg_class || "", // Default to empty string if undefined
        PVS1: dataACMG?.PVS1 ?? false,
        PS1: dataACMG?.PS1 ?? false,
        PS2: dataACMG?.PS2 ?? false,
        PS3: dataACMG?.PS3 ?? false,
        PS4: dataACMG?.PS4 ?? false,
        PM1: dataACMG?.PM1 ?? false,
        PM2: dataACMG?.PM2 ?? false,
        PM3: dataACMG?.PM3 ?? false,
        PM4: dataACMG?.PM4 ?? false,
        PM5: dataACMG?.PM5 ?? false,
        PM6: dataACMG?.PM6 ?? false,
        PP1_Strong: dataACMG?.PP1_Strong ?? false, // Fixed issue here
        PP1_Moderate: dataACMG?.PP1_Moderate ?? false,
        PP1_Cosegregation: dataACMG?.PP1_Cosegregation ?? false,
        PP2: dataACMG?.PP2 ?? false,
        PP3: dataACMG?.PP3 ?? false,
        PP4: dataACMG?.PP4 ?? false,
        PP5: dataACMG?.PP5 ?? false,
        BP1: dataACMG?.BP1 ?? false,
        BP2: dataACMG?.BP2 ?? false,
        BP3: dataACMG?.BP3 ?? false,
        BP4: dataACMG?.BP4 ?? false,
        BP5: dataACMG?.BP5 ?? false,
        BP6: dataACMG?.BP6 ?? false,
        BP7: dataACMG?.BP7 ?? false,
        BA1: dataACMG?.BA1 ?? false,
        BS1: dataACMG?.BS1 ?? false,
        BS2: dataACMG?.BS2 ?? false,
        BS3: dataACMG?.BS3 ?? false,
        BS4: dataACMG?.BS4 ?? false,
      };

      // Save the record via GraphQL mutation
      const result = await client.graphql({
        query: createAcmgAnnotation,
        variables: { input: newRecord },
      });

      // Update history and reset save state
      setHistoryListACMG((prev) => [
        ...prev,
        result.data.createAcmgAnnotation as AcmgCriteria,
      ]);
      setIsSaveActive(false); // Disable save button
    } catch (error) {
      console.error("Error saving ACMG record:", error);
    }
  };

  return (
    <div className="flex flex-col w-[1400px] overflow-x-auto h-[600px] gap-3">
      <div className="flex flex-col border rounded-sm p-5">
        <div className="flex flex-row gap-3 items-center justify-between">
          <div className="flex flex-row items-center justify-center gap-3">
            <p className="font-semibold text-xl">ACMG Classification : </p>
            <div className={`border rounded-sm px-2 py-1 ${getBadgeColor()}`}>
              <p className="font-semibold text-lg">{dataACMG?.acmg_class}</p>
            </div>
          </div>

          <Button
            variant={"outline"}
            className="border border-gray-400"
            onClick={handleSave}
            disabled={!isSaveActive}
          >
            <small>
              <SaveAll className="w-4 h-4 mr-4"></SaveAll>
            </small>
            Save
          </Button>
        </div>
      </div>
      <Table className="min-w-full border border-gray-200 min-h-40">
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
                  {/* <Switch
                    id={item.criteria}
                    checked={item.status}
                    onCheckedChange={(checked) => handleToggle(index, checked)}
                  /> */}
                  <input
                    type="checkbox"
                    checked={item.status}
                    onChange={(e) => handleToggle(index, e.target.checked)}
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

      <div className="flex flex-col w-full">
        <p className="text-lg">History</p>
        <div className="max-h-[150px] overflow-y-auto border border-gray-200">
          <Table className="table-fixed border border-gray-200 min-w-[600px] min-h-[40px] overflow-y-auto">
            <TableHeader>
              <TableRow className="bg-gray-100 sticky top-0 z-10">
                <TableHead className="px-4 py-2 text-left text-base lg:text-xl font-semibold text-gray-700 w-[150px]">
                  ACMG Class
                </TableHead>
                {Object.keys(historyListACMG[0] || {})
                  .filter(
                    (key) =>
                      key !== "id_variant" &&
                      key !== "id" &&
                      key !== "__typename" &&
                      key !== "acmg_class"
                  )
                  .map((key) => (
                    <TableHead
                      key={key}
                      className="px-4 py-2 text-left text-base lg:text-xl font-semibold text-gray-700 w-[200px]"
                    >
                      {key}
                    </TableHead>
                  ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {historyListACMG.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="px-4 py-2 text-base lg:text-xl text-gray-600 w-[150px]">
                    {item.acmg_class}
                  </TableCell>
                  {Object.entries(item)
                    .filter(
                      ([key]) =>
                        key !== "id_variant" &&
                        key !== "id" &&
                        key !== "__typename" &&
                        key !== "acmg_class"
                    )
                    .map(([key, value], i) => (
                      <TableCell
                        key={i}
                        className="px-4 py-2 text-base lg:text-xl text-gray-600 whitespace-normal break-words w-[200px]"
                      >
                        {typeof value === "boolean"
                          ? value
                            ? "True"
                            : "False"
                          : value}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default ACMGVariantReport;
