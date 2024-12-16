"use client";

import React, { useState } from "react";
import { uploadData } from "aws-amplify/storage";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Amplify } from "aws-amplify";
import config from "@/src/aws-exports";

Amplify.configure(config);
export default function VCFUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    setLoading(true);
    setUploadProgress(0);

    try {
      const fileKey = `public/${file.name}`;

      // Upload file to S3 with progress monitoring
      const result = await uploadData({
        path: fileKey,
        data: file,
        options: {
          onProgress: ({ transferredBytes, totalBytes }) => {
            if (totalBytes) {
              const progress = Math.round(
                (transferredBytes / totalBytes) * 100
              );
              setUploadProgress(progress);
            }
          },
        },
      }).result;

      console.log("Path from Response: ", result.path);

      // Call the Lambda API
      const apiUrl =
        "https://sdcmg4zzh7.execute-api.us-east-1.amazonaws.com/dev/parsevcf";
      const payload = {
        Records: [
          {
            s3: {
              bucket: {
                name: "senusashadcn-storage-31e4d581ab8b9-dev",
              },
              object: {
                key: result.path,
              },
            },
          },
        ],
      };

      const response = await axios.post(apiUrl, payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.data && response.data.body) {
        const parsedData = JSON.parse(response.data.body);
        setTableData(parsedData);
      } else {
        alert("No data returned from API.");
      }
    } catch (error) {
      console.error("Error uploading file or calling API:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">VCF File Uploader</h1>

      <div className="mb-4">
        <Input
          type="file"
          accept=".vcf,.vcf.gz,.gz"
          onChange={handleFileChange}
        />
      </div>

      {uploadProgress > 0 && (
        <div className="mb-4">
          <p>Upload Progress: {uploadProgress}%</p>
        </div>
      )}

      <Button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload and Process"}
      </Button>

      {tableData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Parsed VCF Data</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Chrom</TableHead>
                <TableHead>Pos</TableHead>
                <TableHead>ID</TableHead>
                <TableHead>Ref</TableHead>
                <TableHead>Alts</TableHead>
                <TableHead>Qual</TableHead>
                <TableHead>Filter</TableHead>
                <TableHead>Info</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell>{row.chrom}</TableCell>
                  <TableCell>{row.pos}</TableCell>
                  <TableCell>{row.id ?? "N/A"}</TableCell>
                  <TableCell>{row.ref}</TableCell>
                  <TableCell>{row.alts.join(", ")}</TableCell>
                  <TableCell>{row.qual ?? "N/A"}</TableCell>
                  <TableCell>{row.filter ?? "N/A"}</TableCell>
                  <TableCell>{row.info ?? "N/A"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
