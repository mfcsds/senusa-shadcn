"use client";
import React, { useState, useEffect } from "react";
import graphqlOperation, { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { listInstitutions, listPatients } from "@/src/graphql/queries";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import PatientItem from "@/components/items/PatientItem";

import config from "@/src/amplifyconfiguration.json";
Amplify.configure(config);

interface Patient {
  id: string;
  institutionID: string;
  name?: string;
  sex?: string;
  phone_number?: string;
  dob?: string;
}

const TableManagePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const client = generateClient();
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const result = await client.graphql({ query: listPatients });
        setPatients(result.data.listPatients.items as Patient[]);
      } catch (error) {}
    };
    fetchInstitution();
  }, []);

  const router = useRouter();

  // console.log(institutions.at(0).);

  return (
    <div className="w-[1000px] border">
      <Table>
        <TableCaption>User Accounts Details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Sex</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patients) => (
            <TableRow key={patients.id}>
              <TableCell>
                <PatientItem
                  id={patients.id}
                  name={patients.name}
                ></PatientItem>
              </TableCell>
              <TableCell>{patients.sex || ""}</TableCell>
              <TableCell>{patients.phone_number || ""}</TableCell>
              <TableCell>{patients.dob || ""}</TableCell>

              <TableCell className="text-center">
                <div className="flex items-center">
                  <Button variant="ghost" className="group hover:bg-violet-800">
                    <span>
                      <Trash className="group-hover:text-white w-3 h-3 " />
                    </span>
                  </Button>
                  <Button variant="ghost" className="group hover:bg-violet-800">
                    <span>
                      <Pencil className="w-3 h-3 group-hover:text-white" />
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableManagePatient;
