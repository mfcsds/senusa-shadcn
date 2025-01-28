"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/update/ui/card";
import { ColocatedVariant } from "@/utils/object";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { TableCell } from "@aws-amplify/ui-react";
import VariantSynonym from "@/components/items/reviewvariant/VariantSynonym";
import Reference from "@/components/items/references/Reference";

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
    <div className="flex flex-col bg-background w-full mt-10">
      <Card className="border-none shadow-none bg-background">
        <CardContent>
          <div className="flex flex-col gap-4">
            {data.map((variant, idx) => (
              <Card
                key={idx}
                className="mb-4 rounded-lg bg-background flex flex-col border-none shadow-none"
              >
                <CardHeader>
                  <CardTitle>Colocated Variant {idx + 1}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6" >
                    {/* Information Details */}
                    <div className="flex flex-col gap-6" id="information-details">
                      {/* Variant Details */}
                      <div className="flex flex-col bg-foreground border-border border-2 rounded-xl shadow-xl p-5">
                        <p className="font-semibold text-lg text-text-primary mb-4">
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
                              <TableCell>
                                Clinical Significance Allele
                              </TableCell>
                              <TableCell>
                                {variant.clin_sig_allele ?? "-"}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      {/* Allele Frequency Distribution */}
                      <div
                        className="flex flex-col bg-foreground border-border border-2 rounded-xl shadow-xl p-5"
                      >
                        <p className="font-semibold text-lg text-text-primary mb-4">
                          Allele Frequency Distribution Across Populations
                        </p>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Allele</TableHead>
                              <TableHead>Population</TableHead>
                              <TableHead>Frequency</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(variant.frequencies || {}).map(
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
                    </div>

                    {/* Synonyms */}
                    <div
                      className="flex flex-col bg-foreground border-border border-2 rounded-xl shadow-xl p-5 overflow-y-auto"
                      style={{
                        maxHeight:
                          document.getElementById("information-details")
                            ?.offsetHeight || "w-[600px]",
                      }}
                    >
                      <p className="font-semibold text-xl text-text-primary">
                        Synonyms
                      </p>
                      {variant.var_synonyms && (
                        <div className="flex flex-col gap-4 mt-4">
                          {Object.entries(variant.var_synonyms).map(
                            ([source, synonyms], index) => (
                              <div
                                key={index}
                                className="p-4 rounded-lg"
                              >
                                <p className="font-semibold text-lg text-primary">
                                  {source}
                                </p>
                                <div className="mt-2 text-text-secondary">
                                  {source === "ClinVar" && synonyms ? (
                                    synonyms.map((synonym, synIndex) => (
                                      <VariantSynonym
                                        key={synIndex}
                                        synonym={synonym}
                                      />
                                    ))
                                  ) : synonyms ? (
                                    <span>{synonyms.join(", ")}</span>
                                  ) : (
                                    <span className="italic text-text-primary font-semibold">
                                      No synonyms available
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="font-bold text-text-primary text-lg mb-4 mt-8">
                      References
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {variant.pubmed && variant.pubmed.length > 0 ? (
                        variant.pubmed.map((id, index) => (
                          <Reference key={index} ref_code={id}></Reference>
                        ))
                      ) : (
                        <p className="text-text-primary text-md mb-4">
                          No references available
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VariantAlellel;
