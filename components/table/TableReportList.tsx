import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SearchCheck } from "lucide-react";
import { Icon } from "lucide-react";

const TableReportList = () => {
  return (
    <div className="w-full flex flex-col mt-5 h-full">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col mb-10 items-left justify-center">
          <p className="text-xl">Manage Variant Report</p>
          <small className="text-gray-500">
            Variant report detail and action
          </small>
        </div>
        <div className="flex gap-5">
          <Input
            id="search"
            type="text"
            className="w-[250px] shadow border-slate-500"
          ></Input>
          <Button
            variant="outline"
            className="hover:bg-violet-800 hover:text-white shadow"
          >
            <span>
              <Search className="w-4 h-4 mr-2"></Search>
            </span>
            Search
          </Button>
        </div>
      </div>
      <div>
        <Table className="w-full">
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead>No</TableHead>
              <TableHead>ID-Report</TableHead>
              <TableHead>Patient Name</TableHead>
              <TableHead>Medical History</TableHead>
              <TableHead>Current Diagnosis</TableHead>
              <TableHead>Sample Collection Data</TableHead>
              <TableHead>Report Status</TableHead>
              <TableHead>Phenotype</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  );
};

export default TableReportList;
