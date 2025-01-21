"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";

import VariantInformationModal from "@/components/items/VariantInformationModal";

import {
  listSelectedVariants,
  listVariantInterpretations,
} from "@/src/graphql/queries";

import {
  deleteSelectedVariant,
  deleteVariantInterpretation,
  updateSelectedVariant,
} from "@/src/graphql/mutations";

import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { SelectedVariant, VariantInterpretation } from "@/utils/object";

import VariantEditor from "@/components/update/detailVariantReport/variantinterpretation/VariantEditor";
import { useToast } from "../../ui/use-toast";

Amplify.configure(config);

interface ResultAndInterpretationProops {
  patientid: string | null;
  id_report: string | null;
}

const getPhenotypesList = (item: SelectedVariant) => {
  const phenotypesList = item.phenotypes
    ? Array.from(new Set(item.phenotypes.split(";")))
    : [];
  return phenotypesList;
};

const ResultAndInterpretation: React.FC<ResultAndInterpretationProops> = ({
  patientid,
  id_report,
}) => {
  const [selectedVariantItemList, setSelectedVariant] = useState<
    SelectedVariant[]
  >([]);

  const [variantInterpretations, setVariantInterpretationResults] = useState<
    VariantInterpretation[]
  >([]);

  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedItemVar, setSelectedItemVar] = useState<SelectedVariant>();

  const client = generateClient();

  const [chooseClass, setChooseClass] = useState("");

  const { toast } = useToast();

  const handleDeleteSelectedVariant = async (idvar: string) => {
    try {
      // Delete the variant from the database
      await client.graphql({
        query: deleteSelectedVariant,
        variables: { input: { id: idvar } },
      });

      // Update the UI by filtering out the deleted variant
      setSelectedVariant((prevFiles) =>
        prevFiles.filter((file) => file.id !== idvar)
      );

      toast({
        title: "Delete Variant",
        description: "The variant has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting variant:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete the variant.",
      });
    }
  };

  const fecthSelectedVariant = async () => {
    const result = await client.graphql({
      query: listSelectedVariants,
      variables: { filter: { id_report: { eq: id_report } } },
    });

    setSelectedVariant(
      result.data.listSelectedVariants.items as unknown as SelectedVariant[]
    );
  };

  const isOpenVarDetail = async (idvar: string) => {
    await setSelectedItemVar(
      selectedVariantItemList.find((item) => item.id === idvar)
    );
    await setIsOpenDetailVariantDialog(!isOpenDetailVariantDialog);
  };

  const fetchVariantInterpretation = async () => {
    setVariantInterpretationResults([]);
    const result = await client.graphql({
      query: listVariantInterpretations,
      variables: { filter: { id_report: { eq: id_report } } },
    });

    await setVariantInterpretationResults(
      result.data.listVariantInterpretations.items as VariantInterpretation[]
    );
  };

  const handleUpdateClassVariant = async (id: string) => {
    let sel = selectedVariantItemList.find((item) => item.id === id);

    sel = {
      id: sel?.id ?? "",
      id_patient: sel?.id_patient ?? "",
      id_vcf: sel?.id_vcf ?? "",
      id_report: sel?.id_report ?? "",
      gene_id: sel?.gene_id ?? "",
      gene_symbol: sel?.gene_symbol ?? "",
      chrom: sel?.chrom ?? "",
      pos: sel?.pos ?? "",
      id_var: sel?.id_var ?? "",
      ref: sel?.ref ?? "",
      alt: sel?.alt ?? "",
      qual: sel?.qual ?? "",
      zygosity: sel?.zygosity ?? "",
      global_allele: sel?.global_allele ?? 0,
      functional_impact: sel?.functional_impact ?? "",
      acmg: sel?.acmg ?? "",
      reviewer_class: chooseClass,
      clinical_sign: sel?.clinical_sign ?? "",
      hgvs: sel?.hgvs ?? "",
      severe_consequence: sel?.severe_consequence ?? "",
      sift_score: sel?.sift_score ?? 0,
      sift_prediction: sel?.sift_prediction ?? "",
      phenotypes: sel?.phenotypes ?? "",
      rsID: sel?.rsID ?? "",
      gnomade: sel?.gnomade ?? 0,
      gnomadg: sel?.gnomadg ?? 0,
      alldesc: sel?.alldesc ?? "",
    };
    try {
      const result = client.graphql({
        query: updateSelectedVariant,
        variables: { input: sel },
      });
      if ((await result).data) {
        console.log("Sukses Update Data Variant");

        setSelectedVariant((prev) =>
          prev.map((item) =>
            item.id === sel.id ? { ...item, reviewer_class: chooseClass } : item
          )
        );
      }
    } catch (error) {}
  };

  useEffect(() => {
    fecthSelectedVariant();
    fetchVariantInterpretation();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="w-full h-screen">
        <div>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col overflow-y-auto">
              <div className="flex flex-col ">
                {selectedVariantItemList.map((item, index) => (
                  <VariantEditor
                    key={index}
                    variantData={item}
                    onDeleteVariant={handleDeleteSelectedVariant}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Variant Interpretation Modal */}
      <Dialog
        open={isOpenDetailVariantDialog}
        onOpenChange={() => setIsOpenDetailVariantDialog(false)}
      >
        <DialogContent className="max-w-7xl max-h-4xl ">
          <DialogTitle>Variant Information</DialogTitle>
          <DialogDescription>
            {`Here is the detailed information about the ${selectedItemVar?.hgvs}`}
          </DialogDescription>
          {/* Pass the hgvsNotation as a prop to the VariantInformationModal */}
          <VariantInformationModal
            id_variant={`${selectedItemVar?.id}`}
            hgvsNotation={`${selectedItemVar?.hgvs}`}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultAndInterpretation;
