"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";

import { Amplify } from "aws-amplify";
import config from "@/src/aws-exports";
import { getPatient, getVariantReport } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { Patient, VariantReportData } from "@/utils/object";
import { ClientPageRoot } from "next/dist/client/components/client-page";

Amplify.configure(config);

interface PatientProops {
  id_report: string;
  patientid: string;
}

const PatientInformation: React.FC<PatientProops> = ({
  id_report,
  patientid,
}) => {
  const [patient, setPatient] = useState<Patient>();
  const [varReport, setVarReport] = useState<VariantReportData>();

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

  const fetchVarData = async () => {
    try {
      const result = client.graphql({
        query: getVariantReport,
        variables: { id: id_report },
      });
      setVarReport((await result).data.getVariantReport as VariantReportData);
    } catch (error) {
      console.log("");
    }
  };

  useEffect(() => {
    fetchData();
    fetchVarData();
  });

  return (
    <div className="flex flex-col w-fit">
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
                  <TableCell className="w-[20px]">
                    ID Patient / Referrence Number
                  </TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">{patient?.id}</TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell className="w-[20px]">Full Name</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">{patient?.name}</TableCell>
                </TableRow> */}
                {/* 
                <TableRow>
                  <TableCell className="w-[20px]">Current Diagnosis</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">
                    {varReport?.current_diagnosis}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="w-[20px]">Phenotypes</TableCell>
                  <TableCell className="w-[10px] text-left">:</TableCell>
                  <TableCell className="w-[100px]">
                    {varReport?.phenotype}
                  </TableCell>
                </TableRow> */}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientInformation;
