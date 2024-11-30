"use client";
import { VariantRawData } from "@/utils/object";
import { Table } from "lucide-react";
import React, { useEffect, useState } from "react";
// Import Table Component
import { columns } from "../rawvariant/column";
import { DataTable } from "../rawvariant/data-table";

import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { listVariants } from "@/src/graphql/queries";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

Amplify.configure(config);

interface Data {
  data: VariantRawData[];
}

interface VCFId {
  id_vcf: string;
}

const VariantRawTable: React.FC<VCFId> = ({ id_vcf }) => {
  const [data, setData] = useState<VariantRawData[]>([]);

  const client = generateClient();

  const fetchingData = async () => {
    try {
      const result = client.graphql({
        query: listVariants,
        variables: { filter: { id_vcf: { eq: id_vcf } }, limit: 500 },
      });
      await setData((await result).data.listVariants.items as VariantRawData[]);
    } catch (error) {
      console.log("Error fetching variant sample");
    }
  };

  useEffect(() => {
    fetchingData();
  }, []);

  return (
    <div className="flex flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Variant Call Data</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data}></DataTable>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantRawTable;
