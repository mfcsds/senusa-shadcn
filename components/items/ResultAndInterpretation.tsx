import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableHeader,
  TableHead,
  TableCell,
  TableRow,
} from "../ui/table";
import VariantAnalysisResult from "./VariantAnalysisResult";

const ResultAndInterpretation = () => {
  return (
    <div className="flex">
      <Card className="w-full border-none">
        <CardHeader>
          <CardTitle>Result and Interpretation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col w-full gap-3">
            <div className="flexflex-col">
              <p className="font-semibold text-pretty text-sm gap-2">
                Selected Variant for Analysis
              </p>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Gene</TableHead>
                      <TableHead className="font-semibold">
                        Variant Detail
                      </TableHead>
                      <TableHead className="font-semibold">Zigosity</TableHead>
                      <TableHead className="font-semibold">
                        ACMG Classification
                      </TableHead>
                      <TableHead className="font-semibold">
                        Global Allele Frequency
                      </TableHead>
                      <TableHead className="font-semibold">
                        Reviewer-Classification
                      </TableHead>
                      <TableHead className="font-semibold">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
            </div>
            <VariantAnalysisResult></VariantAnalysisResult>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultAndInterpretation;
