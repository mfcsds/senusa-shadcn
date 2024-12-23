"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { useToast } from "../ui/use-toast";

import { Button } from "../ui/button";
import { ArrowUpDown, Edit2, PlusCircle, TableOfContents } from "lucide-react";
import {
  createSelectedVariant,
  createVariantInterpretation,
} from "@/src/graphql/mutations";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";
import {
  AcmgCriteria,
  SelectedVariant,
  Variant,
  VariantInterpretation,
} from "@/utils/object";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import VariantInformationModal from "../items/VariantInformationModal";
import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

import { generateClient } from "aws-amplify/api";
import awsconfig from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateUserID } from "@/utils/function";
import { Toast, ToastAction } from "../ui/toast";

Amplify.configure(awsconfig);

// Define a custom filter function for a number range
const numberRangeFilterFn = (
  row: Row<any>,
  columnId: string,
  filterValue: [number | "", number | ""]
) => {
  const value = row.getValue<number>(columnId);
  const [min, max] = filterValue;

  if (min !== "" && value < min) return false;
  if (max !== "" && value > max) return false;
  return true;
};

export const columns: ColumnDef<Variant>[] = [
  { accessorKey: "gene_symbol", header: "Gene Symbol" },
  {
    accessorKey: "gene_id",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">Variant Detail</p>;
    },
    cell: ({ row }) => {
      const item = row.original;
      const getGeneColor = () => {
        switch (item.gene_symbol) {
          case "BRCA1":
          case "BRCA2":
          case "TP53":
          case "PTEN":
          case "CDH1":
          case "STK11":
          case "CHEK2":
          case "PALB2":
          case "ATM":
          case "MLH1":
          case "MSH2":
          case "MSH6":
          case "PMS2":
          case "RAD51C":
          case "RAD51D":
          case "BARD1":
            return "border-red-600 ";
          default:
            return "border-gray-300"; // Default color if value doesn't match
        }
      };
      const getTextGeneColor = () => {
        switch (item.gene_symbol) {
          case "BRCA1":
          case "BRCA2":
          case "TP53":
          case "PTEN":
          case "CDH1":
          case "STK11":
          case "CHEK2":
          case "PALB2":
          case "ATM":
          case "MLH1":
          case "MSH2":
          case "MSH6":
          case "PMS2":
          case "RAD51C":
          case "RAD51D":
          case "BARD1":
            return "text-red-600 font-semibold ";
          default:
            return "text-gray-600"; // Default color if value doesn't match
        }
      };

      return (
        <div className="flex flex-row gap-10 ml-5 items-center">
          <div
            className={`border-l-4 ${getGeneColor()} w-[200px] items-start flex flex-col justify-start pl-5`}
          >
            <div className=" px-2 rounded-md border-gray-500 border-2">
              {item.gene_symbol ? (
                <p className={`text-lg font-medium ${getTextGeneColor()}`}>
                  {item.gene_symbol}
                </p>
              ) : (
                <Skeleton
                  aria-label="..."
                  className="h-6 w-[100px]  bg-gray-300"
                />
              )}
            </div>
            {item.gene_id ? (
              <p className="text-lg font-medium text-gray-400 ">
                {item.gene_id}
              </p>
            ) : (
              <Skeleton
                vocab="Loading"
                className="h-6 w-[150px] pl-2 mt-2 bg-gray-300"
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-lg">{item.hgvs}</p>
            {item.rsID ? (
              <p className="text-lg font-sans text-gray-500 ">{`RSID: ${item.rsID?.toUpperCase()}`}</p>
            ) : (
              <Skeleton vocab="Loading" className="h-6 w-[100px] bg-gray-300" />
            )}
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "AC",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">AC</p>;
    },
    cell: ({ row }) => {
      const ac = row.original.ac;
      let displayValue;

      // Handle various data types
      if (Array.isArray(ac)) {
        displayValue = ac.join(", ");
      } else if (typeof ac === "object" && ac !== null) {
        displayValue = JSON.stringify(ac);
      } else {
        displayValue = ac || "N/A";
      }

      return <p className="text-lg">{displayValue}</p>;
    },
  },
  {
    accessorKey: "AF",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">AF</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.af}</p>;
    },
  },
  {
    accessorKey: "AN",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">AN</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.an}</p>;
    },
  },
  {
    accessorKey: "DP",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">DP</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.dp}</p>;
    },
  },
  {
    accessorKey: "FS",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">FS</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.fs}</p>;
    },
  },
  {
    accessorKey: "MQ",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">MQ</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.mq}</p>;
    },
  },
  {
    accessorKey: "MQRankSum",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">MQRankSum</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.mqranksum}</p>;
    },
  },
  {
    accessorKey: "QD",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">QD</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.qd}</p>;
    },
  },

  {
    accessorKey: "ReadPosRank",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">ReadPosRank</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.readposrank}</p>;
    },
  },
  {
    accessorKey: "Fraction",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">Fraction</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.fraction}</p>;
    },
  },

  {
    accessorKey: "SOR",
    header: ({ column }) => {
      return <p className="text-lg font-sans ml-5">SOR</p>;
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.sor}</p>;
    },
  },

  {
    accessorKey: "zygosity",
    header: ({ column }) => {
      return (
        <Button
          className="text-lg hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zygosity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.zygosity}</p>;
    },
  },

  {
    accessorKey: "functional_impact",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Functional Impact
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "acmg",
    header: ({ column }) => {
      return (
        <Button
          className="text-lg hover:bg-transparent hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ACMG
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ row }) => {
      const item = row.original;

      // // Function to determine ACMG classification based on API response
      // const classifyVariant = (acmg: AcmgCriteria) => {
      //   if (acmg.PVS1 || acmg.PS1 || acmg.PS4) {
      //     // Strong evidence of pathogenicity
      //     return "Pathogenic";
      //   }
      //   if (
      //     acmg.PS3 ||
      //     acmg.PM1 ||
      //     acmg.PM2 ||
      //     acmg.PM5 ||
      //     acmg.PP1 ||
      //     acmg.PP2
      //   ) {
      //     // Moderate evidence of pathogenicity
      //     return "Likely Pathogenic";
      //   }
      //   if (acmg.BA1) {
      //     // Strong evidence of benign
      //     return "Benign";
      //   }
      //   if (acmg.BS1 || acmg.BS2 || acmg.BP1 || acmg.BP2) {
      //     // Moderate evidence of benign
      //     return "Likely Benign";
      //   }
      //   // If no strong or moderate evidence exists
      //   return "VUS";
      // };

      // // Fetch the ACMG criteria from the API
      // const fetchAcmgCriteria = async () => {
      //   try {
      //     const response = await fetch(
      //       "https://yyj4sdbsd6.execute-api.us-east-1.amazonaws.com/dev-acmg/classification",
      //       {
      //         method: "POST",
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //         body: JSON.stringify({ variants: [item.hgvs] }), // Pass the HGVS notation
      //       }
      //     );

      //     if (!response.ok) {
      //       console.error(
      //         `Error fetching ACMG criteria: ${response.statusText}`
      //       );
      //       item.acmg = "VUS"; // Default to VUS if API fails
      //       return;
      //     }

      //     const responseData = await response.json();
      //     const acmgCriteria = JSON.parse(responseData.body)[0]; // Extract the first ACMG criteria object

      //     // Map ACMG criteria to classification
      //     item.acmg = classifyVariant(acmgCriteria);
      //   } catch (error) {
      //     console.error("Error fetching ACMG criteria:", error);
      //     item.acmg = "VUS"; // Default to VUS in case of error
      //   }
      // };
      // fetchAcmgCriteria();

      // Fetch ACMG criteria and determine classification

      const getBadgeColor = () => {
        switch (item.acmg) {
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
      return (
        <div
          className={`flex flex-row items-center gap-2 justify-center rounded-md px-3 py-1 border-2 ${getBadgeColor()}`}
        >
          <p className="text-lg font-medium">{item.acmg}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "clinicalSign",
    header: ({ column }) => {
      return (
        <Button
          className="text-lg hover:text-black hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clinical Sign
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className="text-lg">
          {item.clinicalSign?.replace("_", " ").toUpperCase()}
        </p>
      );
    },
  },

  {
    accessorKey: "severeconsequence",
    header: ({ column }) => {
      return (
        <Button
          className="text-lg hover:text-black hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Most Consequence
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      return (
        <p className="text-lg">
          {item.severeconsequence?.toUpperCase().replaceAll("_", " ")}
        </p>
      );
    },
  },
  {
    accessorKey: "sift_score",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sift Score
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sift_prediction",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sift Prediction
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "phenotypes",
    accessorKey: "phenotypes",
    header: "Phenotypes",
    cell: ({ row }) => {
      const item = row.original;
      const phenotypesList = item.phenotypes
        ? Array.from(new Set(item.phenotypes.split(";")))
        : [];
      return (
        <div className="w-full">
          <Accordion type="single" collapsible>
            <AccordionItem value="phenotypes">
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-3">
                  <Button
                    variant="link"
                    className="text-lg text-gray-500"
                  >{`${phenotypesList.length} Found`}</Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {phenotypesList.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {phenotypesList.map((phenotype, index) => (
                      <li key={index} className="text-gray-700 text-sm">
                        {phenotype}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No phenotypes available</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    },
  },
  {
    accessorKey: "rsID",
    header: "RSID",
    cell: ({ row }) => {
      return <p className="text-lg">{row.original.rsID?.toUpperCase()}</p>;
    },
  },
  {
    accessorKey: "gnomade",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gnomade
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: numberRangeFilterFn,
  },
  {
    accessorKey: "gnomadg",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-black"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gnomadg
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    filterFn: "inNumberRange",
  },

  {
    id: "action",
    accessorKey: "action",
    header: "Actions",
    cell: ({ row }) => {
      const item = row.original;

      const itemTemp: SelectedVariant = {
        id_report: item.id_report,
        id_patient: item.id_patient,
        id: item.id, // ID type is represented as string in TypeScript
        id_vcf: item.id_vcf,
        gene_id: item.gene_id,
        gene_symbol: item.gene_symbol,
        chrom: item.chrom,
        pos: item.pos,
        id_var: item.id_var,
        ref: item.ref,
        alt: item.alt,
        qual: item.qual,
        zigosity: item.zygosity,
        global_allele: item.globalallele, // Float type in TypeScript is represented as number
        functional_impact: item.functional_impact,
        acmg: item.acmg,
        reviewer_class: "",
        clinical_sign: item.clinicalSign,
        hgvs: item.hgvs,
        severe_consequence: item.severeconsequence,
        sift_score: item.sift_score,
        sift_prediction: item.sift_prediction,
        phenotypes: item.phenotypes,
        rsID: item.rsID,
        gnomade: item.gnomade,
        gnomadg: item.gnomadg,
        alldesc: item.alldesc,
      };

      const client = generateClient();
      const { toast } = useToast();
      const saveSelectedVariant = async () => {
        try {
          const result = await client.graphql({
            query: createSelectedVariant,
            variables: { input: itemTemp },
          });
          if (result.data) {
            try {
              const tempVarInter: VariantInterpretation = {
                id: generateUserID(),
                hgvs: itemTemp.hgvs ?? "",
                id_report: itemTemp.id_report ?? "",
                id_patient: itemTemp.id_patient ?? "",
                text: "",
                id_varsample: itemTemp.id_var ?? "",
                alldesc: itemTemp.alldesc ?? "",
                gene_id: itemTemp.gene_id ?? "",
                gene_symbol: itemTemp.gene_symbol ?? "",
              };
              const re = await client.graphql({
                query: createVariantInterpretation,
                variables: { input: tempVarInter },
              });
              console.log("Berhasil Menambahkan");
            } catch (error) {
              console.log("Gagal Menambahkan");
            }
          }
        } catch (error) {
          console.log(`Error adding ${item.hgvs} ${error}`);
          console.log(error);
        }
      };
      return (
        <div className="flex flex-row items-center justify-center p-2 gap-2">
          <Dialog>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogTrigger asChild>
              <Button variant="outline">
                <small>
                  <TableOfContents className="h-4 w-4"></TableOfContents>
                </small>
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full max-w-[1800px]">
              <VariantInformationModal
                hgvsNotation={item.hgvs}
                id_variant={itemTemp.id}
              ></VariantInformationModal>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant={"ghost"}
            className="hover:bg-red-500 hover:text-white"
            onClick={() => {
              saveSelectedVariant();
              toast({
                title: "Success adding Variant",
                description: `${item.hgvs}  Added to Analysis`,
                action: <ToastAction altText="Try again">Undo?</ToastAction>,
              });
            }}
          >
            <small>
              <PlusCircle className="h-4 w-4"></PlusCircle>
            </small>
          </Button>
        </div>
      );
    },
  },
];
