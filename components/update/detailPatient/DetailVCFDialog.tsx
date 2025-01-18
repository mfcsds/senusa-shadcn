"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import { List, X } from "lucide-react";
import { VariantRawData } from "@/utils/object";
import { columns } from "@/components/update/detailPatient/columns";
import { TableDetailVCF } from "@/components/update/detailPatient/TableDetailVCF";
import Button from "@/components/update/button/Button";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { fetchDetailVCF } from "@/hooks/useVcfData";

Amplify.configure(config);

interface Data {
  data: VariantRawData[];
}

interface VCFId {
  id_vcf: string;
}

const DetailVCFDialog: React.FC<VCFId> = ({ id_vcf }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<VariantRawData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadDetailVCF = async () => {
      try {
        setLoading(true);
        const fetchedDetailVCF = await fetchDetailVCF(id_vcf);
        setData(fetchedDetailVCF);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDetailVCF();
  }, []);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="iconBorderSecondary"
          size="small"
          icon={<List className="w-5 h-5" />}
        />
      </DialogTrigger>
      <DialogContent className="w-full max-w-[90%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2 mb-4">
            <span className="text-text-primary">Detail Variant Call Data</span>
          </DialogTitle>
        </DialogHeader>
        <TableDetailVCF columns={columns} data={data}></TableDetailVCF>
      </DialogContent>
    </Dialog>
  );
};

export default DetailVCFDialog;
