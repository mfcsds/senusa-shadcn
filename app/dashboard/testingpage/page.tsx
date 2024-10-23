"use client";
import DemoTableVariant from "@/components/datatable/Demo";
import { Variant, VariantRawData } from "@/utils/object";
import { createVariant } from "@/src/graphql/mutations";
import React, { useState } from "react";
// Assuming you are using a button from shadcn
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import awsConfig from "@/src/amplifyconfiguration.json";

Amplify.configure(awsConfig);
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table"; // Assuming you are using a table from shadcn
import { CreateVariantInput } from "@/src/API";
import { generateVariantSampleID } from "@/utils/function";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import ACMGClassifier from "@/components/items/ACMGClassifier";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { TableOfContents } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Testing = () => {
  const [variant, setListVariant] = useState<CreateVariantInput[]>([]);
  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [vcfContent, setVcfContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sheetWidth, setSheetWidth] = useState(1400); // You can update this based on your logic

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith(".vcf")) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const vcfText = e.target?.result as string;

        if (!vcfText || vcfText.trim() === "") {
          setError("The file appears to be empty or unreadable.");
          setLoading(false);
          return;
        }

        setVcfContent(vcfText);

        const lines = vcfText.split("\n");
        const headerLine = lines.find((line: string) =>
          line.startsWith("#CHROM")
        );
        if (!headerLine) {
          setError("Invalid VCF file: Missing header line (#CHROM)");
          setLoading(false);
          return;
        }

        const dataLines = lines.filter(
          (line: string) => !line.startsWith("#") && line.trim() !== ""
        );

        const parsedVariants = dataLines.map((line: string, index: number) => {
          const fields = line.split("\t");
          const variant: CreateVariantInput = {
            id: generateVariantSampleID(),
            chrom: fields[0],
            pos: fields[1],
            id_var: fields[2],
            ref: fields[3],
            alt: fields[4],
            qual: fields[5],
            filter: fields[6],
            info: fields[7],
          };
          return variant;
        });

        setListVariant(parsedVariants);
        setLoading(false);
      };

      reader.onerror = () => {
        setError("Error reading the file. Please try again.");
        setLoading(false);
      };

      reader.readAsText(file);
    } else {
      setError("Please upload a valid .vcf file.");
      setLoading(false);
    }
  };
  const client = generateClient();
  const saveVariantIntoDatabase = async () => {
    setShowProgress(true);
    try {
      for (let i = 0; i < variant.length; i++) {
        const result = await client.graphql({
          query: createVariant,
          variables: { input: variant[i] },
        });
        setProgress(Math.round(((i + 1) / variant.length) * 100));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setProgress(0);
      setShowProgress(false);
    }
  };

  return (
    <div>
      <h1>Upload VCF File</h1>
      <input
        type="file"
        accept=".vcf"
        onChange={handleFileUpload}
        disabled={loading}
      />
      <Button
        className="mb-5"
        variant={"secondary"}
        onClick={saveVariantIntoDatabase}
      >
        Save to database
      </Button>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"ghost"} className="items-center">
            <small>
              <TableOfContents className="h-4 w-4"></TableOfContents>
            </small>
          </Button>
        </SheetTrigger>
        <SheetContent side={"right"} className="min-w-fit">
          <SheetHeader className="mb-10">
            <SheetTitle className="text-4xl">Variant Detail</SheetTitle>
            <Card>
              <CardHeader>
                <CardTitle className="text-gray-400">
                  Variant Statistic
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5"></CardContent>
            </Card>
          </SheetHeader>
          <div className="flex flex-col rounded-sm border-solid   mb-5">
            <Card className="border">
              <CardHeader>
                <CardTitle className="bg-red-800 p-5 rounded-md text-white">
                  Pathogenicity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col">
                    <p className="font-sans font-bold mb-5 text-xl">
                      Very Strong
                    </p>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl">
                        PVS1 null variant (nonsense, frameshift, canonical ±1 or
                        2 splice sites, initiation codon, single or multiexon
                        deletion) in a gene where LOF is a known mechanism of
                        disease
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <p className="font-sans font-bold mb-5 text-xl">Strong</p>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl">
                        <strong>PS1</strong> Same amino acid change as a
                        previously established pathogenic variant regardless of
                        nucleotide change
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl">
                        <strong>PS2</strong> De novo (both maternity and
                        paternity confirmed) in a patient with the disease and
                        no family history
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl font-sans">
                        <strong>PS3</strong> Well-established in vitro or in
                        vivo functional studies supportive of a damaging effect
                        on the gene or gene product
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl font-sans">
                        <strong>PS4</strong> The prevalence of the variant in
                        affected individuals is significantly increased compared
                        with the prevalence in controls
                      </p>
                    </div>
                    <div className="flex flex-row gap-2 items-baseline pl-10">
                      <Checkbox value={"Halo"}></Checkbox>
                      <p className="text-wrap items-baseline text-xl font-sans">
                        <strong>PP1</strong> (Strong evidence) Cosegregation
                        with disease in multiple affected family members in a
                        gene definitively known to cause the disease
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>

      {showProgress && (
        <Progress
          value={progress}
          max={variant.length}
          className="w-[500px]"
        ></Progress>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <Sheet></Sheet>

      <ACMGClassifier></ACMGClassifier>

      {variant.length > 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              <TableCell>#CHROM</TableCell>
              <TableCell>POS</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>REF</TableCell>
              <TableCell>ALT</TableCell>
              <TableCell>QUAL</TableCell>
              <TableCell>FILTER</TableCell>
              <TableCell>INFO</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {variant.map((v, index) => (
              <TableRow key={index}>
                <TableCell>{v.chrom}</TableCell>
                <TableCell>{v.pos}</TableCell>
                <TableCell>{v.id}</TableCell>
                <TableCell>{v.ref}</TableCell>
                <TableCell>{v.alt}</TableCell>
                <TableCell>{v.qual}</TableCell>
                <TableCell>{v.filter}</TableCell>
                <TableCell>{v.info}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Testing;
