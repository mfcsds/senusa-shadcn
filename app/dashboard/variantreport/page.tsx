"use client";

import React, { useState, useEffect } from "react";
import TabsVariantReport from "@/components/table/TabsVariantReport";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";

import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { listPatients } from "@/src/graphql/queries";

import { generateClient } from "aws-amplify/api";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useDropzone } from "react-dropzone";

import config from "@/src/amplifyconfiguration.json";
import graphqlOperation, { Amplify } from "aws-amplify";

import { uploadData } from "aws-amplify/storage";

Amplify.configure(config);

interface Patient {
  id: string;
  institutionID?: string;
  name?: string;
  sex?: string;
  phone_number?: string;
  dob?: string;
}

function generatePatientID() {
  const characters = "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let patientID = "";

  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    patientID += characters[randomIndex];
  }

  return patientID;
}

const VariantReport = () => {
  const [phenotypeQuery, setPhenotypeQuery] = useState("");
  const [suggestions, setSuggestions] = useState<
    { id: string; name: string }[]
  >([]);
  const [selectedPhenotypes, setSelectedPhenotypes] = useState<string[]>([]);

  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [files, setFiles] = useState<File[]>([]); // State for files

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = React.useState<Patient | null>(
    null
  );
  const client = generateClient();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const result = await client.graphql({ query: listPatients });
        setPatients(result.data.listPatients.items as Patient[]);
      } catch (error) {}
    };
    fetchPatient();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (phenotypeQuery.length > 2) {
        try {
          const response = await axios.get(
            "https://ontology.jax.org/api/hp/search",
            {
              params: {
                q: phenotypeQuery,
                page: 0,
                limit: 10,
              },
            }
          );
          const terms = response.data.terms || [];
          setSuggestions(
            terms.map((term: any) => ({ id: term.id, name: term.name }))
          );
        } catch (error) {
          console.error("Error fetching phenotype suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [phenotypeQuery]);

  const handlePhenotypeSelect = (suggestion: { id: string; name: string }) => {
    const formattedSuggestion = `${suggestion.id} - ${suggestion.name}`;
    if (!selectedPhenotypes.includes(formattedSuggestion)) {
      setSelectedPhenotypes([...selectedPhenotypes, formattedSuggestion]);
    }
    setPhenotypeQuery("");
    setSuggestions([]);
  };

  const handleRemovePhenotype = (phenotype: string) => {
    setSelectedPhenotypes(
      selectedPhenotypes.filter((item) => item !== phenotype)
    );
  };

  const [modal, setShowModal] = useState(false);

  const handleCreateReport = () => {
    setShowModal(true);
  };
  const handleSetOfModal = () => {
    setShowModal(false);
    setFiles([]);
  };

  // File dropzone settings
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    }, // Accepted file types, // Accepted file types
  });

  return (
    <div className="flex w-full">
      <Card className="w-full h-svh">
        <CardHeader>
          <CardTitle>Variant Report Manager</CardTitle>
          <CardDescription>
            Review, manage, and generate detailed reports on genetic variants,
            ensuring accurate and comprehensive analysis for clinical
            decision-making.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mb-5 w-full">
            <div className="flex flex-row-reverse">
              <Button
                className="hover:text-white hover:bg-violet-800 w-50 text-right"
                variant="secondary"
                onClick={handleCreateReport}
              >
                <span>
                  <Plus className="w-3 h-3 mr-2"></Plus>
                </span>{" "}
                Create Variant Report
              </Button>
            </div>
          </div>
          <div className="flex flex-row mb-10">
            <TabsVariantReport></TabsVariantReport>
          </div>
        </CardContent>
      </Card>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className="w-full max-w-screen-md p-5">
            <CardHeader className="mb-4">
              <CardTitle>Create New Variant Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col gap-2 w-full">
                    <Label>Select Patient</Label>
                    <small className="text-gray-500">
                      Choose the patient for whom you want to create this
                      variant report.
                    </small>
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="w-full justify-between"
                        >
                          {selectedPatient
                            ? selectedPatient.name
                            : "Select Patient"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[500px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search ID Patient"
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No patient found.</CommandEmpty>
                            <CommandGroup>
                              {patients.map((patient) => (
                                <CommandItem
                                  key={patient.id}
                                  value={patient.id}
                                  onSelect={(currentValue) => {
                                    const selected = patients.find(
                                      (p) => p.id === currentValue
                                    );
                                    if (selected) {
                                      setSelectedPatient(selected);
                                    }
                                    setOpen(false);
                                  }}
                                >
                                  {patient.name} (ID: {patient.id})
                                  <CheckIcon
                                    className={cn(
                                      "ml-auto h-4 w-4",
                                      selectedPatient?.id === patient.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="flex flex-col gap-1 mt-2 mb-3">
                    <Label>Phenotype</Label>

                    <small className="text-gray-500">
                      Enter or select the phenotype related to this patient is
                      condition. This could include observable characteristics
                      or traits.
                    </small>
                    <Input
                      type="Text"
                      value={phenotypeQuery}
                      onChange={(e) => setPhenotypeQuery(e.target.value)}
                      placeholder="Type to search.."
                    ></Input>
                    {suggestions.length > 0 && (
                      <ul className="absolute z-10 bg-white border border-gray-300 w-md mt-1 rounded-md shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <li
                            key={index}
                            onClick={() => handlePhenotypeSelect(suggestion)}
                            className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                          >
                            {suggestion.id} - {suggestion.name}
                          </li>
                        ))}
                      </ul>
                    )}
                    {selectedPhenotypes.length > 0 && (
                      <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                          Selected Phenotypes
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedPhenotypes.map((phenotype, index) => (
                            <span
                              key={index}
                              className="flex items-center px-2 py-1 bg-blue-100 text-blue-600 rounded-md"
                            >
                              {phenotype}
                              <button
                                type="button"
                                onClick={() => handleRemovePhenotype(phenotype)}
                                className="ml-2 text-red-600 hover:text-red-800"
                              >
                                &times;
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <Label>Medical History</Label>
                    <small className="text-gray-500">
                      Provide a summary of the patient is s relevant medical
                      history that is pertinent to this variant analysis.
                    </small>
                    <Textarea></Textarea>
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <small className="text-gray-500">
                      Enter the current diagnosis that has been identified for
                      this patient.
                    </small>
                    <Label>Current Diagnosis</Label>
                    <Input type="Text"></Input>
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <Label>Supplementary Files</Label>
                    <small className="text-gray-500">
                      Upload any supplementary files or documents that support
                      this variant report. Accepted formats: PDF, DOCX, JPG.
                    </small>
                    <div
                      {...getRootProps({
                        className:
                          "border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-gray-500 transition-colors duration-150",
                      })}
                    >
                      <input {...getInputProps()} />
                      <p>
                        Drag n drop some files here, or click to select files
                      </p>
                      <em>
                        (Only *.pdf, *.docx, *.jpg, and *.jpeg will be accepted)
                      </em>
                    </div>
                    {files.length > 0 && (
                      <ul className="mt-2">
                        {files.map((file, index) => (
                          <li key={index} className="text-gray-600">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-row-reverse gap-2">
              <Button>Save</Button>
              <Button variant={"secondary"} onClick={handleSetOfModal}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VariantReport;
