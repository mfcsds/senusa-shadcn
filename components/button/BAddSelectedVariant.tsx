"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Check, PlusCircle } from "lucide-react";
import { useToast } from "../ui/use-toast";
import {
  SelectedVariant,
  Variant,
  VariantInterpretation,
} from "@/utils/object";
import { generateClient } from "aws-amplify/api";
import {
  createSelectedVariant,
  createVariantInterpretation,
} from "@/src/graphql/mutations";
import { CreateSelectedVariantInput } from "@/src/API";
import { getSelectedVariant } from "@/src/graphql/queries";

interface SelectedVariantProops {
  dataVariant: Variant;
}

const BAddSelectedVariant: React.FC<SelectedVariantProops> = ({
  dataVariant,
}) => {
  const { toast } = useToast();
  const client = generateClient();
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [selectedVariant, setSelectedVariant] = useState<SelectedVariant>();

  //   This function is to check wether a variant has been added to variant interpretation in this report,
  // then button add should be disabled

  const checkVarInterpretation = async () => {
    try {
      const result = client.graphql({
        query: getSelectedVariant,
        variables: { id: dataVariant.id },
      });
      if ((await result).data) {
        await setSelectedVariant(
          (
            await result
          ).data.getSelectedVariant as SelectedVariant
        );
        if (
          selectedVariant?.id === dataVariant.id &&
          selectedVariant.id_report === dataVariant.id_report &&
          selectedVariant.id_vcf === dataVariant.id_vcf
        ) {
          setButtonDisabled(true);
        }
      }
    } catch (error) {
      toast({
        description: `${error}`,
      });
    }
  };

  useEffect(() => {
    checkVarInterpretation();
  });

  const handleAddedVariant = async () => {
    try {
      const itemTemp: CreateSelectedVariantInput = {
        id_report: dataVariant.id_report,
        id_patient: dataVariant.id_patient,
        id: dataVariant.id, // ID type is represented as string in TypeScript
        id_vcf: dataVariant.id_vcf,
        gene_id: dataVariant.gene_id,
        gene_symbol: dataVariant.gene_symbol,
        chrom: dataVariant.chrom,
        pos: dataVariant.pos,
        id_var: dataVariant.id_var,
        ref: dataVariant.ref,
        alt: dataVariant.alt,
        qual: dataVariant.qual,
        zygosity: dataVariant.zygosity, // Float type in TypeScript is represented as number
        functional_impact: dataVariant.functional_impact,
        acmg: dataVariant.acmg,
        reviewer_class: "",
        clinical_sign: dataVariant.clinicalSign,
        hgvs: dataVariant.hgvs,
        severe_consequence: dataVariant.severeconsequence,
        sift_score: dataVariant.sift_score,
        sift_prediction: dataVariant.sift_prediction,
        phenotypes: dataVariant.phenotypes,
        rsID: dataVariant.rsID,
        gnomade: dataVariant.gnomade,
        gnomadg: dataVariant.gnomadg,
        alldesc: dataVariant.alldesc,
      };
      const result = client.graphql({
        query: createSelectedVariant,
        variables: { input: itemTemp },
      });
      if ((await result).data) {
        try {
          const tempVarInter: VariantInterpretation = {
            id: itemTemp.id!,
            hgvs: itemTemp.hgvs ?? "",
            id_report: itemTemp.id_report ?? "",
            id_patient: itemTemp.id_patient ?? "",
            text: "",
            id_varsample: itemTemp.id_var ?? "",
            alldesc: itemTemp.alldesc ?? "",
            gene_id: itemTemp.gene_id ?? "",
            gene_symbol: itemTemp.gene_symbol ?? "",
          };
          const re = await client.graphql({
            query: createVariantInterpretation,
            variables: { input: tempVarInter },
          });
        } catch (error) {
          toast({ description: `${error}` });
        }
      }
      setButtonDisabled(true);
    } catch (error) {
      toast({ description: `${error}` });
    }
  };

  return (
    <Button
      disabled={isButtonDisabled}
      variant={"outline"}
      className={
        isButtonDisabled
          ? "bg-green-200 border-2 border-green-800"
          : "hover:bg-green-500 hover:text-white"
      }
      onClick={() => {
        handleAddedVariant();
        toast({
          description: `${dataVariant.hgvs} has been added to Variant Interpretation`,
        });
      }}
    >
      {isButtonDisabled ? (
        <Check className="w-4 h-4 text-black font-extrabold"></Check>
      ) : (
        <PlusCircle className="w-4 h-4 "></PlusCircle>
      )}
    </Button>
  );
};

export default BAddSelectedVariant;
