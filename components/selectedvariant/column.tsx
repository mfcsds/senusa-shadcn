"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown, Edit2, PlusCircle, TableOfContents } from "lucide-react";

import { useState } from "react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "../ui/badge";
import { Variant } from "@/utils/object";
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
  {
    accessorKey: "gene_id",
    header: "Gene ID",
  },
  {
    accessorKey: "gene_symbol",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Gene Symbol
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const item = row.original;
      const getCodeColor = () => {
        switch (item.gene_symbol) {
          case "BRCA1":
            return "bg-red-500 text-white";
          case "BRCA2":
            return "bg-red-500 text-white";
        }
      };
      return (
        <Badge variant={"secondary"} className={`${getCodeColor()}`}>
          {item.gene_symbol}
        </Badge>
      );
    },
  },
  {
    accessorKey: "hgvs",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          HGVS Notation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "zygosity",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Zygosity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
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
          className="text-xs hover:bg-black hover:text-white"
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
      item.acmg = "Likely Benign";
      const getBadgeColor = () => {
        switch (item.acmg) {
          case "Pathogenic":
            return "bg-red-500";
          case "Likely Pathogenic":
            return "bg-red-200";
          case "Likely Benign":
            return "bg-green-200"; // Red for pathogenic
          case "Benign":
            return "bg-green-500"; // Green for benign
          case "Vus":
            return "bg-yellow-500"; // Yellow for VUS
          default:
            return "bg-gray-500"; // Default color if value doesn't match
        }
      };
      return (
        <div className="flex flex-row items-center gap-2">
          <Badge
            className={`font-medium ${getBadgeColor()} hover:${getBadgeColor()} text-black text-nowrap`}
          >
            {item.acmg}
          </Badge>
          <Separator orientation="vertical" className="h-5"></Separator>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} onClick={(e) => {}}>
                <small>
                  <Edit2 className="w-3 h-3"></Edit2>
                </small>
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className="min-w-fit">
              <SheetHeader className="mb-10">
                <SheetTitle className="text-4xl">
                  Variant Detail:{item.hgvs}
                </SheetTitle>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-400">
                      Variant Statistic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5"></CardContent>
                </Card>
              </SheetHeader>
              <div className="flex flex-col rounded-sm border-solid  mb-5 overflow-y-auto">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-red-800 p-5 rounded-md text-white">
                      Pathogenicity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Very Strong
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            PVS1 null variant (nonsense, frameshift, canonical
                            ±1 or 2 splice sites, initiation codon, single or
                            multiexon deletion) in a gene where LOF is a known
                            mechanism of disease
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Strong
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>PS1</strong> Same amino acid change as a
                            previously established pathogenic variant regardless
                            of nucleotide change
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>PS2</strong> De novo (both maternity and
                            paternity confirmed) in a patient with the disease
                            and no family history
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl font-sans">
                            <strong>PS3</strong> Well-established in vitro or in
                            vivo functional studies supportive of a damaging
                            effect on the gene or gene product
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl font-sans">
                            <strong>PS4</strong> The prevalence of the variant
                            in affected individuals is significantly increased
                            compared with the prevalence in controls
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"Halo"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl font-sans">
                            <strong>PP1</strong> (Strong evidence) Cosegregation
                            with disease in multiple affected family members in
                            a gene definitively known to cause the disease
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Likely Phatogenic */}
                {/* Likely Pathogenic */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-yellow-500 p-5 rounded-md text-white">
                      Likely Pathogenic
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Moderate
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"PM1"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>PM1</strong> Located in a mutational hot
                            spot and/or critical functional domain
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"PM2"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>PM2</strong> Absent from controls or at
                            extremely low frequency in population databases
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* VUS */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-gray-500 p-5 rounded-md text-white">
                      Variant of Uncertain Significance (VUS)
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Supporting
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"PP3"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>PP3</strong> Multiple lines of computational
                            evidence support a deleterious effect on the gene or
                            gene product
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"BP4"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>BP4</strong> Multiple lines of computational
                            evidence suggest no impact on gene or gene product
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Likely Benign */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-blue-500 p-5 rounded-md text-white">
                      Likely Benign
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Supporting
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"BP1"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>BP1</strong> Missense variant in a gene
                            where truncating variants are known to cause disease
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"BP6"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>BP6</strong> Reputable source reports
                            variant as benign
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Benign */}
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-green-500 p-5 rounded-md text-white">
                      Benign
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col">
                        <p className="font-sans font-bold mb-5 text-xl">
                          Standalone
                        </p>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"BA1"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>BA1</strong> Allele frequency is too high
                            for the disorder to be pathogenic
                          </p>
                        </div>
                        <div className="flex flex-row gap-2 items-baseline pl-10">
                          <Checkbox value={"BS1"}></Checkbox>
                          <p className="text-wrap items-baseline text-xl">
                            <strong>BS1</strong> Allele frequency is greater
                            than expected for the disorder
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant={"ghost"} onClick={(e) => {}}>
                <small>
                  <Edit2 className="w-3 h-3"></Edit2>
                </small>
              </Button>
            </SheetTrigger>
            <SheetContent side={"right"} className="min-w-fit">
              <SheetHeader className="mb-10">
                <SheetTitle className="text-4xl">
                  Variant Detail:{item.hgvs}
                </SheetTitle>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-gray-400">
                      Variant Statistic
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-5"></CardContent>
                </Card>
              </SheetHeader>
              <div className="flex flex-col rounded-sm border-solid mb-5">
                <Card className="border">
                  <CardHeader>
                    <CardTitle className="bg-gray-800 p-5 rounded-md text-white">
                      ACMG Criteria Checklist
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-3">
                      {/* PVS1 */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PVS1"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PVS1 null variant (nonsense, frameshift, canonical ±1
                          or 2 splice sites, initiation codon, single or
                          multiexon deletion) in a gene where LOF is a known
                          mechanism of disease
                        </p>
                      </div>

                      {/* PS1 - PS4 */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PS1"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PS1 Same amino acid change as a previously established
                          pathogenic variant regardless of nucleotide change
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PS2"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PS2 De novo (both maternity and paternity confirmed)
                          in a patient with the disease and no family history
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PS3"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PS3 Well-established in vitro or in vivo functional
                          studies supportive of a damaging effect on the gene or
                          gene product
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PS4"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PS4 The prevalence of the variant in affected
                          individuals is significantly increased compared with
                          the prevalence in controls
                        </p>
                      </div>

                      {/* PP1 (Strong and Moderate Evidence) */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP1_Strong"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP1 (Strong evidence) Cosegregation with disease in
                          multiple affected family members in a gene
                          definitively known to cause the disease
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP1_Moderate"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP1 (Moderate evidence) Cosegregation with disease in
                          multiple affected family members in a gene
                          definitively known to cause the disease
                        </p>
                      </div>

                      {/* PM1 - PM6 */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM1"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM1 Located in a mutational hot spot and/or critical
                          and well-established functional domain (e.g., active
                          site of an enzyme) without benign variation
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM2"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM2 Absent from controls (or at extremely low
                          frequency if recessive) in Exome Sequencing Project,
                          1000 Genomes Project, or Exome Aggregation Consortium
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM3"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM3 For recessive disorders, detected in trans with a
                          pathogenic variant
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM4"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM4 Protein length changes as a result of in-frame
                          deletions/insertions in a nonrepeat region or
                          stop-loss variants
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM5"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM5 Novel missense change at an amino acid residue
                          where a different missense change determined to be
                          pathogenic has been seen before
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PM6"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PM6 Assumed de novo, but without confirmation of
                          paternity and maternity
                        </p>
                      </div>

                      {/* PP1 - PP5 */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP2"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP2 Missense variant in a gene that has a low rate of
                          benign missense variation and in which missense
                          variants are a common mechanism of disease
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP3"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP3 Multiple lines of computational evidence support a
                          deleterious effect on the gene or gene product
                          (conservation, evolutionary, splicing impact, etc.)
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP4"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP4 Patient’s phenotype or family history is highly
                          specific for a disease with a single genetic etiology
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"PP5"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          PP5 Reputable source recently reports variant as
                          pathogenic, but the evidence is not available to the
                          laboratory to perform an independent evaluation
                        </p>
                      </div>

                      {/* BP1 - BP7 */}
                      {/* BS1 - BS4 */}
                      {/* BA1 */}
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"BA1"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          BA1 Allele frequency is greather than 5% in Exome
                          Sequencing Project, 1000 Genomes Project, or Exome
                          Aggregation Consortium
                        </p>
                      </div>
                      <div className="flex flex-row gap-2 items-baseline pl-10">
                        <Checkbox value={"Artifact"}></Checkbox>
                        <p className="text-wrap items-baseline text-xl">
                          Sequencing artifact as determined by depth, quality,
                          or other previously reviewed data
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      );
    },
  },

  {
    accessorKey: "clinicalSign",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Clinical Significance
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "severeconsequence",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Severe Consequence
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "sift_score",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
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
          className="text-xs hover:bg-black hover:text-white"
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
      return (
        <HoverCard>
          <HoverCardTrigger>
            <div className="flex flex-row items-center gap-3">
              <Button variant={"link"}>
                Detail
                <Badge variant={"outline"}>
                  {item.phenotypes
                    ? Array.from(new Set(item.phenotypes.split(";"))).length
                    : "".length}
                </Badge>
              </Button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {item.phenotypes
              ? Array.from(new Set(item.phenotypes.split(";"))).join(";")
              : ""}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "rsID",
    header: "rsID",
  },
  {
    accessorKey: "gnomade",
    header: ({ column }) => {
      return (
        <Button
          className="text-xs hover:bg-black hover:text-white"
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
          className="text-xs hover:bg-black hover:text-white"
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
      return (
        <div className="flex flex-row items-center justify-center p-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <small>
                  <TableOfContents className="h-4 w-4"></TableOfContents>
                </small>
              </Button>
            </DialogTrigger>
            <DialogContent className="xl:max-w-[1400px]">
              <VariantInformationModal
                hgvsNotation={item.hgvs}
              ></VariantInformationModal>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            variant={"ghost"}
            className="hover:bg-red-500 hover:text-white"
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
