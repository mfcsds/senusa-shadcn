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
import {
  CalendarIcon,
  Icon,
  Plus,
  SidebarCloseIcon,
  SquareX,
  TableOfContents,
  Trash2,
} from "lucide-react";

import React, { Suspense, useState } from "react";
import { useDropzone } from "react-dropzone";

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
import { listVcfdata } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { CreatePatientInput } from "@/src/API";
import { createVcfdata } from "@/src/graphql/mutations";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import { Input } from "postcss";

import { remove } from "aws-amplify/storage";
import { deleteVcfdata } from "@/src/graphql/mutations";
import { Amplify } from "aws-amplify";
import VCFRawTable from "@/components/items/VCFRawTable";

Amplify.configure(config);

const DataPatientPage = () => {
  const client = generateClient();

  const useParams = useSearchParams();
  const idPatient = useParams.get("idpatient");

  const [uploadModal, setUploadModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState<Date>();

  const [vcfID, setVCFID] = useState(generateVCFDataID());

  const [vcfFiles, setVCFFiles] = useState<VcfData[]>([]);
  const [selectedReferencetType, setSelectedReferenceType] = useState("");

  const [patient, setPatient] = useState<CreatePatientInput>();

  const [showModalVCFData, setShowModalVCFData] = useState(false);

  const handleShowModalVCFData = () => {
    setShowModalVCFData(!showModalVCFData);
  };

  const obtainPatient = async () => {
    const onePatient = await client.graphql({
      query: getPatient,
      variables: { id: idPatient ?? "" },
    });
    await setPatient(onePatient.data.getPatient as CreatePatientInput);
  };
  obtainPatient();

  const listVCFData = async () => {
    const getlist = await client.graphql({
      query: listVcfdata,
      variables: { filter: { id_patient: { eq: idPatient } } },
    });
    await setVCFFiles(getlist.data.listVcfdata.items as VcfData[]);
  };
  listVCFData();

  const handleDeleteVCFData = async (vcfDataId: string, filePath: string) => {
    try {
      await remove({ path: filePath }).then(() => {
        console.log("Delete File Successfully");
      });

      const deleteResult = client.graphql({
        query: deleteVcfdata,
        variables: { input: { id: vcfDataId } },
      });

      setVCFFiles((prevFiles) =>
        prevFiles.filter((file) => file.id != vcfDataId)
      );
    } catch (error) {
      console.log("Cannot Prosess this delete");
    }
  };

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
    setUploadProgress(0);
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
                  const tempPro = Math.round(
                    (transferredBytes / totalBytes) * 100
                  );
                  setUploadProgress(tempPro);
                }
              },
            },
          }).result;

          const newVCFFile: VcfData = {
            id: vcfID,
            id_patient: idPatient,
            genome_reference: selectedReferencetType, // You'll need to add this to your state
            sample_date: date?.toDateString() ?? "No Date Selected",
            uploadAt: getDateToday(), // Format the date as needed
            pathfile: filePath,
          };

          const saveData = async () => {
            try {
              const saveVCFData = await client.graphql({
                query: createVcfdata,
                variables: { input: newVCFFile },
              });
            } catch (error) {
              console.log(error);
            }
          };
          await saveData();
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
      setUploadProgress(0);
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
            <CardDescription className="text-gray-500 text-sm">
              This table contains variant call data for each patient, including
              genome reference, sample collection date, upload date, and
              actions. Please ensure that the data is up-to-date and complete.
            </CardDescription>
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
                        <div className="flex flex-row items-center">
                          <Button
                            variant={"ghost"}
                            className="flex"
                            onClick={handleShowModalVCFData}
                          >
                            {/* <Icon className="w-4 h-4"></Icon> */}
                            <small>
                              <TableOfContents className="w-4 h-4"></TableOfContents>
                            </small>
                          </Button>

                          <Separator
                            orientation="vertical"
                            className="h-8 w-px bg-gray-300"
                          ></Separator>
                          <Button
                            variant={"ghost"}
                            onClick={() =>
                              handleDeleteVCFData(
                                file.id ?? "",
                                file.pathfile ?? ""
                              )
                            }
                          >
                            <small>
                              <Trash2 className="h-4 w-4 text-red-700"></Trash2>
                            </small>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        {/* <VCFUploader id_patient={patient?.id ?? ""}></VCFUploader> */}
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
                  <div className="flex flex-col  mb-5 gap-3">
                    <LabelAndDescription
                      label="Genome Reference"
                      desc="Please select the appropriate reference genome version for
                      your VCF file. Ensure that the selected version matches
                      the reference genome used during variant calling to avoid
                      inconsistencies in analysis."
                    ></LabelAndDescription>
                    {/* <select
                      onChange={(e) => setSelectedReferenceType(e.target.value)}
                    >
                      <option>Select</option>
                      <option>GrCH38</option>
                      <option>GrCH37</option>
                    </select> */}

                    <Select
                      onValueChange={(value) => setSelectedReferenceType(value)}
                    >
                      <SelectTrigger className="w-full border bg-white border-black">
                        <SelectValue placeholder="Select the Genome Reference"></SelectValue>
                      </SelectTrigger>
                      <SelectContent className="p-4 mr-3 bg-white w-full border rounded-md">
                        <SelectGroup className="w-full border-gray-300">
                          <SelectLabel className="w-full">
                            Genome Reference
                          </SelectLabel>
                          <Separator></Separator>
                          <SelectItem className="w-full" value="GRCH38">
                            GRCH38
                          </SelectItem>
                          <SelectItem className="w-full" value="GRCH37">
                            GRCH37
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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

                  {uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  )}

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
        {showModalVCFData && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
            <div className="bg-white rounded-lg shadow-lg p-5 w-[1000px] h-[700px] flex flex-col">
              <div className="flex flex-row-reverse">
                <Button
                  variant="ghost"
                  onClick={handleShowModalVCFData}
                  className="bg-none hover:bg-none"
                >
                  <small>
                    <SquareX className="w-6 h-6 text-gray-400"></SquareX>
                  </small>
                </Button>
              </div>
              {/* <VCFUploader id_patient="Sample Patient ID" /> */}
              <VCFRawTable
                filepath={vcfFiles.at(0)?.pathfile ?? ""}
              ></VCFRawTable>
            </div>
          </div>
        )}
      </div>
      <Suspense></Suspense>
    </div>
  );
};

export default DataPatientPage;
