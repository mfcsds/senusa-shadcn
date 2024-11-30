"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ColocatedVariant } from "@/utils/object";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { TableCell } from "@aws-amplify/ui-react";
import { Separator } from "../ui/separator";
import VariantSynonym from "./reviewvariant/VariantSynonym";
import { Source_Code_Pro } from "next/font/google";
import RefereceVariant from "./references/Reference";
import Reference from "./references/Reference";

interface VariantAlellelProops {
  data?: ColocatedVariant[];
}

const VariantAlellel: React.FC<VariantAlellelProops> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex flex-row items-center w-full text-balance">
        No Data Available
      </div>
    );
  }

  return (
    <div className="flex flex-col max-h-[500px] overflow-y-auto w-[1700px]">
      <Card className="border-none shadow-none">
        <CardContent>
          <div className="flex flex-col">
            <div className="flex flex-col gap-w"></div>
            {data.map((variant, idx) => (
              <Card key={idx} className="mb-4 border p-5 rounded-lg shadow-sm ">
                <CardHeader>
                  <CardTitle>Colocated Variant {idx + 1} </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Main table for the colocated variant details */}
                  <div className="flex flex-row  gap-5 ">
                    <div className="flex flex-col w-1/2 border rounded-md p-5">
                      <p className="font-semibold">
                        Variant Details and Clinical Significance
                      </p>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead>Detail</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>Allele String</TableCell>
                            <TableCell>
                              {variant.allele_string ?? "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Start Position</TableCell>
                            <TableCell>{variant.start ?? "-"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>End Position</TableCell>
                            <TableCell>{variant.end ?? "-"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Strand</TableCell>
                            <TableCell>{variant.strand ?? "-"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Sequence Region Name</TableCell>
                            <TableCell>
                              {variant.seq_region_name ?? "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Phenotype or Disease</TableCell>
                            <TableCell>
                              {variant.phenotype_or_disease ?? "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Somatic</TableCell>
                            <TableCell>{variant.somatic ?? "-"}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Clinical Significance</TableCell>
                            <TableCell>
                              {variant.clin_sig
                                ? variant.clin_sig.join(", ")
                                : "-"}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Clinical Significance Allele</TableCell>
                            <TableCell>
                              {variant.clin_sig_allele ?? "-"}
                            </TableCell>
                          </TableRow>
                          {/* Pubmed References */}
                          {/* <TableRow>
                            <TableCell>PubMed References</TableCell>
                            <TableCell>
                              {variant.pubmed && variant.pubmed.length > 0
                                ? variant.pubmed.map((id, index) => (
                                    <a
                                      key={index}
                                      href={`https://pubmed.ncbi.nlm.nih.gov/${id}/`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-500 hover:underline"
                                    >
                                      {id}
                                      {", "}
                                    </a>
                                  ))
                                : "-"}
                            </TableCell>
                          </TableRow> */}
                        </TableBody>
                      </Table>
                      {/* Ini adalah Variant Synonyms */}
                      {/* Nested table for synonyms if available */}
                    </div>
                    {/* Allele Frequenc */}
                    <div className="flex flex-col border rounded-md p-5 w-1/2">
                      <p className="font-semibold text-balance">
                        Allele Frequency Distribution Across Populations
                      </p>
                      <div className="flex flex-col">
                        {/* Nested table for frequencies if available */}
                        {variant.frequencies && (
                          <div className="mt-4 overflow-y-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Allele</TableHead>
                                  <TableHead>Population</TableHead>
                                  <TableHead>Frequency</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {Object.entries(variant.frequencies).map(
                                  ([allele, populations]) =>
                                    Object.entries(populations).map(
                                      ([population, frequency], index) => (
                                        <TableRow key={index}>
                                          <TableCell>{allele}</TableCell>
                                          <TableCell>{population}</TableCell>
                                          <TableCell>{frequency}</TableCell>
                                        </TableRow>
                                      )
                                    )
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-col w-full">
                      {variant.var_synonyms && (
                        <div className="mt-4 w-full flex flex-col gap-4">
                          <p className="text-lg font-semibold text-gray-700">
                            Synonyms
                          </p>
                          <div className="flex flex-col gap-4">
                            {Object.entries(variant.var_synonyms).map(
                              ([source, synonyms], index) => (
                                <div key={index} className=" p-4 rounded-lg">
                                  <p className="text-base font-medium text-violet-600">
                                    {source}
                                  </p>
                                  <div className="mt-2 text-gray-700">
                                    {source === "ClinVar" && synonyms ? (
                                      synonyms.map((synonym, synIndex) => (
                                        <div
                                          key={synIndex}
                                          className="flex flex-wrap items-center gap-2"
                                        >
                                          <VariantSynonym synonym={synonym} />
                                        </div>
                                      ))
                                    ) : synonyms ? (
                                      <span>{synonyms.join(", ")}</span>
                                    ) : (
                                      <span className="text-gray-500 italic">
                                        No synonyms available
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <div className="flex flex-col">
                        <p className="font-bold">Referencess</p>
                      </div>

                      <div className="flex flex-col gap-4">
                        {variant.pubmed && variant.pubmed.length > 0
                          ? variant.pubmed.map((id, index) => (
                              <Reference key={index} ref_code={id}></Reference>
                            ))
                          : "-"}
                      </div>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantAlellel;
