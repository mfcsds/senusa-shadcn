"use client";
import React, { useState, useEffect } from "react";
import graphqlOperation, { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { listPatients } from "@/src/graphql/queries";
import { createPatient, deletePatient } from "@/src/graphql/mutations";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
import { Calendar } from "../ui/calendar";
import { Pencil, Plus, Trash } from "lucide-react";

import { Calendar as CalendarIcon } from "lucide-react";
import PatientItem from "@/components/items/PatientItem";
import { format } from "date-fns";

import config from "@/src/amplifyconfiguration.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Institution } from "@/src/models";
import { keysEqual } from "@aws-amplify/datastore/dist/esm/util";

Amplify.configure(config);

import { generatePatientID } from "@/utils/function";
import { Separator } from "@/components/ui/separator";
import LabelAndDescription from "../items/LabelAndDescription";

interface Patient {
  id: string;
  institutionID?: string;
  id_reference?: string;
  name?: string;
  sex?: string;
  phone_number?: string;
  dob?: string;
}

const TableManagePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  // const [name, setName] = useState("");
  const [idReference, setIDReference] = useState("");
  // const [id, setIdPatient] = useState("");
  // const [sex, setSex] = useState("");
  // const [date, setDate] = React.useState<Date>();
  const [showModal, setShowModal] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [phone_number, setPhoneNumber] = useState("");
  const [selectedIdPatient, setSelectedIdPatient] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const client = generateClient();

  const handleAddNewPatient = () => {
    setShowModal(!showModal);
  };

  const closeModalDelete = () => {
    setShowModalDelete(!showModalDelete);
  };

  const handleDeletePatientModal = (selectedIdPatient: string) => {
    setShowModalDelete(!showModalDelete);
    setSelectedIdPatient(selectedIdPatient);
  };

  const savePatient = async () => {
    try {
      const newPatient = {
        id: generatePatientID(),
        name: idReference,
        sex: "-",
        id_reference: idReference,
        phone_number: phone_number,
      };

      const result = await client.graphql({
        query: createPatient,
        variables: { input: newPatient },
      });

      setPatients([...patients, newPatient]);

      setShowModal(!showModal);
    } catch (error) {
      console.error("Error Saving Data");
    }
  };

  const removePatient = async (patientId: string) => {
    setIsDeleting(true);
    try {
      const delResult = await client.graphql({
        query: deletePatient,
        variables: { input: { id: patientId } },
      });
      setPatients(patients.filter((patient) => patient.id !== patientId));
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const result = await client.graphql({ query: listPatients });
        setPatients(result.data.listPatients.items as Patient[]);
      } catch (error) {}
    };
    fetchPatient();
  }, []);

  const router = useRouter();

  const navigateTo = (path: string) => {
    router.push(path);
  };

  // console.log(institutions.at(0).);

  return (
    <div className="w-full border flex flex-col">
      <div className="flex  text-right mb-10 w-full flex-row-reverse p-3">
        <Button
          variant="secondary"
          className="hover:text-white hover:bg-violet-800"
          onClick={handleAddNewPatient}
        >
          <small>
            <Plus className="w-4 h-4 mr-2"></Plus>
          </small>
          Add New Patient
        </Button>
      </div>
      <Table>
        <TableCaption>User Accounts Details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-xl w-10/12">ID / Reference</TableHead>
            {/* <TableHead>Sex</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Date of Birth</TableHead> */}
            <TableHead className="text-xl">Actions</TableHead>
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
              {/* <TableCell>{patients.sex || ""}</TableCell>
              <TableCell>{patients.phone_number || ""}</TableCell>
              <TableCell>{patients.dob || ""}</TableCell> */}

              <TableCell className="text-center">
                <div className="flex flex-row gap-1 items-center">
                  <Button
                    variant="ghost"
                    className="group hover:bg-violet-800"
                    onClick={(e) =>
                      navigateTo(
                        `./managepatient/datapatient?idpatient=${patients.id}`
                      )
                    }
                  >
                    <span>
                      <Pencil className="w-3 h-3 group-hover:text-white" />
                    </span>
                  </Button>
                  <Separator
                    orientation={"vertical"}
                    className="h-5"
                  ></Separator>

                  <Button
                    variant="ghost"
                    className="group hover:bg-rose-800"
                    onClick={() => handleDeletePatientModal(patients.id)}
                  >
                    <span>
                      <Trash className="group-hover:text-white w-3 h-3 " />
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Delete Data Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                Are you sure you want to delete this patient data?
                <br />
                <strong>Note:</strong> All associated data, including reports,
                VCF files, and variant samples linked to this patient, will be
                permanently deleted. This action cannot be undone.
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex flex-row items-center justify-center gap-2">
                <Button
                  onClick={() => setShowModalDelete(!showModalDelete)}
                  variant="secondary"
                >
                  Cancel
                </Button>
                <Button
                  onClick={async () => {
                    if (selectedIdPatient) {
                      await removePatient(selectedIdPatient);
                      setShowModalDelete(!showModalDelete);
                      setSelectedIdPatient("");
                    }
                  }}
                  disabled={isDeleting}
                  variant="destructive"
                >
                  {isDeleting ? (
                    <span>Deleting...</span> // You can replace this with a spinner if you have one
                  ) : (
                    "Confirm"
                  )}
                  Delete
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
          <Card className="w-full max-w-screen-md p-5">
            <CardHeader>
              <CardTitle>Add New Patient</CardTitle>
              <CardDescription>Adding Patient Information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-5 p-5 border rounded-md shadow-sm">
                  <LabelAndDescription
                    label="ID or Patient Reference Number"
                    desc="Patient Identifier"
                  ></LabelAndDescription>
                  <Input
                    type="text"
                    placeholder="Insert ID"
                    onChange={(e) => setIDReference(e.target.value)}
                  ></Input>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex w-full flex-row-reverse mt-4 gap-4">
                <Button onClick={savePatient}>Save</Button>
                <Button variant={"secondary"} onClick={handleAddNewPatient}>
                  Cancel
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TableManagePatient;
