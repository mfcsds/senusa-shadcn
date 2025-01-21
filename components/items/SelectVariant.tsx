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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import VariantInformationModal from "./VariantInformationModal";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { columns } from "../selectedvariant/column";
import { DataTable } from "../selectedvariant/data-table";

// import { columns } from "../rawvariant/column";
// import { DataTable } from "../rawvariant/data-table";

interface SelectVariantProops {
  patientid: string | null;
  id_report: string | null;
}

const SelectVariant: React.FC<SelectVariantProops> = ({
  patientid,
  id_report,
}) => {
  const [vcfData, setVCFData] = useState<VcfData[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [variantItem, setVariantList] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(false);

  const client = generateClient();

  const [selectedVariant, setSelectedVariant] = useState<Variant>();

  const fetchVCFData = async () => {
    try {
      const result = await client.graphql({
        query: listVcfdata,
        variables: { filter: { id_patient: { eq: patientid } } },
      });
      setVCFData(result.data.listVcfdata.items as VcfData[]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVCFData();
  }, []);

  const [selectedVCF, setSelectedVCF] = useState<VcfData | null>(null);
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

  const newReadVCFData = async (vcfID: string) => {
    setVariantList([]); // Clear previous data
    setLoading(true);
    let allVariants: VariantRawData[] = []; // Array to hold all fetched items
    let nextToken: string | null = null; // Token to fetch the next page
    try {
      do {
        const result = (await client.graphql({
          query: listVariants,
          variables: {
            filter: { id_vcf: { eq: vcfID } },
            limit: 100,
            nextToken,
          },
        })) as {
          data: {
            listVariants: { items: VariantRawData[]; nextToken: string | null };
          };
        };
        // Concatenate the new items to the allVariants array
        allVariants = allVariants.concat(result.data.listVariants.items);
        nextToken = result.data.listVariants.nextToken; // Update nextToken for the next iteration
      } while (nextToken); // Continue until there's no more data to fetch

      // Set the full list of fetched variants
      const parsedVariants = await allVariants.map((item) => {
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
          variantReportID: id_report ?? "",
          zygosity: item.zygosity ?? "",
          globalallele: null, // Set to null to indicate loading state
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
      console.error("Error fetching variants:", error);
    } finally {
      setLoading(false);
    }
  };

  const [loadingVarList, setLoadingVarList] = useState(false);

  const handleAddSelectedVariant = async (idvar: string) => {
    // Find the variant that matches the provided idvar
    const variant = variantItem.find((varItem) => varItem.id === idvar);

    // Check if variant is found before proceeding
    if (!variant) {
      console.error(`Variant with ID ${idvar} not found`);
      return;
    }

    // Create the selected variant object based on the Variant object
    const selectedVarItem: Variant = {
      id: variant.id, // Generate or assign an ID if necessary
      id_patient: variant.id_patient ?? "", // Use empty string if null or undefined
      id_vcf: variant.id_vcf ?? "",
      id_report: variant.variantReportID,
      variantReportID: variant.variantReportID, // Set default empty string value
      gene_id: variant.gene_id ?? "",
      gene_symbol: variant.gene_symbol ?? "",
      chrom: variant.chrom ?? "",
      pos: variant.pos ?? "",
      id_var: variant.id_var ?? "",
      ref: variant.ref ?? "",
      alt: variant.alt ?? "",
      qual: variant.qual ?? "",
      filter: variant.filter ?? "",
      info: variant.info ?? "",
      af: variant.af ?? 0,
      ac: variant.ac ?? 0,
      an: variant.an ?? 0,
      dp: variant.dp ?? 0,
      fs: variant.dp ?? 0,
      mq: variant.mq ?? 0,
      mqranksum: variant.mqranksum ?? 0,
      qd: variant.qd ?? 0,
      readposrank: variant.readposrank ?? 0,
      sor: variant.sor ?? 0,
      fraction: variant.fraction ?? 0,
      zygosity: variant.zygosity ?? "",
      globalallele: variant.globalallele ?? 0, // Assuming 0 as a default for number fields
      functional_impact: variant.functional_impact ?? "",
      acmg: variant.acmg ?? "",
      clinicalSign: variant.clinicalSign ?? "",
      hgvs: variant.hgvs ?? "",
      severeconsequence: variant.severeconsequence ?? "",
      sift_score: variant.sift_score ?? 0,
      sift_prediction: variant.sift_prediction ?? "",
      phenotypes: variant.phenotypes ?? "",
      rsID: variant.rsID ?? "", // Default // Current timestamp as ISO string
      gnomade: variant.gnomade,
      gnomadg: variant.gnomadg,
      alldesc: variant.alldesc,
    };

    const saveToAnalysisAndResult = async () => {
      try {
        const result = await client.graphql({
          query: createSelectedVariant,
          variables: { input: selectedVarItem },
        });
      } catch (error) {
        console.log(error);
      }
    };
    await saveToAnalysisAndResult();

    const newVarInter: VariantInterpretation = {
      id: selectedVarItem.id ?? "",
      text: "No Interpretation",
      hgvs: selectedVarItem.hgvs ?? "",
      id_patient: selectedVarItem.id_patient ?? "",
      id_report: selectedVarItem.id_report ?? "",
      id_varsample: selectedVarItem.id ?? "",
      gene_symbol: selectedVarItem.gene_symbol ?? "",
      gene_id: selectedVarItem.gene_id ?? "",
      alldesc: selectedVarItem.alldesc ?? "",
    };
    const saveInterpretation = async () => {
      try {
        const result = await client.graphql({
          query: createVariantInterpretation,
          variables: { input: newVarInter },
        });
      } catch (error) {
        console.log("Error Add Selected Variant Interpretation");
      }
    };
    await saveInterpretation();
  };

  const isOpenVarDetail = async (idvar: string) => {
    await setSelectedVariant(variantItem.find((item) => item.id === idvar));
    await setIsOpenDetailVariantDialog(!isOpenDetailVariantDialog);
  };

  return (
    <div className="flex flex-col w-fit">
      <div className="flex flex-col border rounded-md py-4 px-5 gap-4">
        <div className="flex flex-row items-center gap-10">
          <div className="flex flex-col">
            <p className="text-xl">Choose Variant Data</p>
            <p className="text-sm">Select the Variant Call Files</p>
          </div>

          <Select onValueChange={(value) => newReadVCFData(value)}>
            <SelectTrigger className="w-[500px] h-[50px] text-left">
              <SelectValue placeholder={"Select the VCF Files"}></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select Variant Call Data</SelectLabel>
              </SelectGroup>
              {vcfData.map((item, idx) => (
                <SelectItem key={idx} value={item.id ?? ""}>
                  <div className="flex flex-row gap-2 p-4 rounded-lg">
                    <p className="font-semibold text-lg text-gray-900">
                      {item.id}
                    </p>
                    {/* <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">
                        Collection Date:
                      </span>{" "}
                      {item.sample_date}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium text-gray-800">
                        Upload Date:
                      </span>{" "}
                      {item.uploadAt}
                    </p> */}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <p>fetching data variant...</p>
        ) : (
          <DataTable columns={columns} data={variantItem}></DataTable>
        )}
      </div>
    </div>
  );
};

export default SelectVariant;
