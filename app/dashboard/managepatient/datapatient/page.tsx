"use client";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableHeader,
  TableBody,
} from "@/components/ui/table";
import { CalendarIcon, Plus } from "lucide-react";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import graphqlOperation, { Amplify } from "aws-amplify";

import config from "@/src/amplifyconfiguration.json";
import { uploadData } from "aws-amplify/storage";
import { getUrl } from "aws-amplify/storage";
import { Label } from "@/components/ui/label";
import LabelAndDescription from "@/components/items/LabelAndDescription";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { generateVCFDataID } from "@/utils/function";
import { VcfData } from "@/utils/object";
import { getDateToday } from "@/utils/DateHelperFunction";
import { useSearchParams } from "next/navigation";

import { getPatient } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { CreatePatientInput } from "@/src/API";
import VCFUploader from "@/components/items/VFCUploader";

Amplify.configure(config);

const DataPatientPage = () => {
  const client = generateClient();

  const useParams = useSearchParams();
  const idPatient = useParams.get("idpatient");

  const [uploadModal, setUploadModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState<Date>();

  const [vcfID, setVCFID] = useState("");

  const [vcfFiles, setVCFFiles] = useState<VcfData[]>([]);
  const [selectedReferencetType, setSelectedReferenceType] = useState("");

  const [patient, setPatient] = useState<CreatePatientInput>();

  const obtainPatient = async () => {
    const onePatient = await client.graphql({
      query: getPatient,
      variables: { id: idPatient ?? "" },
    });
    await setPatient(onePatient.data.getPatient as CreatePatientInput);
  };
  obtainPatient();

  // State for files
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    accept: {
      "application/octet-stream": [".vcf", ".tbi"], // Accepted file types
    }, // Accepted file types, // Accepted file types
  });

  const openUploadModal = () => {
    setUploadModal(!uploadModal);
  };

  const uploadFilesButton = async () => {
    console.log("Click Upload Button");
    setVCFID(generateVCFDataID());

    try {
      const upload = await Promise.all(
        files.map(async (file) => {
          const filePath = `public/${file.name}`;
          const result = await uploadData({
            path: filePath,
            data: file,
            options: {
              onProgress: ({ transferredBytes, totalBytes }) => {
                if (totalBytes) {
                  console.log(
                    `Upload progress ${Math.round(
                      (transferredBytes / totalBytes) * 100
                    )} %`
                  );
                }
              },
            },
          }).result;
          const urlFile = await getUrl({
            path: filePath,
            options: {
              // ensure object exists before getting url
              validateObjectExistence: false,
              // url expiration time in seconds.
              expiresIn: 30000,
              // whether to use accelerate endpoint
              useAccelerateEndpoint: false,
            },
          });
          const newVCFFile: VcfData = {
            id: vcfID,
            id_patient: idPatient,
            genome_reference: selectedReferencetType, // You'll need to add this to your state
            sample_date: new Date().toLocaleDateString(),
            uploadAt: getDateToday(), // Format the date as needed
            public_link: urlFile.url.href,
          };
          setVCFFiles((vcfData) => [...vcfData, newVCFFile]);
        })
      );

      // const resultUpload = await uploadData({
      //   path: "public/",
      //   data: files[0],
      //   options: {
      //     onProgress: ({ transferredBytes, totalBytes }) => {
      //       if (totalBytes) {
      //         console.log(
      //           `Upload progress ${Math.round(
      //             (transferredBytes / totalBytes) * 100
      //           )} %`
      //         );
      //       }
      //     },
      //   },
      // }).result;
      // console.log(resultUpload.path);
    } catch (error) {
      console.log(error);
    } finally {
      setUploadModal(!uploadModal);
      setFiles([]);
    }
  };

  const cancelButtonUpload = () => {
    setUploadModal(!uploadModal);
    setFiles([]);
  };

  return (
    <div className="flex flex-col w-full p-5 border">
      <div className="flex flex-col mb-5 gap-5">
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Patient ID</p>
          </div>
          <div>:</div>
          <p className="ml-4">{patient?.id}</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Patient Name</p>
          </div>
          <div>:</div>
          <p className="ml-4">{patient?.name}</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Sex</p>
          </div>
          <div>:</div>
          <p className="ml-4">{patient?.sex}</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Date of Birth</p>
          </div>
          <div>:</div>
          <p className="ml-4">{patient?.dob}</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Phone Number</p>
          </div>
          <div>:</div>
          <p className="ml-4">{patient?.phone_number}</p>
        </div>
      </div>
      <div className="flex flex-col">
        <Card className="border-none">
          <CardHeader>
            <CardTitle>Patient Variant Data</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full items-end justify-end mb-5">
                <Button
                  onClick={openUploadModal}
                  variant="secondary"
                  className="gap-2 hover:bg-violet-800 hover:text-white "
                >
                  <small>
                    <Plus className="w-4 h-4"></Plus>
                  </small>
                  Add VCF Data
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Genome Reference</TableHead>
                    <TableHead>Sample Collection Date</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Download Link</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vcfFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.id}</TableCell>
                      <TableCell>{file.genome_reference}</TableCell>
                      <TableCell>{file.sample_date}</TableCell>
                      <TableCell>{file.uploadAt}</TableCell>
                      <TableCell>
                        <Button variant={"ghost"}>Show Data</Button>
                      </TableCell>
                      <TableCell>
                        <a
                          href={file?.public_link ?? "#"}
                          className="text-balance text-xs"
                        >
                          Link
                        </a>
                      </TableCell>

                      <TableCell>
                        <Button>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        <VCFUploader id_patient={patient?.id ?? ""}></VCFUploader>

        {uploadModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
            <Card className="w-full max-w-screen-md p-5">
              <CardHeader>
                <CardTitle>Upload Variant Call Data</CardTitle>
                <CardDescription>
                  Please select and upload your VCF file containing the variant
                  data. Ensure that the file follows the correct format and is
                  below the maximum upload size. Once uploaded, the system will
                  process the file, and the variant data will be displayed in
                  the table below. If you encounter any issues, please contact
                  support.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col">
                  <div className="flex flex-col  mb-5">
                    <Label>Genome Reference</Label>
                    <CardDescription className="mb-2">
                      Please select the appropriate reference genome version for
                      your VCF file. Ensure that the selected version matches
                      the reference genome used during variant calling to avoid
                      inconsistencies in analysis.
                    </CardDescription>
                    <select
                      onChange={(e) => setSelectedReferenceType(e.target.value)}
                    >
                      <option>GrCH38</option>
                      <option>GrCH37</option>
                    </select>
                  </div>
                  <div className=" flex flex-col mb-2 gap-2 w-full">
                    <LabelAndDescription
                      label="Sample Date"
                      desc="The date when the patient’s sample was collected for variant analysis. Please select the accurate collection date to ensure proper tracking of sample data."
                    ></LabelAndDescription>
                    <div className="w-full">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
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
                  </div>
                  <Separator className="mt-5"></Separator>
                  <div className="mt-4 gap-3">
                    <LabelAndDescription
                      label="Upload VCF File"
                      desc="Please upload the Variant Call Format (VCF) file containing the patient's variant data. Ensure that the file is properly formatted and does not exceed the upload size limit. Only .vcf and .tbi file formats will be accepted. If you encounter any issues with uploading, please contact support for assistance."
                    ></LabelAndDescription>
                    <div
                      {...getRootProps({
                        className:
                          "mt-4 border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:border-gray-500 transition-colors duration-150",
                      })}
                    >
                      <input {...getInputProps()} />
                      <p>
                        Drag n drop some files here, or click to select files
                      </p>
                      <em>(Only *.vcf, *.tbi will be accepted)</em>
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
              </CardContent>
              <CardFooter>
                <div className="w-full gap-4 flex flex-row-reverse">
                  <Button onClick={uploadFilesButton}>Upload</Button>
                  <Button variant="secondary" onClick={cancelButtonUpload}>
                    Cancel
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPatientPage;
