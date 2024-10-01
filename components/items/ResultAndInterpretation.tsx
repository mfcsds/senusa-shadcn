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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import VariantAnalysisResult from "./VariantAnalysisResult";
import { CreateSelectedVariantInput } from "@/src/API";
import { listSelectedVariants } from "@/src/graphql/queries";
import { deleteSelectedVariant } from "@/src/graphql/mutations";

import config from "@/src/amplifyconfiguration.json";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { Button } from "../ui/button";
import { MessageCircle, TableOfContents, X } from "lucide-react";
import { Separator } from "../ui/separator";
import LabelAndDescription from "./LabelAndDescription";

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

  useEffect(() => {
    fecthSelectedVariant();
  }, []);

  const handleDeleteSelectedVariant = async (idvar: string) => {
    try {
      const item = selectedVariantItemList.find((item) => item.id == idvar);

      if (item) {
        const result = await client.graphql({
          query: deleteSelectedVariant,
          variables: { input: { id: item?.id ?? "" } },
        });

        setSelectedVariant((prevFiles) =>
          prevFiles.filter((file) => file.id != idvar)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
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
                      <TableHead className="font-semibold">Actions</TableHead>
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
                        <TableCell>{item.phenotypes}</TableCell>

                        <TableCell>{item?.acmg ?? "-"}</TableCell>

                        <TableCell>{item.reviewer_class}</TableCell>
                        <TableCell>
                          <div className="flex flex-row items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant={"ghost"}>
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

                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant={"ghost"}>
                                    <small>
                                      <MessageCircle className="w-4 h-4"></MessageCircle>
                                    </small>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Add Variant Interpretation</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
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
                                >
                                  <small>
                                    <X className="w-4 h-4"></X>
                                  </small>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Delete Variant from Analysis</p>
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
            <div className="flex flex-col">
              <p className="text-xl font-semibold">Variant Interpretation</p>
            </div>
            <div className=""></div>
            {selectedVariantItemList.length > 0 &&
              selectedVariantItemList.map((item, index) => (
                <VariantAnalysisResult
                  key={index}
                  hgvs={item.hgvs ?? ""}
                ></VariantAnalysisResult>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultAndInterpretation;
