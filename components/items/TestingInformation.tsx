"use client";

import React, { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";
Amplify.configure(config);

interface TestingInformationProops {
  idpatient: string;
}

const TestingInformation: React.FC<TestingInformationProops> = ({
  idpatient,
}) => {
  return (
    <div className="flex">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle>Testing Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col p-5 gap-3">
            <div className="flex flex-row">
              <p className="w-[200px]">Testing Method</p>
              <p className="mr-3">:</p>
              <p className="font-light">Next Generation Sequencing</p>
            </div>
            <div className="flex flex-row">
              <p className="w-[200px]">Gene Panel</p>
              <p className="mr-3">:</p>
              <p className="font-light">Comprehensive Cardiomyopathy Panel</p>
            </div>
            <div className="flex flex-row">
              <p className="w-[200px]">Testing Description</p>
              <p className="mr-3">:</p>
              <p className="font-light w-[1000px] text-balance text-xs">
                {" "}
                Description The genetic analysis was performed using
                high-throughput Next Generation Sequencing (NGS) on a blood
                sample. DNA was extracted using the QIAamp DNA Blood Mini Kit.
                Sequencing was carried out on an Illumina HiSeq 4000 platform,
                covering all coding regions and intron-exon boundaries of the
                genes listed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestingInformation;
