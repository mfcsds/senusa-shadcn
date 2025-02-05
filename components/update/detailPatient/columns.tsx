"use client";

import { ColumnDef } from "@tanstack/react-table";
import Button from "@/components/update/button/Button";
import { ArrowUpDown } from "lucide-react";
import { VariantRawData } from "@/utils/object";

export const columns: ColumnDef<VariantRawData>[] = [
  {
    accessorKey: "hgvs",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Hgvs"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "chrom",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Chrom"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "pos",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Pos"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "id_var",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Id"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "ref",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Ref"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "alt",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Alt"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "qual",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Qual"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "info",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Info"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
  {
    accessorKey: "filter",
    header: ({ column }) => (
      <Button
        variant={"icon"}
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        label="Filter"
        icon={<ArrowUpDown className="w-5 h-5" />}
      />
    ),
  },
];
