"use client";
import React, { useState, useEffect } from "react";
import TabsVariantReport from "@/components/table/TabsVariantReport";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const VariantReport = () => {
  const [modal, setShowModal] = useState(false);

  const handleCreateReport = () => {
    setShowModal(true);
  };
  const handleSetOfModal = () => {
    setShowModal(false);
  };

  return (
    <div className="flex w-full">
      <Card className="w-full h-svh">
        <CardHeader>
          <CardTitle>Variant Report Manager</CardTitle>
          <CardDescription>
            Review, manage, and generate detailed reports on genetic variants,
            ensuring accurate and comprehensive analysis for clinical
            decision-making.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col mb-5 w-full">
            <div className="flex flex-row-reverse">
              <Button
                className="hover:text-white hover:bg-violet-800 w-50 text-right"
                variant="secondary"
                onClick={handleCreateReport}
              >
                <span>
                  <Plus className="w-3 h-3 mr-2"></Plus>
                </span>{" "}
                Create Variant Report
              </Button>
            </div>
          </div>
          <div className="flex flex-row mb-10">
            <TabsVariantReport></TabsVariantReport>
          </div>
        </CardContent>
      </Card>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <Card className="w-full max-w-screen-md">
            <CardHeader>
              <CardTitle>Create New Variant Report</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-2">
                  <div>
                    <Label>Select Patient</Label>
                    <Input type="Text"></Input>
                  </div>
                  <div>
                    <Label>Phenotype</Label>
                    <Input type="Text"></Input>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-row-reverse gap-2">
              <Button>Save</Button>
              <Button variant={"secondary"} onClick={handleSetOfModal}>
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
};

export default VariantReport;
