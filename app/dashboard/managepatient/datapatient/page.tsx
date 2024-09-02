"use client";
import { Button } from "@/components/ui/button";
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
import { Plus } from "lucide-react";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import graphqlOperation, { Amplify } from "aws-amplify";

import config from "@/src/amplifyconfiguration.json";
import { uploadData } from "aws-amplify/storage";
import { getUrl } from "aws-amplify/storage";
import { Label } from "@/components/ui/label";

Amplify.configure(config);

interface vcfData {
  id: string;
  referenceType: string;
  uploadDate: string;
  downloadLink?: string;
}

const DataPatientPage = () => {
  const [uploadModal, setUploadModal] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [vcfFiles, setVCFFiles] = useState<vcfData[]>([]);
  const [selectedReferencetType, setSelectedReferenceType] = useState("");
  // State for files
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles([...files, ...acceptedFiles]);
    },
    accept: {
      "application/octet-stream": [".gz", ".tbi"], // Accepted file types
    }, // Accepted file types, // Accepted file types
  });

  const openUploadModal = () => {
    setUploadModal(!uploadModal);
  };

  const uploadFilesButton = async () => {
    console.log("Click Upload Button");
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
              expiresIn: 300,
              // whether to use accelerate endpoint
              useAccelerateEndpoint: false,
            },
          });
          const newVCFFile = {
            id: filePath,
            referenceType: selectedReferencetType, // You'll need to add this to your state
            uploadDate: new Date().toLocaleDateString(), // Format the date as needed
            downloadLink: urlFile.url.href,
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
          <p className="ml-4">120321-2391231</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Patient Name</p>
          </div>
          <div>:</div>
          <p className="ml-4">Muhamad Fathurahman</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Sex</p>
          </div>
          <div>:</div>
          <p className="ml-4">Male</p>
        </div>
        <div className="flex flex-row w-full">
          <div className="w-[200px]">
            <p className="font-semibold text-sm">Date of Birth</p>
          </div>
          <div>:</div>
          <p className="ml-4">19 December 2012</p>
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
                    <TableHead>Reference Genome Version</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Link</TableHead>
                    <TableHead>Delete File</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vcfFiles.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell>{file.id}</TableCell>
                      <TableCell>{file.referenceType}</TableCell>
                      <TableCell>{file.uploadDate}</TableCell>
                      <TableCell>
                        <a href={file.referenceType}>Download Link</a>
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
        {uploadModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-65">
            <Card className="w-full max-w-screen-md p-5">
              <CardHeader>
                <CardTitle>Upload Patient Variant Data</CardTitle>
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
                    <Label>File Type</Label>
                    <CardDescription>
                      Please select the appropriate reference genome version for
                      your VCF file. Ensure that the selected version matches
                      the reference genome used during variant calling to avoid
                      inconsistencies in analysis.
                    </CardDescription>
                    <select
                      onChange={(e) => setSelectedReferenceType(e.target.value)}
                    >
                      <option>GrCH37</option>
                      <option>GrCH38</option>
                    </select>
                  </div>
                  <div>
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
