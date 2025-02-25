import ACMGAnnotation from "@/components/items/ACMGAnnotation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { ArrowDown, Info, ListCollapse } from "lucide-react";
import React from "react";

interface VariantDetailPublicProops {
  id: string | null;
}

const VariantDetailPublic = ({ id }: VariantDetailPublicProops) => {
  return (
    <div className="flex flex-col gap-2">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Detail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-start">
            <div className="flex flex-row items-center gap-2 ">
              <Card className="shadow-lg w-[400px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">HGVS</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4">
                    <div className="border-l-emerald-600 border-l-4 flex flex-col pl-2">
                      <p className="text-2xl font-bold">BRCA1</p>
                      <p className="text-xs text-gray-400">Gene Symbol</p>
                    </div>
                    <p className="text-2xl">{"chr17:g.43106457T>C"}</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">
                    ACMG Classification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4 justify-between items-center">
                    <p className="text-2xl text-red-900 font-semibold p-2 rounded-md bg-red-50 border-2 border-red-500">
                      {"Pathogenic"}
                    </p>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant={"outline"}>
                          <ListCollapse className="w-5 h-5 text-gray-900"></ListCollapse>
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>ACMG Criteria</DialogTitle>
                        <ACMGAnnotation></ACMGAnnotation>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">Zygosity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4 justify-between items-center">
                    <p className="text-2xl text-blue-900 p-2 rounded-md bg-blue-50 border-2 border-blue-500">
                      {"Homozygous"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">Inheritance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-4 items-start">
                    <p className="text-2xl text-blue-900 p-2 rounded-md bg-blue-50 border-2 border-blue-500">
                      {"Autosomal Dominant"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">
                    Most Consequence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4">
                    <p className="text-2xl text-gray-900 p-2 font-bold ">
                      {"Missense Variant"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">Clinical Sign</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row gap-4">
                    <p className="text-2xl text-gray-900 p-2 font-bold ">
                      {"Likely Pathogenic"}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-lg w-[300px] h-[180px]">
                <CardHeader>
                  <CardTitle className="text-gray-400">
                    Alelle Frequencies
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-2xl text-gray-900 font-bold p-2 ">
                      {0.00032}
                    </p>
                    <ArrowDown className="text-red-600 w-7 h-7"></ArrowDown>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Information</CardTitle>
        </CardHeader>
      </Card>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Variant Discussion</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
};

export default VariantDetailPublic;
