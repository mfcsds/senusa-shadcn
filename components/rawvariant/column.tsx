"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { VariantRawData } from "@/utils/object";

export const columns: ColumnDef<VariantRawData>[] = [
  {
    accessorKey: "hgvs",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Hgvs
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "chrom",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Chrom
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "pos",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Pos
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "id_var",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Id
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "ref",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Ref
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "alt",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Alt
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "qual",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Qual
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "info",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Info
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
  {
    accessorKey: "filter",
    header: ({ column }) => (
      <Button
        variant={"ghost"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Filter
        <small>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </small>
      </Button>
    ),
  },
];
