"use client";

import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
interface PatientProops {
  id: string;
}

const PatientInformation: React.FC<PatientProops> = ({ id }) => {
  return (
    <div className="flex flex-col">
      {/* {id} */}

      <Card className="border-none">
        <CardHeader>
          <CardTitle>
            <p className="font-semibold text-balance">Patient Detail</p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Table className="w-[500px]">
              <TableBody>
                <TableRow>
                  <TableCell className="w-[20px]">ID Patient</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">P-2DAJAOSDE1</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Full Name</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">
                    Muhamad Fathurahman
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Sex</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">Male</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Date of Birth</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">
                    Muhamad Fathurahman
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Current Diagnosis</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">-</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">
                    Supplementary Files
                  </TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">-</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientInformation;
