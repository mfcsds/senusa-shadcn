"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../../ui/button";
import {
  ArrowUpDown,
  Edit,
  TableOfContents,
} from "lucide-react";
import { Badge } from "../../../ui/badge";
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
} from "@/components/update/dialog/Dialog";
import VariantInformationModal from "./VariantInformationModal";
import React from "react";
import { Label } from "../../../ui/label";
import { Input } from "../../../ui/input";
import { Separator } from "../../../ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Checkbox } from "../../../ui/checkbox";
import { Skeleton } from "../../../ui/skeleton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";

import { generateClient } from "aws-amplify/api";
import awsconfig from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateUserID } from "@/utils/function";
import { Toast, ToastAction } from "../../../ui/toast";
import BAddSelectedVariant from "@/components/update/button/BAddSelectedVariant";
import { ZYGOSITY_HETEROZYGOUS, ZYGOSITY_HOMOZYGOUS } from "@/utils/Contanst";
import ACMGVariantReport from "./ACMGVariantReport";
import handleGeneratePDF from "../../../HandleGeneratePDF";

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

function geneSymbolFilterFn(
  row: Row<any>,
  columnId: string,
  filterValue: string | string[]
) {
  // The actual gene_symbol in the row
  const rowValue = row.getValue<string>(columnId);
  if (!rowValue) return false; // or `true` if you prefer passing empty rows

  // No filter => show everything
  if (!filterValue) return true;

  // If filterValue is an array (from a selected gene panel),
  // keep the row if its gene_symbol is in that array.
  if (Array.isArray(filterValue)) {
    return filterValue.includes(rowValue);
  }

  // If filterValue is a string, do a substring match
  if (typeof filterValue === "string") {
    return rowValue.toLowerCase().includes(filterValue.toLowerCase());
  }

  // Fallback (if something unexpected)
  return true;
}

export const Columns: ColumnDef<Variant>[] = [
  {
    accessorKey: "gene_symbol",
    header: "Gene Symbol",
    cell: ({ row }) => {
      return row.original.gene_symbol;
    },
    filterFn: geneSymbolFilterFn,
  },
  {
    accessorKey: "gene_id",
    header: ({ column }) => {
      return <p className="text-md font-sans ml-5">Variant Detail</p>;
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
            return "border-gray-500"; // Default color if value doesn't match
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
            return "text-text-primary font-semibold"; // Default color if value doesn't match
        }
      };

      return (
        <div className="flex flex-row gap-10 ml-5 items-center">
          <div
            className={`border-l-4 ${getGeneColor()} w-[200px] items-start flex flex-col justify-start pl-5`}
          >
            <div className=" px-2 rounded-md border-gray-500 border-2">
              {item.gene_symbol ? (
                <p className={`text-md font-medium ${getTextGeneColor()}`}>
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
              <p className="text-md font-medium text-text-secondary ">
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
            <p className="text-md">{item.hgvs}</p>
            {item.rsID ? (
              <p className="text-md font-sans text-text-secondary ">{`RSID: ${item.rsID?.toUpperCase()}`}</p>
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
      return <p className="text-md font-sans ml-5">AC</p>;
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

      return <p className="text-md">{displayValue}</p>;
    },
  },
  {
    accessorKey: "AF",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">AF</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.af}</p>;
    },
  },
  {
    accessorKey: "AN",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">AN</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.an}</p>;
    },
  },
  {
    accessorKey: "DP",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">DP</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.dp}</p>;
    },
  },
  {
    accessorKey: "FS",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">FS</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.fs}</p>;
    },
  },
  {
    accessorKey: "MQ",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">MQ</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.mq}</p>;
    },
  },
  {
    accessorKey: "MQRankSum",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">MQRankSum</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.mqranksum}</p>;
    },
  },
  {
    accessorKey: "QD",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">QD</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.qd}</p>;
    },
  },

  {
    accessorKey: "ReadPosRank",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">ReadPosRank</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.readposrank}</p>;
    },
  },
  {
    accessorKey: "Fraction",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">Fraction</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.fraction}</p>;
    },
  },

  {
    accessorKey: "SOR",
    header: ({ column }) => {
      return <p className="text-md text-text-primary font-sans ml-5">SOR</p>;
    },
    cell: ({ row }) => {
      return <p className="text-md text-text-primary">{row.original.sor}</p>;
    },
  },

  {
    accessorKey: "zygosity",
    header: ({ column }) => {
      return (
        <Button
          className="text-md hover:bg-transparent"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zygosity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      function getBorder(zygosity: string) {
        switch (zygosity) {
          case ZYGOSITY_HETEROZYGOUS:
            return "border-blue-primary bg-blue-secondary text-black";
          case ZYGOSITY_HOMOZYGOUS:
            return "border-red-primary bg-red-secondary text-black";
        }
        return "border-gray-500 bg-foreground text-red-primary";
      }
      return (
        <p
          className={`text-md p-2 border-2 ${getBorder(
            row.original.zygosity ?? ""
          )} rounded text-center`}
        >
          {row.original.zygosity}
        </p>
      );
    },
  },

  {
    accessorKey: "functional_impact",
    header: ({ column }) => {
      return (
        <Button
          className="text-sm hover:bg-black hover:text-white"
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
          className="text-md hover:bg-transparent hover:text-text-primary"
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

      const getBadgeColor = () => {
        switch (item.acmg) {
          case "Pathogenic":
            return "border-red-600 bg-red-primary text-black";
          case "Likely Pathogenic":
            return "border-red-600 bg-red-secondary text-black";
          case "Likely Benign":
            return "border-primary bg-secondary text-black"; // Red for pathogenic
          case "Benign":
            return "border-primary bg-accent text-black"; // Green for benign
          case "VUS":
            return "border-yellow-primary bg-yellow-secondary text-black"; // Yellow for VUS
          default:
            return "border-gray-500 "; // Default color if value doesn't match
        }
      };
      return (
        <div className="flex flex-row justify-between gap-3">
          <div
            className={`flex flex-row items-center gap-2 justify-center rounded-md px-3 py-1 border-2 ${getBadgeColor()}`}
          >
            <p className="text-md font-medium">{item.acmg}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "clinicalSign",
    header: ({ column }) => {
      return (
        <Button
          className="text-md hover:text-black hover:bg-transparent"
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
        <p className="text-md">
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
          className="text-md hover:text-black hover:bg-transparent"
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
        <p className="text-md">
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
                    className="text-md text-text-primary"
                  >{`${phenotypesList.length} Found`}</Button>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {phenotypesList.length > 0 ? (
                  <ul className="list-disc pl-5">
                    {phenotypesList.map((phenotype, index) => (
                      <li key={index} className="text-text-secondary text-sm">
                        {phenotype}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-text-primary">No phenotypes available</p>
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
      return <p className="text-md">{row.original.rsID?.toUpperCase()}</p>;
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

      const handleVariantUpdate = (id: string, updatedACMGClass: string) => {
        // Update the variantItem state in the parent DataTable
        item.acmg = updatedACMGClass;
      };

      return (
        <div className="flex flex-row gap-4">
          <Dialog>
            <DialogTrigger>
            <Button variant="outline" className="rounded-lg bg-foreground border-2 border-primary hover:border-secondary hover:bg-secondary text-primary hover:text-text-action">
                <small>
                  <Edit className="h-4 w-4"></Edit>
                </small>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[90%] max-h-[90%] overflow-y-auto bg-foreground">
              <ACMGVariantReport
                id_variantku={item.id}
                hgvs={item.hgvs}
                onUpdateVariant={(e) => {}}
              ></ACMGVariantReport>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogHeader>
              <DialogTitle></DialogTitle>
            </DialogHeader>
            <DialogTrigger asChild>
              <Button variant="outline" className="rounded-lg bg-foreground border-2 border-blue-primary hover:border-blue-secondary hover:bg-blue-secondary text-blue-primary hover:text-text-action">
                <small>
                  <TableOfContents className="h-4 w-4"></TableOfContents>
                </small>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[95%] max-h-[95%] overflow-y-auto bg-foreground">
              <VariantInformationModal
                hgvsNotation={item.hgvs}
                id_variant={item.id}
              ></VariantInformationModal>
              <DialogFooter>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <BAddSelectedVariant dataVariant={item}></BAddSelectedVariant>
        </div>
      );
    },
  },
];
