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
import { generateClient } from "aws-amplify/api";
import {
  getVariant,
  listVariants,
  listAcmgAnnotations,
} from "@/src/graphql/queries"; // Import queries
import { deleteAcmgAnnotation, deleteVariant } from "@/src/graphql/mutations"; // Import mutations

Amplify.configure(config);

export default function VCFUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [acmgAnnotations, setAcmgAnnotations] = useState<any[]>([]);

  const fetchAcmgAnnotationsByVariant = async () => {
    try {
      // Ambil semua data Variant
      const variantResponse = await client.graphql({
        query: listVariants,
        variables: { limit: 3000 },
      });

      const variants = variantResponse.data.listVariants.items;

      if (variants.length === 0) {
        console.log("No Variants found.");
        return;
      }

      let acmgData: any[] = [];

      // Iterasi setiap Variant untuk mendapatkan AcmgAnnotation yang sesuai
      for (const variant of variants) {
        const acmgResponse = await client.graphql({
          query: listAcmgAnnotations,
          variables: {
            filter: {
              id_variant: { eq: variant.id },
            },
          },
        });

        const annotations = acmgResponse.data.listAcmgAnnotations.items;
        annotations.forEach((annotation: any) => {
          acmgData.push({
            id_var: annotation.id_variant,
            acmg_class: annotation.acmg_class,
            PVS1: annotation.PVS1,
            PS1: annotation.PS1,
            PS2: annotation.PS2,
          });
        });
      }

      // Simpan data AcmgAnnotation dalam state
      setAcmgAnnotations(acmgData);
      console.log(acmgData);
      console.log("ACMG Annotations Data:", acmgData);
    } catch (error) {
      console.error("Error fetching ACMG Annotations by Variant:", error);
    }
  };

  // Initialize GraphQL client
  const client = generateClient();

  // Fungsi untuk mencari Variant berdasarkan ID
  const searchVariantById = async () => {
    const variantId = "vs-bg2PTTe2bjJM"; // ID yang ingin dicari

    try {
      const response = await client.graphql({
        query: getVariant,
        variables: { id: variantId },
      });

      console.log("Variant Search Result:", response.data.getVariant);

      if (!response.data.getVariant) {
        console.log(`Variant with ID ${variantId} not found.`);
      } else {
        console.log(`Variant found:`, response.data.getVariant);
      }
    } catch (error) {
      console.error("Error searching variant by ID:", error);
    }
  };

  // Fungsi untuk mencari AcmgAnnotation berdasarkan id_variant
  const searchAcmgByVariantId = async () => {
    const variantId = "vs-bg2PTTe2bjJM"; // ID Variant yang dicari di AcmgAnnotation

    try {
      const response = await client.graphql({
        query: listAcmgAnnotations,
        variables: {
          filter: {
            id_variant: { eq: variantId },
          },
        },
      });

      const acmgAnnotations = response.data.listAcmgAnnotations.items;

      if (acmgAnnotations.length === 0) {
        console.log(`No ACMG Annotation found for Variant ID: ${variantId}`);
      } else {
        console.log(
          `ACMG Annotations for Variant ID ${variantId}:`,
          acmgAnnotations
        );
      }
    } catch (error) {
      console.error("Error searching ACMG Annotation by Variant ID:", error);
    }
  };

  // Fungsi untuk menghapus semua AcmgAnnotations
  const deleteAllAcmgAnnotations = async () => {
    try {
      const response = await client.graphql({
        query: listAcmgAnnotations,
        variables: { limit: 3000 },
      });

      const acmgAnnotations = response.data.listAcmgAnnotations.items;

      if (acmgAnnotations.length === 0) {
        console.log("No ACMG Annotations found to delete.");
        return;
      }

      console.log(`Found ${acmgAnnotations.length} ACMG Annotations.`);

      for (const annotation of acmgAnnotations) {
        await client.graphql({
          query: deleteAcmgAnnotation,
          variables: { input: { id: annotation.id } },
        });
        console.log(`Deleted ACMG Annotation with ID: ${annotation.id}`);
      }

      console.log("All ACMG Annotations have been deleted.");
    } catch (error) {
      console.error("Error deleting ACMG Annotations:", error);
    }
  };

  // Fungsi untuk menghapus semua data di tabel Variant
  const deleteAllVariants = async () => {
    try {
      const response = await client.graphql({
        query: listVariants,
        variables: { limit: 3000 },
      });

      const variants = response.data.listVariants.items;

      if (variants.length === 0) {
        console.log("No Variants found to delete.");
        return;
      }

      console.log(`Found ${variants.length} Variants.`);

      for (const variant of variants) {
        await client.graphql({
          query: deleteVariant,
          variables: { input: { id: variant.id } },
        });
        console.log(`Deleted Variant with ID: ${variant.id}`);
      }

      console.log("All Variants have been deleted.");
    } catch (error) {
      console.error("Error deleting Variants:", error);
    }
  };

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

      <div className="mt-4 flex gap-4">
        <Button onClick={searchVariantById}>Search Variant by ID</Button>
        <Button onClick={searchAcmgByVariantId}>
          Search ACMG Annotation by Variant ID
        </Button>
        <Button onClick={deleteAllAcmgAnnotations} variant="destructive">
          Delete All ACMG Annotations
        </Button>
        <Button onClick={deleteAllVariants} variant="destructive">
          Delete All Variants
        </Button>

        <Button onClick={fetchAcmgAnnotationsByVariant}>
          Show ACMG Annotations by Variant
        </Button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">
          ACMG Annotations (by Variant ID)
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variant ID</TableHead>
              <TableHead>ACMG Class</TableHead>
              <TableHead>PVS1</TableHead>
              <TableHead>PS1</TableHead>
              <TableHead>PS2</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {acmgAnnotations.length > 0 ? (
              acmgAnnotations.map((annotation, index) => (
                <TableRow key={index}>
                  <TableCell>{annotation.id_var}</TableCell>
                  <TableCell>{annotation.acmg_class}</TableCell>
                  <TableCell>{annotation.PVS1 ? "Yes" : "No"}</TableCell>
                  <TableCell>{annotation.PS1 ? "Yes" : "No"}</TableCell>
                  <TableCell>{annotation.PS2 ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No ACMG Annotations found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
