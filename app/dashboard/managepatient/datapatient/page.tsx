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
  PlusCircle,
  Search,
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
import {
  generateHGVS,
  generateHGVS2,
  generateVariantSampleID,
  generateVCFDataID,
} from "@/utils/function";
import { Variant, VcfData } from "@/utils/object";
import { getDateToday } from "@/utils/DateHelperFunction";
import { useSearchParams } from "next/navigation";

import { getPatient } from "@/src/graphql/queries";
import { listVcfdata } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { CreatePatientInput } from "@/src/API";
import { createVariant, createVcfdata } from "@/src/graphql/mutations";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import { Input } from "@/components/ui/input";

import { listVariants } from "@/src/graphql/queries";

import { remove } from "aws-amplify/storage";
import { deleteVcfdata } from "@/src/graphql/mutations";
import { Amplify } from "aws-amplify";
import VCFRawTable from "@/components/items/VCFRawTable";
import ButtonAddFamilyDisease from "@/components/button/ButtonAddFamilyDisease";
import VariantRawTable from "@/components/items/VariantRawTable";

Amplify.configure(config);

interface VariantRawData {
  id_patient: string;
  id_vcf: string;
  id_var: string;
  chrom: string;
  pos: string;
  id: string;
  ref: string;
  alt: string;
  qual: string;
  filter: string;
  info: string;
  hgvs: string;
  acmg: string;
}

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
  const [readVariantFromText, setReadVariantFromText] = useState<
    VariantRawData[]
  >([]);

  // Function to read VCF file and parse its contents
  const handlePreviewVCFFile = (file: File) => {
    const reader = new FileReader();

    reader.onload = async (e) => {
      const vcfText = e.target?.result as string;

      if (!vcfText || vcfText.trim() === "") {
        console.error("The file appears to be empty or unreadable.");
        return;
      }

      const lines = vcfText.split("\n");
      const headerLine = lines.find((line) => line.startsWith("#CHROM"));

      if (!headerLine) {
        console.error("Invalid VCF file: Missing header line (#CHROM)");
        return;
      }

      const dataLines = lines.filter(
        (line) => !line.startsWith("#") && line.trim() !== ""
      );

      const parsedVariants: VariantRawData[] = dataLines.map((line) => {
        const fields = line.split("\t");
        return {
          chrom: fields[0],
          pos: fields[1],
          id: generateVariantSampleID(),
          ref: fields[3],
          alt: fields[4],
          qual: fields[5],
          filter: fields[6],
          info: fields[7],
          id_vcf: vcfID,
          id_patient: idPatient ?? "",
          id_var: fields[2],
          hgvs: generateHGVS2(fields[0], fields[1], fields[3], fields[4]),
          acmg: "Benign",
        };
      });

      // Set the parsed variants to state for preview
      setReadVariantFromText(parsedVariants);
    };

    reader.onerror = () => {
      console.error("Error reading the file. Please try again.");
    };

    reader.readAsText(file);
  };

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
      acceptedFiles.forEach(handlePreviewVCFFile);
    },
    accept: {
      "application/octet-stream": [".vcf", ".tbi"], // Accepted file types
    }, // Accepted file types, // Accepted file types
  });

  const openUploadModal = () => {
    setUploadModal(!uploadModal);
  };

  const saveSampleVariant = async (variant: VariantRawData) => {
    try {
      // Fetch ACMG classification from the API
      const response = await fetch(
        "https://yyj4sdbsd6.execute-api.us-east-1.amazonaws.com/dev-acmg/classification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            body: JSON.stringify({
              variants: [variant.hgvs],
            }),
          }),
        }
      );

      // Check if the API call was successful
      if (!response.ok) {
        throw new Error("Failed to fetch ACMG classification");
      }

      const data = await response.json();

      // Parse the ACMG result from the API response
      const acmgResults = JSON.parse(data.body); // Assuming `body` is a stringified array
      if (acmgResults && acmgResults.length > 0) {
        variant.acmg = acmgResults[0].acmg; // Extract `acmg` value
      } else {
        throw new Error("ACMG classification not found in the response");
      }

      // Store the variant in the database only if `acmg` is filled
      if (variant.acmg) {
        const result = await client.graphql({
          query: createVariant,
          variables: { input: variant },
        });
        console.log("Variant saved successfully", result);
      } else {
        console.error("ACMG classification is missing, variant not saved");
      }
    } catch (error) {
      console.error("Error saving variant:", error);
    }
  };

  const uploadFilesButton = async () => {
    console.log("Click Upload Button");
    setVCFID(generateVCFDataID());
    setUploadProgress(0);

    // Save to Database
    try {
      const upload = await Promise.all(
        // Upload Data
        files.map(async (file) => {
          // path for storing the vcf data
          const filePath = `public/${idPatient}/${"vcf"}/${vcfID}/${file.name}`;
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
          // Create Instance vcf Data
          const newVCFFile: VcfData = {
            id: vcfID,
            id_patient: idPatient,
            genome_reference: selectedReferencetType, // You'll need to add this to your state
            sample_date: date?.toDateString() ?? "No Date Selected",
            uploadAt: getDateToday(), // Format the date as needed
            pathfile: filePath,
            number_variant: readVariantFromText.length,
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
    } catch (error) {
      console.log(error);
    } finally {
      setUploadModal(!uploadModal);
      setFiles([]);
      setUploadProgress(0);
    }
    await readVariantFromText.forEach(saveSampleVariant);
  };

  const cancelButtonUpload = () => {
    setUploadModal(!uploadModal);
    setFiles([]);
    setReadVariantFromText([]);
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
        <div className="flex flex-row w-full p-2 justify-between items-center">
          <div className="flex flex-row">
            <div className="w-[200px]">
              <p className="font-semibold text-sm">Family Disease History</p>
            </div>
            <div>:</div>
            <p className="ml-4">-</p>
          </div>
          <ButtonAddFamilyDisease
            patient_id={idPatient}
          ></ButtonAddFamilyDisease>
        </div>
        <Separator className="mt-10"></Separator>
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
                    <TableHead>Number of Variants</TableHead>
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
                      <TableCell>{file.number_variant}</TableCell>
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

        {/* New Table for Variants Data References */}

        <Card>
          <CardHeader>
            <CardTitle>Patient Variant Data Reference Call</CardTitle>
          </CardHeader>
        </Card>

        {/* <VCFUploader id_patient={patient?.id ?? ""}></VCFUploader> */}
        {uploadModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
            <Card className="w-screen  max-w-screen-2xl p-5 ">
              <CardHeader className="mb-1 gap-3">
                <CardTitle>Upload Variant Call Data</CardTitle>
                <CardDescription>
                  Please select and upload your VCF file containing the variant
                  data. Ensure that the file follows the correct format and is
                  below the maximum upload size. Once uploaded, the system will
                  process the file, and the variant data will be displayed in
                  the table below. If you encounter any issues, please contact
                  support.
                </CardDescription>
                <Separator></Separator>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col w-full gap-3">
                  <div className="grid grid-cols-2 gap-4 ">
                    <div className="flex flex-col">
                      <div className="flex flex-col mb-5 gap-3">
                        <LabelAndDescription
                          label="Genome Reference"
                          desc="Please select the appropriate reference genome version for
                      your VCF file. Ensure that the selected version matches
                      the reference genome used during variant calling to avoid
                      inconsistencies in analysis."
                        ></LabelAndDescription>
                        <Select
                          onValueChange={(value) =>
                            setSelectedReferenceType(value)
                          }
                        >
                          <SelectTrigger className="w-[250px] border bg-white border-black">
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
                      <div className=" flex flex-col mb-2 gap-2 ">
                        <LabelAndDescription
                          label="Sample Date"
                          desc="The date when the patient’s sample was collected for variant analysis. Please select the accurate collection date to ensure proper tracking of sample data."
                        ></LabelAndDescription>
                        <div className="">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[250px] justify-start text-left font-normal",
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
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
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
                    </div>
                    <div className="flex flex-row gap-10">
                      <div className="flex flex-col ">
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
                              Drag n drop some files here, or click to select
                              files
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
                    </div>
                  </div>
                  <Separator></Separator>
                  {/* Preview Data */}
                  <div className="flex flex-col">
                    <div className="flex flex-col ">
                      <LabelAndDescription
                        label="Preview Variant Data"
                        desc="Detail"
                      ></LabelAndDescription>
                      <Table className="overflow-y-auto h-[300px] block">
                        <TableHeader className="sticky top-0 bg-white z-10">
                          <TableRow>
                            <TableHead className="w-1/6">Chrom</TableHead>
                            <TableHead className="w-1/6">Pos</TableHead>
                            <TableHead className="w-1/6">Id</TableHead>
                            <TableHead className="w-1/6">Ref</TableHead>
                            <TableHead className="w-1/6">Alt</TableHead>
                            <TableHead className="w-1/6">Qual</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody className="overflow-y-auto">
                          {readVariantFromText.map((variant, idx) => (
                            <TableRow key={idx} className="text-xs">
                              <TableCell>{variant.chrom}</TableCell>
                              <TableCell>{variant.pos}</TableCell>
                              <TableCell>{variant.id_var}</TableCell>
                              <TableCell>{variant.ref}</TableCell>
                              <TableCell>{variant.alt}</TableCell>
                              <TableCell>{variant.qual}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
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
            <div className="bg-white rounded-lg shadow-lg p-5 w-[1200px] h-[1000px] flex flex-col">
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
              {/* <VCFRawTable
                filepath={vcfFiles.at(0)?.pathfile ?? ""}
              ></VCFRawTable> */}
              <VariantRawTable
                id_vcf={vcfFiles.at(0)?.id ?? ""}
              ></VariantRawTable>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPatientPage;
