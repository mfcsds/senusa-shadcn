import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import { ClipboardPlus, Building2 } from "lucide-react";
import Button from "@/components/update/button/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { generateClient } from "aws-amplify/api";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
import { getPatient } from "@/src/graphql/queries";
import { getVariantReport } from "@/src/graphql/queries";

import {
  Conclusion,Patient
  ,
  Recommendation,
  SelectedVariant,
  VariantInterpretation,
  VariantReportData,
} from "@/utils/object";

import { listSelectedVariants } from "@/src/graphql/queries";
import { listVariantInterpretations } from "@/src/graphql/queries";
import { listRecommendations, listConclusions } from "@/src/graphql/queries";

Amplify.configure(config);

interface PreviewReportProops {
  name: string;
  sex: string;
  dob: string;
  listSelVariants: SelectedVariant[];
  listRecommendation: Recommendation[];
  listConclusion: Conclusion[];
  ensembleVersion: string;
  ensembleRestVersion: string;
}

const PreviewReportDialog: React.FC<PreviewReportProops> = ({
    name, sex, dob, listSelVariants, listRecommendation, listConclusion, ensembleVersion, ensembleRestVersion
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          label="Preview Report"
          variant="underlinePrimary"
          size="large"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[80%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-text-primary text-lg font-semibold">Priview Variant Report</span>
          </DialogTitle>
        </DialogHeader>
          <div className="p-8 border-2 w-full mt-4 shadow-xl">
            <div className="bg-foreground p-6 rounded-lg ">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <Building2 className="w-[80px] h-[80px] py-2 items-center text-primary"></Building2>
                  <h2 className="font-bold text-text-primary">Lab. Company</h2>
                </div>
                <div className="text-right">
                  <h1 className="text-2xl font-bold text-text-primary mb-2">
                    Variant Analysis Report
                  </h1>
                  <p className="text-text-primary">
                    Genusa Labs
                    <br />
                    123 Genome Way
                    <br />
                    Jakarta Pusat, Cempaka Putih, 62701
                    <br />
                    Jakarta, Indonesia
                  </p>
                </div>
              </div>

              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-4">
                  Patient Information
                </h2>
                <div className="grid grid-cols-2 gap-6 text-text-secondary">
                  <div>
                    <p>
                      <strong>Patient Detail</strong>
                    </p>
                    <p>Name: {name}</p>
                    <p>Sex: {sex}</p>
                    <p>Date of Birth: {dob}</p>
                    <p>Sample: Blood</p>
                  </div>
                  <div>
                    <p>
                      <strong>Test Ordered By</strong>
                    </p>
                    <p>Name: Dr. Fulan</p>
                    <p>Organization: Amazing Hospital Centre</p>
                    <p>Phone: +6712 - 232 - 233</p>
                  </div>
                  <div>
                    <p>
                      <strong>Test Carried out By</strong>
                    </p>
                    <p>Genetic Counselor: Dr. Fulan</p>
                    <p>Laboratory: Lab. ID</p>
                    <p>Phone: +6712 - 232 - 233</p>
                    <p>Date of Test: 12-April-2024</p>
                  </div>
                </div>
              </div>

              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Executive Summary
                </h2>
                <p className="text-sm text-text-secondary">
                  This genetic testing report summarizes the findings from the
                  sample provided. The analysis was focused on identifying
                  variants associated with hereditary cardiomyopathy. The
                  results include information on detected genetic variants,
                  their classification, and potential clinical implications.
                </p>
              </div>

              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Testing Material and Methods
                </h2>
                <ul className="list-disc pl-5 text-text-secondary">
                  <li>Testing Method: Next Generation Sequencing (NGS)</li>
                  <li>Gene Panel: Comprehensive Cardiomyopathy Panel</li>
                  <li>
                    The genetic analysis was performed using high-throughput
                    Next Generation Sequencing (NGS) on a blood sample. DNA was
                    extracted using the QIAamp DNA Blood Mini Kit. Sequencing
                    was carried out on an Illumina HiSeq 4000 platform, covering
                    all coding regions and intron-exon boundaries of the genes
                    listed.
                  </li>
                </ul>
              </div>

              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Result & Interpretations
                </h2>
                <Table className="min-w-full bg-foreground text-sm mb-4">
                  <TableHeader className="bg-primary hover:bg-primary">
                    <TableRow className="border-b text-text-action hover:text-primary">
                      <TableHead className="px-6 py-4 text-left font-medium text-text-action">
                        Variant Detail
                      </TableHead>
                      <TableHead className="px-6 py-4 text-left font-medium text-text-action">
                        Zygosity
                      </TableHead>

                      <TableHead className="px-6 py-4 text-left font-medium text-text-action">
                        ACMG
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listSelVariants.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>
                          {`${item.gene_symbol}(${item.gene_id}):${item.hgvs}`}
                        </TableCell>
                        <TableCell>{item.zygosity}</TableCell>
                        <TableCell>{item.acmg}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <p className="font-semibold pl-3 text-text-primary">Variant Interpretation</p>

                <ul className="text-text-secondary">
                  {listSelVariants.map((item, index) => (
                    <li
                      key={index}
                      className="text-balance font-sans font-light text-justify my-3 mx-2 text-xm "
                    >
                      <strong className="font-bold">
                        {`(${item.gene_symbol}):${item.hgvs}`}:{" "}
                      </strong>
                      {item.text_interpretation}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Conclusion */}
              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Conclusions
                </h2>
                {listConclusion.map((item, idx) => (
                  <p key={idx} className="text-sm text-text-secondary text-justify">
                    {item.text}
                  </p>
                ))}
              </div>

              {/* Recommendation */}
              <div className="bg-background border-2 p-4 rounded-md mb-6">
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Recommendation
                </h2>
                <ul className="list-disc pl-5 text-text-secondary">
                  {listRecommendation.map((item, idx) => (
                    <li key={idx} className="text-justify font-light">
                      {item.text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col text-text-primary font-medium">
                <h2>Database Info</h2>
                <p>{`Ensemble Software Release: ${ensembleVersion}; Ensemble Rest API: ${ensembleRestVersion}; Senusa Version: 1.00`}</p>
              </div>
              <div className="flex justify-between items-center mt-8 text-text-secondary">
                <div className="text-center">
                  <p className="font-semibold">Rina Maheswari, M.Sc., Ph.D.</p>
                  <p>Head Laboratory</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Lia Kartika, M.D.</p>
                  <p>Genetic Counsellor</p>
                </div>
                <div className="text-center">
                  <p className="font-semibold">Putu Bagus, M.G.C</p>
                  <p>Clinical Pathology</p>
                </div>
              </div>
            </div>
          </div>
      </DialogContent>
    </Dialog>
  );
};

export default PreviewReportDialog;
