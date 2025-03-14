"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "../ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import VariantInformationModal from "./VariantInformationModal";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import VariantAnalysisResult from "./VariantAnalysisResult";
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

import VariantEditor from "../variantinterpretation/VariantEditor";
import { useToast } from "../ui/use-toast";

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

    await setSelectedVariant(
      result.data.listSelectedVariants.items as SelectedVariant[]
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
      id: sel?.id ?? "", // Generate or assign an ID if necessary
      id_patient: sel?.id_patient ?? "", // Use empty string if null or undefined
      id_vcf: sel?.id_vcf ?? "",
      id_report: sel?.id_report ?? "", // Set default empty string value
      gene_id: sel?.gene_id ?? "",
      gene_symbol: sel?.gene_symbol ?? "",
      chrom: sel?.chrom ?? "",
      pos: sel?.pos ?? "",
      id_var: sel?.id_var ?? "",
      ref: sel?.ref ?? "",
      alt: sel?.alt ?? "",
      qual: sel?.qual ?? "",
      zygosity: sel?.zygosity ?? "",
      global_allele: sel?.global_allele ?? 0, // Assuming 0 as a default for number fields
      functional_impact: sel?.functional_impact ?? "",
      acmg: sel?.acmg ?? "",
      reviewer_class: chooseClass, // Default empty string value
      clinical_sign: sel?.clinical_sign ?? "",
      hgvs: sel?.hgvs ?? "",
      severe_consequence: sel?.severe_consequence ?? "",
      sift_score: sel?.sift_score ?? 0,
      sift_prediction: sel?.sift_prediction ?? "",
      phenotypes: sel?.phenotypes ?? "",
      rsID: sel?.rsID ?? "", // Default // Current timestamp as ISO string
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
    <div className="flex flex-col w-screen">
      <Card className="w-full border-none h-screen">
        <CardHeader>
          <CardTitle>Result and Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-3">
            <div className="flex flex-col overflow-y-auto">
              <div className="flex flex-col ">
                {selectedVariantItemList.map((item, index) => (
                  <VariantEditor
                    key={index}
                    variantData={item}
                    onDeleteVariant={handleDeleteSelectedVariant}
                  ></VariantEditor>
                ))}
              </div>
              {/* <Separator></Separator>
              <div className="flex flex-col mt-4">
                <p className="text-xl font-semibold">Variant Interpretation</p>
              </div>
              <div className="flex flex-col h-[450px] min-h-[450px] overflow-y-auto gap-1">
                {variantInterpretations.length > 0 &&
                  variantInterpretations.map((item, index) => (
                    <VariantAnalysisResult
                      key={index}
                      varInterpretation={item}
                    ></VariantAnalysisResult>
                  ))}
              </div> */}
              {/* <div className="h-[300px] min-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold text-lg">
                        Variant Detail
                      </TableHead>
                      <TableHead className="font-semibold text-lg">
                        Zigosity
                      </TableHead>
                      <TableHead className="font-semibold text-lg">
                        ACMG
                      </TableHead>
                      <TableHead className="font-semibold text-lg">
                        Phenotypes
                      </TableHead>
                      <TableHead className="font-semibold text-lg">
                        Detail
                      </TableHead>
                      <TableHead className="font-semibold text-lg">
                        Remove
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedVariantItemList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex flex-row gap-10 ml-5 items-center">
                            <div
                              className={`border-l-4 ${getGeneColor(
                                item
                              )} w-[200px] items-start flex flex-col justify-start pl-5`}
                            >
                              <div className=" px-2 rounded-md border-gray-500 border-2">
                                {item.gene_symbol ? (
                                  <p
                                    className={`text-lg font-medium ${getTextGeneColor(
                                      item
                                    )}`}
                                  >
                                    {item.gene_symbol}
                                  </p>
                                ) : (
                                  <Skeleton
                                    aria-label="..."
                                    className="h-6 w-[100px]  bg-gray-300"
                                  />
                                )}
                              </div>
                              {item.gene_id ? (
                                <p className="text-lg font-medium text-gray-400 ">
                                  {item.gene_id}
                                </p>
                              ) : (
                                <Skeleton
                                  vocab="Loading"
                                  className="h-6 w-[150px] pl-2 mt-2 bg-gray-300"
                                />
                              )}
                            </div>
                            <div className="flex flex-col">
                              <p className="text-lg">{item.hgvs}</p>
                              {item.rsID ? (
                                <p className="text-lg font-sans text-gray-500 ">{`RSID: ${item.rsID?.toUpperCase()}`}</p>
                              ) : (
                                <Skeleton
                                  vocab="Loading"
                                  className="h-6 w-[100px] bg-gray-300"
                                />
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <p className="text-lg">{item.zigosity}</p>
                        </TableCell>
                        <TableCell>
                          <div
                            className={`flex flex-row items-center gap-2 justify-center rounded-md px-3 py-1 border-2 ${getBadgeColor(
                              item
                            )}`}
                          >
                            <p className="text-lg font-medium">{item.acmg}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">
                          <Accordion type="single" collapsible>
                            <AccordionItem value="phenotypes">
                              <AccordionTrigger>
                                <div className="flex flex-row items-center gap-3">
                                  <Button
                                    variant="link"
                                    className="text-lg text-gray-500"
                                  >{`${
                                    getPhenotypesList(item).length
                                  } Found`}</Button>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                {getPhenotypesList(item).length > 0 ? (
                                  <ul className="list-disc pl-5">
                                    {getPhenotypesList(item).map(
                                      (phenotype, index) => (
                                        <li
                                          key={index}
                                          className="text-gray-700 text-sm"
                                        >
                                          {phenotype}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                ) : (
                                  <p className="text-gray-500">
                                    No phenotypes available
                                  </p>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </TableCell>

                        <TableCell>
                          <div className="flex flex-row items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant={"ghost"}
                                    onClick={() =>
                                      isOpenVarDetail(item.id ?? "")
                                    }
                                  >
                                    <small>
                                      <TableOfContents className="w-4 h-4"></TableOfContents>
                                    </small>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>See Variant Detail</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <Separator
                              orientation="vertical"
                              className="h-5"
                            ></Separator>
                          </div>
                        </TableCell>
                        <TableCell>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant={"ghost"}
                                  onClick={(e) =>
                                    handleDeleteSelectedVariant(item.id ?? "")
                                  }
                                  className="hover:bg-red-600 hover:text-white"
                                >
                                  <small>
                                    <X className="w-4 h-4"></X>
                                  </small>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-balance w-[150px]">
                                  Delete Selected Variant and Interpretation
                                  from Analysis
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div> */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Variant Interpretation Modal */}
      <Dialog
        open={isOpenDetailVariantDialog}
        onOpenChange={() => setIsOpenDetailVariantDialog(false)}
      >
        {/* <div className="fixed inset-0 bg-black bg-opacity-0 pointer-events-none"></div> */}
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
