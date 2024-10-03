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
import { CreateSelectedVariantInput } from "@/src/API";
import {
  listSelectedVariants,
  listVariantInterpretations,
} from "@/src/graphql/queries";

import {
  deleteSelectedVariant,
  deleteVariantInterpretation,
} from "@/src/graphql/mutations";

import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Button } from "../ui/button";
import { MessageCircle, TableOfContents, X } from "lucide-react";
import { Separator } from "../ui/separator";
import LabelAndDescription from "./LabelAndDescription";
import { VariantInterpretation } from "@/utils/object";

Amplify.configure(config);

interface ResultAndInterpretationProops {
  patientid: string | null;
  id_report: string | null;
}

const ResultAndInterpretation: React.FC<ResultAndInterpretationProops> = ({
  patientid,
  id_report,
}) => {
  const [selectedVariantItemList, setSelectedVariant] = useState<
    CreateSelectedVariantInput[]
  >([]);

  const [variantInterpretations, setVariantInterpretationResults] = useState<
    VariantInterpretation[]
  >([]);

  const [isOpenDetailVariantDialog, setIsOpenDetailVariantDialog] =
    useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedItemVar, setSelectedItemVar] =
    useState<CreateSelectedVariantInput>();

  const client = generateClient();

  const fecthSelectedVariant = async () => {
    const result = await client.graphql({
      query: listSelectedVariants,
      variables: { filter: { id_report: { eq: id_report } } },
    });

    await setSelectedVariant(
      result.data.listSelectedVariants.items as CreateSelectedVariantInput[]
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

  useEffect(() => {
    fecthSelectedVariant();
    fetchVariantInterpretation();
  }, []);

  const handleDeleteSelectedVariant = async (idvar: string) => {
    try {
      const item = selectedVariantItemList.find((item) => item.id == idvar);
      const itemInter = variantInterpretations.find((item) => item.id == idvar);

      if (item) {
        const result = await client.graphql({
          query: deleteSelectedVariant,
          variables: { input: { id: item?.id ?? "" } },
        });

        await setSelectedVariant((prevFiles) =>
          prevFiles.filter((file) => file.id != idvar)
        );
      }

      if (itemInter) {
        const result = await client.graphql({
          query: deleteVariantInterpretation,
          variables: { input: { id: itemInter?.id ?? "" } },
        });

        fetchVariantInterpretation();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="w-full border-none h-screen">
        <CardHeader>
          <CardTitle>Result and Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-3">
            <div className="flexflex-col">
              <p className="font-semibold text-pretty text-sm gap-2">
                Selected Variant for Analysis
              </p>
              <div className="h-[300px] min-h-[300px] overflow-y-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Gene</TableHead>
                      <TableHead className="font-semibold">
                        Variant Detail
                      </TableHead>
                      <TableHead className="font-semibold">Zigosity</TableHead>

                      <TableHead className="font-semibold">
                        Global Allele Frequency
                      </TableHead>
                      <TableHead className="font-semibold">
                        Phenotypes
                      </TableHead>
                      <TableHead className="font-semibold">
                        ACMG Classification
                      </TableHead>
                      <TableHead className="font-semibold">
                        Reviewer-Classification
                      </TableHead>
                      <TableHead className="font-semibold">Detail</TableHead>
                      <TableHead className="font-semibold">Remove</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedVariantItemList.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{item.gene_symbol}</TableCell>
                        <TableCell>{item.hgvs}</TableCell>
                        <TableCell>{item.zigosity}</TableCell>
                        <TableCell>{item.global_allele}</TableCell>
                        <TableCell className="text-xs">
                          {item.phenotypes}
                        </TableCell>

                        <TableCell>{item?.acmg ?? "-"}</TableCell>

                        <TableCell>{item.reviewer_class}</TableCell>
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
              </div>
            </div>
            <Separator></Separator>
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
          <VariantInformationModal hgvsNotation={`${selectedItemVar?.hgvs}`} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ResultAndInterpretation;
