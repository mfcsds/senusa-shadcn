"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { Button } from "@/components/ui/button";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";
import { ExternalLink, TableOfContents, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import VariantInformationModal from "@/components/update/detailVariantReport/selectVariant/VariantInformationModal";

// Amplify / GraphQL
import { listSelectedVariants } from "@/src/graphql/queries";
import { generateClient } from "aws-amplify/api";
import { SelectedVariant } from "@/src/API";

import { useRouter } from "next/navigation";

export default function VariantLibraryPage() {
  const client = generateClient();
  const [listSelectedVariant, setListSelectedVariant] = useState<
    SelectedVariant[]
  >([]);
  const [hasFetched, setHasFetched] = useState(false);

  // Holds all gene details returned by the API for each gene
  // Key = gene symbol; Value = array of objects with all fields
  const [geneDataMap, setGeneDataMap] = useState<{
    [geneSymbol: string]: any[];
  }>({});

  const router = useRouter();

  const handleRedirect = async (item: SelectedVariant) => {
    router.push(`/publicvariant/${item.id}}`);
  };

  // 1. Fetch the GraphQL data for variants
  const fetchSelectedVariant = async () => {
    try {
      const result = await client.graphql({ query: listSelectedVariants });
      if (result?.data) {
        const items = result.data.listSelectedVariants
          .items as SelectedVariant[];
        setListSelectedVariant(items);
        setHasFetched(true);
      }
    } catch (error) {
      console.log("Error fetching variants:", error);
    }
  };

  // 2. Fetch the full data from the custom inheritance API
  const fetchGeneInheritance = async (gene: string): Promise<any[] | null> => {
    try {
      const response = await fetch(
        "https://i189efe3m3.execute-api.us-east-1.amazonaws.com/dev/gene-inheritance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ gene }),
        }
      );

      if (!response.ok) {
        console.error("Failed to fetch data for gene:", gene);
        return null;
      }

      // The lambda returns { statusCode: 200, body: "[{...}]" }
      const lambdaResponse = await response.json();
      const parsedBody = JSON.parse(lambdaResponse.body); // => an array of objects

      if (Array.isArray(parsedBody) && parsedBody.length > 0) {
        return parsedBody; // return the entire array
      }
      return null;
    } catch (error) {
      console.error("Error fetching inheritance for gene:", gene, error);
      return null;
    }
  };

  // 3. Retrieve the data for all unique genes in the variant list
  const fetchAllGeneInheritances = async (variants: SelectedVariant[]) => {
    const uniqueGenes = Array.from(
      new Set(variants.map((v) => v.gene_symbol).filter(Boolean))
    );

    const promises = uniqueGenes.map(async (gene) => {
      if (!gene) return null;
      // Only fetch if not already in geneDataMap
      if (geneDataMap[gene]) return null;

      const fullGeneData = await fetchGeneInheritance(gene);
      return { gene, data: fullGeneData };
    });

    const results = await Promise.all(promises);

    const updatedMap = { ...geneDataMap };
    results.forEach((res) => {
      if (res?.gene && res.data) {
        updatedMap[res.gene] = res.data;
      }
    });

    setGeneDataMap(updatedMap);
  };

  // 4. useEffect hooks
  useEffect(() => {
    if (!hasFetched) {
      fetchSelectedVariant();
    }
  }, [hasFetched]);

  useEffect(() => {
    if (listSelectedVariant.length > 0) {
      fetchAllGeneInheritances(listSelectedVariant);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listSelectedVariant]);
  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col w-full">
        <Card>
          <CardHeader>
            <CardTitle>
              <p>Variant Library</p>
            </CardTitle>
            <CardDescription>
              All variant records that have been analyzed by YARSI Medika
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient ID</TableHead>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Gene</TableHead>
                  <TableHead>Variant HGVS</TableHead>
                  <TableHead>Inheritance</TableHead>
                  <TableHead>ACMG</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {listSelectedVariant.map((item, index) => {
                  const geneSymbol = item.gene_symbol || "";
                  // If there's an array for this gene, let's look at the first entry's Inheritance
                  const firstGeneData = geneDataMap[geneSymbol]?.[0];
                  const inheritanceValue = firstGeneData?.Inheritance ?? "—";

                  return (
                    <TableRow key={index}>
                      <TableCell>{item.id_patient}</TableCell>
                      <TableCell>{item.id_report}</TableCell>
                      <TableCell>{geneSymbol}</TableCell>
                      <TableCell>{item.hgvs}</TableCell>
                      <TableCell>
                        <div className="flex flex-row gap-2 justify-between items-center">
                          {/* Show the inheritance in plain text */}
                          <p>{inheritanceValue}</p>

                          {/* Dialog Button: opens a table with all fields returned by the API */}
                          <Dialog>
                            <DialogHeader></DialogHeader>
                            <DialogTrigger asChild>
                              <ButtonAdd
                                variant="outline"
                                className="bg-foreground hover:bg-foreground text-primary hover:text-text-secondary"
                              >
                                <small>
                                  <Eye className="h-4 w-4" />
                                </small>
                              </ButtonAdd>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[95%] max-h-[95%] overflow-y-auto bg-background">
                              {/* If the API returns multiple entries, display them all */}
                              {geneDataMap[geneSymbol]?.map((geneInfo, i) => (
                                <Table key={i} className="mb-4">
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>Field</TableHead>
                                      <TableHead>Value</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    <TableRow>
                                      <TableCell>Gene</TableCell>
                                      <TableCell>{geneInfo.Gene}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>HGNC ID</TableCell>
                                      <TableCell>
                                        {geneInfo["HGNC ID"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Entrez Gene ID</TableCell>
                                      <TableCell>
                                        {geneInfo["Entrez Gene ID"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Condition</TableCell>
                                      <TableCell>
                                        {geneInfo.Condition}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Inheritance</TableCell>
                                      <TableCell>
                                        {geneInfo.Inheritance}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Age Group</TableCell>
                                      <TableCell>
                                        {geneInfo["Age Group"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        Manifestation categories
                                      </TableCell>
                                      <TableCell>
                                        {geneInfo["Manifestation categories"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        Intervention categories
                                      </TableCell>
                                      <TableCell>
                                        {geneInfo["Intervention categories"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>Comments</TableCell>
                                      <TableCell>{geneInfo.Comments}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>
                                        Intervention/Rationale
                                      </TableCell>
                                      <TableCell>
                                        {geneInfo["Intervention/Rationale"]}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow>
                                      <TableCell>References</TableCell>
                                      <TableCell>
                                        {geneInfo.References}
                                      </TableCell>
                                    </TableRow>
                                    {/* Add more fields as needed */}
                                  </TableBody>
                                </Table>
                              ))}
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>

                      <TableCell>{item.acmg}</TableCell>
                      <TableCell>
                        <div className="flex flex-row gap-2">
                          {/* Example existing actions... */}
                          <Dialog>
                            <DialogHeader>
                              <DialogTitle></DialogTitle>
                            </DialogHeader>
                            <DialogTrigger asChild>
                              <ButtonAdd
                                variant="outline"
                                className="rounded-lg bg-foreground border-2 border-blue-primary hover:border-blue-secondary hover:bg-blue-secondary text-blue-primary hover:text-text-action"
                              >
                                <small>
                                  <TableOfContents className="h-4 w-4"></TableOfContents>
                                </small>
                              </ButtonAdd>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[95%] max-h-[95%] overflow-y-auto bg-background">
                              <VariantInformationModal
                                hgvsNotation={item.hgvs ?? ""}
                                id_variant={item.id}
                              ></VariantInformationModal>
                              <DialogFooter></DialogFooter>
                            </DialogContent>
                          </Dialog>
                          <ButtonAdd
                            variant="outline"
                            className="rounded-lg bg-foreground border-2 border-red-primary hover:border-red-secondary hover:bg-red-secondary text-red-primary hover:text-text-action"
                            onClick={(e) => handleRedirect(item)}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </ButtonAdd>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
