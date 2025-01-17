"use client";
import { VariantRawData, VcfData } from "@/utils/object";
import { Table } from "lucide-react";
import React, { useEffect, useState } from "react";
// Import Table Component
import { columns } from "../rawvariant/column";
import { DataTable } from "../rawvariant/data-table";

import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { listVariants, getVcfdata } from "@/src/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import axios from "axios";
import { toast } from "../ui/use-toast";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

Amplify.configure(config);

interface Data {
  data: VariantRawData[];
}

interface VCFId {
  id_vcf: string;
}

const VariantRawTable: React.FC<VCFId> = ({ id_vcf }) => {
  const [data, setData] = useState<VariantRawData[]>([]);
  const [vcfData, setVCFData] = useState<VcfData>();
  const [tableData, setTableData] = useState<any[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  const client = generateClient();

  // 1. Fetch the VCF data and store it in state
  useEffect(() => {
    const fetchVCFData = async () => {
      try {
        const result = await client.graphql({
          query: getVcfdata,
          variables: { id: id_vcf },
        });
        const data = result.data.getVcfdata as VcfData;
        // Only set vcfData if we actually got something
        if (data) {
          setVCFData(data);
        }
      } catch (error) {
        toast({
          title: "Error Read VCF Files",
          description: "Cannot read the VCF File",
        });
      }
    };

    fetchVCFData();
  }, [id_vcf, client]);

  // 2. Call the API *only* if we have a valid `vcfData`
  useEffect(() => {
    if (!hasFetched && vcfData && vcfData?.pathfile) {
      fetchingFromAPI();
      setHasFetched(true);
    }
  }, [vcfData]);

  const fetchingFromAPI = async () => {
    console.log("Iam here");
    try {
      const apiUrl =
        "https://sdcmg4zzh7.execute-api.us-east-1.amazonaws.com/dev/parsevcf";
      const payload = {
        Records: [
          {
            s3: {
              bucket: {
                // name: "senusashadcn-storage-31e4d581ab8b9-dev" config.NEXT,
                name: config.aws_user_files_s3_bucket,
              },
              object: {
                key: vcfData?.pathfile,
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
        console.log(
          "Array check:",
          Array.isArray(parsedData),
          parsedData.length
        );
        setTableData(parsedData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Variant Call Data</CardTitle>
        </CardHeader>
        <CardContent>
          {/* <DataTable columns={columns} data={data}></DataTable> */}
          {tableData && tableData.length > 0 ? (
            <div className="mt-6">
              <Table className="bg-white text-black">
                <TableHeader>
                  <TableRow>
                    <TableHead>Chrom</TableHead>
                    <TableHead>Pos</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Ref</TableHead>
                    <TableHead>Alts</TableHead>
                    <TableHead>Qual</TableHead>
                    <TableHead>Filter</TableHead>
                    <TableHead>Zygosity</TableHead>
                    <TableHead>AC</TableHead>
                    <TableHead>AF</TableHead>
                    <TableHead>AN</TableHead>
                    <TableHead>DP</TableHead>
                    <TableHead>FS</TableHead>
                    <TableHead>MQ</TableHead>
                    <TableHead>MQRankSum</TableHead>
                    <TableHead>QD</TableHead>
                    <TableHead>ReadPosRankSum</TableHead>
                    <TableHead>SOR</TableHead>
                    <TableHead>FractionInformativeReads</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.chrom}</TableCell>
                      <TableCell>{row.pos}</TableCell>
                      <TableCell>{row.id ?? "N/A"}</TableCell>
                      <TableCell>{row.ref}</TableCell>
                      <TableCell>{row.alts}</TableCell>
                      <TableCell>{row.qual ?? "N/A"}</TableCell>
                      <TableCell>{row.filter ?? "N/A"}</TableCell>
                      <TableCell>{row.zygosity ?? "N/A"}</TableCell>
                      <TableCell>{row.AC ?? "N/A"}</TableCell>
                      <TableCell>{row.AF ?? "N/A"}</TableCell>
                      <TableCell>{row.AN ?? "N/A"}</TableCell>
                      <TableCell>{row.DP ?? "N/A"}</TableCell>
                      <TableCell>{row.FS ?? "N/A"}</TableCell>
                      <TableCell>{row.MQ ?? "N/A"}</TableCell>
                      <TableCell>{row.MQRankSum ?? "N/A"}</TableCell>
                      <TableCell>{row.QD ?? "N/A"}</TableCell>
                      <TableCell>{row.ReadPosRankSum ?? "N/A"}</TableCell>
                      <TableCell>{row.SOR ?? "N/A"}</TableCell>
                      <TableCell>
                        {row.FractionInformativeReads ?? "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="mt-6">
              <p>No data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantRawTable;
