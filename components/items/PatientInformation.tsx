"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { getPatient } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Patient } from "@/utils/object";

Amplify.configure(config);

interface PatientProops {
  id: string;
  patientid: string;
}

const PatientInformation: React.FC<PatientProops> = ({ id, patientid }) => {
  const [patient, setPatient] = useState<Patient>();
  const client = generateClient();
  const fetchData = async () => {
    try {
      const result = client.graphql({
        query: getPatient,
        variables: { id: patientid },
      });
      setPatient((await result).data.getPatient as Patient);
    } catch (error) {}
  };
  fetchData();

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
                  <TableCell className="w-[100px]">{patient?.id}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Full Name</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">{patient?.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Sex</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">{patient?.sex}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Date of Birth</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">{patient?.dob}</TableCell>
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
