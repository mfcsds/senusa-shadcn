// components/GeneralInfo.js
"use client";
import React from "react";
import {
  Table,
  TableHead,
  TableHeader,
  TableCell,
  TableRow,
  TableBody,
} from "../ui/table";
import { VariantData } from "@/utils/object";

interface GeneralInfoProps {
  data: VariantData;
}

const VariantGeneralInfo = ({ data }: GeneralInfoProps) => {
  if (!data) {
    return <div>No data available</div>;
  }
  const {
    id,
    input,
    assembly_name,
    seq_region_name,
    start,
    end,
    allele_string,
    variant_class,
    most_severe_consequence,
  } = data;

  return (
    <div className="flex flex-col mt-10">
      <p className="text-xl font-bold mb-8 text-text-primary">General Information</p>
      <Table className="min-w-full divide-y divide-gray-200">
        <TableBody className="bg-foreground divide-y divide-gray-200 text-text-primary">
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">Variant ID</TableCell>
            <TableCell className="px-6 py-4">{id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">Input HGVS</TableCell>
            <TableCell className="px-6 py-4">{input}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">
              Assembly Name
            </TableCell>
            <TableCell className="px-6 py-4">{assembly_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">Chromosome</TableCell>
            <TableCell className="px-6 py-4">{seq_region_name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">Position</TableCell>
            <TableCell className="px-6 py-4">
              {start} - {end}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">
              Allele Change
            </TableCell>
            <TableCell className="px-6 py-4">{allele_string}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">
              Variant Class
            </TableCell>
            <TableCell className="px-6 py-4">{variant_class}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="px-6 py-4 font-medium">
              Most Severe Consequence
            </TableCell>
            <TableCell className="px-6 py-4">
              {most_severe_consequence}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default VariantGeneralInfo;
