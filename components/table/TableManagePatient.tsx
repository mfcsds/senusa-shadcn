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
import { Form } from "../ui/form";
import { Input } from "../ui/input";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Institution } from "@/src/models";
import { keysEqual } from "@aws-amplify/datastore/dist/esm/util";

Amplify.configure(config);

interface Patient {
  id: string;
  institutionID?: string;
  name?: string;
  sex?: string;
  phone_number?: string;
  dob?: string;
}

const TableManagePatient = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [name, setName] = useState("");
  const [id, setIdPatient] = useState("");
  const [sex, setSex] = useState("");
  const [date, setDate] = React.useState<Date>();
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
        id: id,
        name: name,
        sex: sex,
        institutionID: "ID-0012024-224420-YARSI",
        phone_number: phone_number,
        dob: date?.toDateString(),
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
                  <Button
                    variant="ghost"
                    className="group hover:bg-violet-800"
                    onClick={() => handleDeletePatientModal(patients.id)}
                  >
                    <span>
                      <Trash className="group-hover:text-white w-3 h-3 " />
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="group hover:bg-violet-800"
                    onClick={(e) => navigateTo("./managepatient/datapatient")}
                  >
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

      {showModalDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
          <Card className="p-5">
            <CardHeader>
              <CardTitle>Delete Data Patient</CardTitle>
            </CardHeader>
            <CardContent>
              <div>Are you sure want to delete this data?</div>
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
              <CardDescription>Adding Patient</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col ">
                <form className="gap-y-10 ">
                  <Label>Patient ID</Label>
                  <Input
                    type="text"
                    placeholder="ID"
                    onChange={(e) => setIdPatient(e.target.value)}
                  ></Input>
                  <Label>Patient Name</Label>
                  <Input
                    type="text"
                    placeholder="Insert patient name"
                    onChange={(e) => setName(e.target.value)}
                  ></Input>

                  <Label>Sex</Label>
                  <select
                    className="flex flex-col h-8 w-full"
                    onChange={(e) => setSex(e.target.value)}
                  >
                    <option>Select Sex</option>
                    <option>Male</option>
                    <option>Female</option>
                  </select>

                  <Label>Date Of Birth</Label>

                  <div className="flex flex-col">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                          onChange={(e) => setDate(date)}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <Label>Phone Number</Label>
                  <Input
                    type="text"
                    placeholder="Phone Number"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  ></Input>
                </form>
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
