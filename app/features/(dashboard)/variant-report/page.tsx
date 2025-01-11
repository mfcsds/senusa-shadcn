"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { Info, SearchIcon, LayoutList, LayoutDashboard } from "lucide-react";
import CardView from "@/components/update/variantReport/CardView";
import ListView from "@/components/update/variantReport/ListView";
import AddReportDialog from "@/components/update/variantReport/AddReportDialog";
import PaginationVariantReport from "@/components/update/variantReport/PaginationVariantReport";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/update/ui/tabs";

export default function ManageAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const data = [
    {
      patientId: "P-7GRULXLAAFV6",
      reportId: "R-GLMHMH7TG8FP",
      phenotypes:
        "HP:0003003 - Colon cancer, HP:0001674 - Complete atrioventricular canal defect",
      medicalHistory: "Breast Cancer",
      currentDiagnosis: "Breast Cancer",
      sampleCollection: "2024-10-15",
      statusReport: "Complete",
    },
    {
      patientId: "P-1FHULY8AAFG4",
      reportId: "R-BGHNJL9TG8XZ",
      phenotypes: "HP:0004322 - Hypertension, HP:0001250 - Seizures",
      medicalHistory: "Diabetes",
      currentDiagnosis: "Hypertension",
      sampleCollection: "2024-09-10",
      statusReport: "Complete",
    },
    {
      patientId: "P-3XRULFLAAV7",
      reportId: "R-KLMHNW8TG9YP",
      phenotypes:
        "HP:0001627 - Myocardial infarction, HP:0002014 - Short stature",
      medicalHistory: "Heart Attack",
      currentDiagnosis: "Heart Disease",
      sampleCollection: "2024-08-22",
      statusReport: "Complete",
    },
    {
      patientId: "P-3XRULFLAAV7",
      reportId: "R-KLMHNW8TG9YP",
      phenotypes:
        "HP:0001627 - Myocardial infarction, HP:0002014 - Short stature",
      medicalHistory: "Heart Attack",
      currentDiagnosis: "Heart Disease",
      sampleCollection: "2024-08-22",
      statusReport: "Complete",
    },
  ];

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-text-primary">
            Variant Report Manager
          </h1>
          <Button
            variant="iconSecondary"
            size="large"
            icon={<Info className="w-6 h-6" />}
          />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative w-full sm:w-auto">
            <Input
              id="searchQuery"
              type="text"
              placeholder="Search..."
              value={searchQuery}
              size="medium"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 bg-foreground"
            />
            <Button
              variant="innerIcon"
              size="innerSize"
              icon={<SearchIcon className="w-5 h-5 " />}
            />
          </div>
          <AddReportDialog />
          <Button
            variant={
              viewMode === "card"
                ? "iconActiveComponentSeccondary"
                : "iconComponentSeccondary"
            }
            onClick={() => setViewMode("card")}
            icon={<LayoutDashboard className="w-6 h-6" />}
          />
          <Button
            variant={
              viewMode === "list"
                ? "iconActiveComponentDanger"
                : "iconComponentDanger"
            }
            onClick={() => setViewMode("list")}
            icon={<LayoutList className="w-6 h-6" />}
          />
        </div>
      </div>

      <div className="mb-6 w-auto">
        <Tabs defaultValue="statusReport">
          <TabsList>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="inProccess">In Process</TabsTrigger>
            <TabsTrigger value="waitingForApproval">
              Waiting for Approval
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="draft">
            {viewMode === "card" ? (
              <CardView data={data} />
            ) : (
              <ListView data={data} />
            )}
          </TabsContent>
          <TabsContent value="inProccess">
            {viewMode === "card" ? (
              <CardView data={data} />
            ) : (
              <ListView data={data} />
            )}
          </TabsContent>
          <TabsContent value="waitingForApproval">
            {viewMode === "card" ? (
              <CardView data={data} />
            ) : (
              <ListView data={data} />
            )}
          </TabsContent>
          <TabsContent value="completed">
            {viewMode === "card" ? (
              <CardView data={data} />
            ) : (
              <ListView data={data} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      <div></div>
      <div className="flex justify-between items-center mt-8">
        <PaginationVariantReport />
      </div>
    </div>
  );
}
