"use client";
import React, { useEffect, useState } from "react";
import {
  Variant,
  VariantInterpretation,
  VariantRawData,
  VcfData,
} from "@/utils/object";
import { fetchVariantDetails4 } from "@/utils/function";
import { listVariants, listVcfdata } from "@/src/graphql/queries";
import {
  createSelectedVariant,
  createVariantInterpretation,
} from "@/src/graphql/mutations";

import { generateClient } from "aws-amplify/api";
import { CreateSelectedVariantInput } from "@/src/API";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Columns } from "@/components/update/detailVariantReport/selectVariant/Columns";
import { TableVariants } from "@/components/update/detailVariantReport/selectVariant/TableVariants";

// import { Columns } from "../rawvariant/column";
// import { TableVariants } from "../rawvariant/data-table";

interface SelectVariantProops {
  patientid: string | null;
  id_report: string | null;
  data?: VariantRawData[];
  onUpdateVariant: (id: string, updatedACMGClass: string) => void;
}

const SelectVariant: React.FC<SelectVariantProops> = ({
  patientid,
  id_report,
  data,
}) => {
  // const [error, setError] = useState<string | null>(null);
  const [variantItem, setVariantList] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);

  const client = generateClient();

  const [selectedVariant, setSelectedVariant] = useState<Variant>();

  useEffect(() => {
    // fetchVCFData();
    processVariantList();
  }, [data]);

  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [vcfContent, setVcfContent] = useState("");
  // Handle VCF selection change

  // const newhandleVCFSelection = (value: string) => {
  //   const selected = vcfData.find((item) => item.id === value);
  //   setSelectedVCF(selected ?? null);
  //   setError(null);
  //   readSelectedVCF();
  // };

  const processVariantList = async () => {
    setVariantList([]); // Clear previous data
    setLoading(true);

    if (data) {
      try {
        const parsedVariants = await data?.map((item) => {
          const variantTemporary: Variant = {
            id: item.id ?? "",
            id_patient: item.id_patient ?? "",
            id_vcf: item.id_vcf ?? "",
            id_report: id_report ?? "",
            chrom: item.chrom ?? "",
            pos: item.pos ?? "",
            id_var: item.id_var ?? "",
            ref: item.ref ?? "",
            alt: item.alt ?? "",
            qual: item.qual ?? "",
            filter: item.filter ?? "",
            info: item.filter ?? "",
            hgvs: item.hgvs ?? "",
            af: item.af ?? 0,
            ac: item.ac ?? 0,
            an: item.an ?? 0,
            dp: item.dp ?? 0,
            fs: item.dp ?? 0,
            mq: item.mq ?? 0,
            mqranksum: item.mqranksum ?? 0,
            qd: item.qd ?? 0,
            readposrank: item.readposrank ?? 0,
            sor: item.sor ?? 0,
            fraction: item.fraction ?? 0,
            zygosity: item.zygosity ?? "", // Set to null to indicate loading state
            functional_impact: "",
            acmg: item.acmg ?? "VUS",
            clinicalSign: "", // Set to null to indicate loading state
            gene_id: null,
            gene_symbol: null,
            severeconsequence: null,
            sift_score: null,
            sift_prediction: null,
            phenotypes: null,
            rsID: null,
            gnomade: null,
            gnomadg: null,
            alldesc: null,
            inheritance: null,
          };
          return variantTemporary;
        });
        await setVariantList(parsedVariants);
        await parsedVariants.forEach((variant, index) => {
          fetchVariantDetails4(variant)
            .then((details) => {
              setVariantList((prevVariants) => {
                const newVariants = [...prevVariants];
                newVariants[index] = { ...newVariants[index], ...details };
                // console.log(newVariants[index].phenotypes);
                return newVariants;
              });
            })
            .then((variant) => {
              console.log("Variant: Sukses");
              // console.log(`${var}`);
            });
        });
      } catch (error) {
        console.error("Error Read Variant");
      } finally {
        setLoading(false);
      }
    }
  };

  const isOpenVarDetail = async (idvar: string) => {
    await setSelectedVariant(variantItem.find((item) => item.id === idvar));
    await setIsOpenDetailVariantDialog(!isOpenDetailVariantDialog);
  };

  return (
    <div className="flex flex-col w-fit">

        {loading ? (
          <p>fetching data variant...</p>
        ) : (
          <TableVariants columns={Columns} data={variantItem}></TableVariants>
        )}
    </div>
  );
};

export default SelectVariant;
