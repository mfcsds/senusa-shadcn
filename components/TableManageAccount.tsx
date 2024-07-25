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
import InstitutionItems from "./items/InstitutionItems";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Pencil, Trash } from "lucide-react";

const TableManageAccount = () => {
  return (
    <div className="w-full border">
      <Table>
        <TableCaption>User Accounts Details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[240px]">
              Institution / Medical Laboratory
            </TableHead>
            <TableHead className="w-[150px]">Registration Date</TableHead>
            <TableHead>Status Expiration</TableHead>
            <TableHead className="text-left">Number of User</TableHead>
            <TableHead className="text-left">Account Status</TableHead>
            <TableHead className="text-left">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">
              <InstitutionItems
                id="2024PT0001AB"
                name="PT. BioGenomics Indonesia"
              ></InstitutionItems>
            </TableCell>
            <TableCell>01/06/2024</TableCell>
            <TableCell>01/12/2024</TableCell>
            <TableCell>5</TableCell>
            <TableCell className="text-left">
              <Badge
                variant="outline"
                className="bg-green-200 px-3 items-center "
              >
                Active
              </Badge>
            </TableCell>
            <TableCell className="text-center">
              <div className="flex items-center">
                <Button variant="ghost" className="group hover:bg-violet-800">
                  <span>
                    <Trash className="group-hover:text-white w-3 h-3 "></Trash>
                  </span>
                </Button>
                <Button variant="ghost" className="group hover:bg-violet-800">
                  <span>
                    <Pencil className="w-3 h-3 group-hover:text-white"></Pencil>
                  </span>
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableManageAccount;
