"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Search } from "lucide-react";

import { useState } from "react";
import axios from "axios";
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
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cp } from "fs";

const VariantQuery = () => {
  const [variant, setVariant] = useState("");
  const [variantData, setVariantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [freqData, setFreqData] = useState<any>(null);

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const server = "https://rest.ensembl.org/";
      const vep_ext = "vep/human/region/";
      const con = "application/json";
      const response = await axios.post(
        server + vep_ext,
        { variants: [variant] },
        { headers: { "Content-Type": con, Accept: con } }
      );
      setVariantData(response.data);
      console.log(response.data);

      // if (response.data[0].colocated_variants) {
      //   const frequencies = response.data[0].colocated_variants
      //     .map((colocated: any) => colocated.frequencies)
      //     .filter((freq: any) => freq !== undefined)
      //     .map((freq: any) => {
      //       const formatted = Object.entries(freq)
      //         .sort(
      //           ([, valueA], [, valueB]) =>
      //             (valueB as number) - (valueA as number)
      //         )
      //         .map(([population, value]) => ({
      //           population: population,
      //           frequency: value,
      //         }));
      //       return formatted;
      //     })
      //     .flat();

      //   setFreqData(frequencies);
      //   console.log(frequencies);
      // }
    } catch (error) {
      setError("Failed to fetch variant data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <div className="flex flex-col">
        <div className="mb-10">
          <p className="text-2xl">Type the Variant</p>
          <p className="text-gray-400 text-sm">
            Please enter the variant using the following format:
            <br />
            <code>
              &lt;Chromosome&gt; &lt;Position&gt; &lt;ID&gt; &lt;Reference
              Allele&gt; &lt;Alternate Allele&gt;
            </code>
            <br />
            For example: <code>9 128328460 . TA A</code>
            <br />
            <br />
            <strong>Explanation:</strong>
            <br />- <strong>Chromosome:</strong> The chromosome number where the
            variant is located (e.g., <code>9</code>).
            <br />- <strong>Position:</strong> The exact base position on the
            chromosome (e.g., <code>128328460</code>).
            <br />- <strong>ID:</strong> An identifier for the variant (if
            available). If unknown, use a dot (<code>.</code>).
            <br />- <strong>Reference Allele:</strong> The reference sequence at
            this position (e.g., <code>TA</code>).
            <br />- <strong>Alternate Allele:</strong> The sequence that
            replaces the reference (e.g., <code>A</code>).
            <br />
            <br />
            Ensure that the position and alleles correspond to the correct
            reference genome version used for your data.
          </p>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="col-span-3">
            <Input
              type="text"
              value={variant}
              onChange={(e) => setVariant(e.target.value)}
              className="border-slate-300 border-2 shadow h-[50px] hover:none"
              placeholder="Type e.g c.388T>C"
            ></Input>
          </div>
          <div>
            <Button
              variant="outline"
              className="hover:bg-violet-800 hover:text-white align-right"
              onClick={handleSearch}
            >
              <small>
                <Search className="w-4 h-5"></Search>
              </small>
            </Button>
          </div>
          {loading ? "Loading" : ""}
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {variantData && (
          <div className="mt-8 space-y-4">
            <Card className="w-full shadow">
              <CardHeader>
                <CardTitle>General Information</CardTitle>
                <CardDescription>
                  This section provides a comprehensive overview of the basic
                  details associated with the queried genetic variant.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Information Category</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Allele String</TableCell>
                      <TableCell>{variantData[0].allele_string}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Assembly Name</TableCell>
                      <TableCell>{variantData[0].assembly_name}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Start</TableCell>
                      <TableCell>{variantData[0].start}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>End</TableCell>
                      <TableCell>{variantData[0].end}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Input</TableCell>
                      <TableCell>{variantData[0].input}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Most Severe Consequence</TableCell>
                      <TableCell>
                        {variantData[0].most_severe_consequence}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Colocated Variants</CardTitle>
                <CardDescription>
                  Colocated variants represent other known genetic variants that
                  overlap with or are near the queried variant, providing
                  additional context on potential significance or clinical
                  relevance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table className="w-[800px]">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Information Category</TableHead>
                      <TableHead>Detail</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {variantData[0].colocated_variants.map(
                      (colocated: any, idx: number) => (
                        <React.Fragment>
                          <TableRow>
                            <TableCell>Allele String</TableCell>
                            <TableCell>{colocated.allele_string}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Clinical Significance</TableCell>
                            <TableCell>
                              {colocated.clin_sig?.join(",")}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Start</TableCell>
                            <TableCell>{colocated.start}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>End</TableCell>
                            <TableCell>{colocated.end}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>Phenotype or Disease</TableCell>
                            <TableCell>
                              {colocated.phenotype_or_disease}
                            </TableCell>
                          </TableRow>
                        </React.Fragment>
                      )
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Frequencies</CardTitle>
              </CardHeader>
              <CardContent>
                <Table className="w-[800px]">
                  {variantData[0].colocated_variants.map(
                    (colocated: any, idx: number) => (
                      <div>
                        {colocated.frequencies && (
                          <div>
                            {Object.entries(colocated.frequencies).map(
                              ([allele, freq]: any, idx: number) => (
                                <Table key={idx}>
                                  <TableHeader>
                                    <TableRow>
                                      <TableHead>
                                        Population / Databases
                                      </TableHead>
                                      <TableHead>Frequencies</TableHead>
                                    </TableRow>
                                  </TableHeader>
                                  <TableBody>
                                    {Object.entries(freq)
                                      .sort(
                                        ([, valueA], [, valueB]) =>
                                          (valueB as number) -
                                          (valueA as number)
                                      )
                                      .map(
                                        (
                                          [population, value]: any,
                                          idx: number
                                        ) => (
                                          <TableRow>
                                            <TableCell>{population}</TableCell>
                                            <TableCell>{value}</TableCell>
                                          </TableRow>
                                        )
                                      )}
                                  </TableBody>
                                </Table>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    )
                  )}
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {variantData && (
          <div className="mt-8 space-y-4">
            {/* Motif Feature Consequences */}
            {variantData[0].motif_feature_consequences && (
              <>
                <h2 className="text-xl font-bold">
                  Motif Feature Consequences
                </h2>
                {variantData[0].motif_feature_consequences.map(
                  (motif: any, idx: number) => (
                    <table
                      key={idx}
                      className="min-w-full bg-white border mb-4"
                    >
                      <tbody>
                        <tr>
                          <td className="py-2 border font-bold">
                            Consequence Terms
                          </td>
                          <td className="py-2 border">
                            {motif.consequence_terms.join(", ")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Motif Feature ID
                          </td>
                          <td className="py-2 border">
                            {motif.motif_feature_id}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">Motif Name</td>
                          <td className="py-2 border">{motif.motif_name}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Motif Position
                          </td>
                          <td className="py-2 border">{motif.motif_pos}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Motif Score Change
                          </td>
                          <td className="py-2 border">
                            {motif.motif_score_change}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )
                )}
              </>
            )}

            {/* Regulatory Feature Consequences */}
            {variantData[0].regulatory_feature_consequences && (
              <>
                <h2 className="text-xl font-bold">
                  Regulatory Feature Consequences
                </h2>
                {variantData[0].regulatory_feature_consequences.map(
                  (regulatory: any, idx: number) => (
                    <table
                      key={idx}
                      className="min-w-full bg-white border mb-4"
                    >
                      <tbody>
                        <tr>
                          <td className="py-2 border font-bold">Biotype</td>
                          <td className="py-2 border">{regulatory.biotype}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Consequence Terms
                          </td>
                          <td className="py-2 border">
                            {regulatory.consequence_terms.join(", ")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">Impact</td>
                          <td className="py-2 border">{regulatory.impact}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Regulatory Feature ID
                          </td>
                          <td className="py-2 border">
                            {regulatory.regulatory_feature_id}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )
                )}
              </>
            )}

            {/* Transcript Consequences */}
            {variantData[0].transcript_consequences && (
              <>
                <h2 className="text-xl font-bold">Transcript Consequences</h2>
                {variantData[0].transcript_consequences.map(
                  (transcript: any, idx: number) => (
                    <table
                      key={idx}
                      className="min-w-full bg-white border mb-4"
                    >
                      <tbody>
                        <tr>
                          <td className="py-2 border font-bold">Biotype</td>
                          <td className="py-2 border">{transcript.biotype}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">
                            Consequence Terms
                          </td>
                          <td className="py-2 border">
                            {transcript.consequence_terms.join(", ")}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">Gene Symbol</td>
                          <td className="py-2 border">
                            {transcript.gene_symbol}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">Impact</td>
                          <td className="py-2 border">{transcript.impact}</td>
                        </tr>
                        <tr>
                          <td className="py-2 border font-bold">Distance</td>
                          <td className="py-2 border">
                            {transcript.distance || "N/A"}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  )
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default VariantQuery;
