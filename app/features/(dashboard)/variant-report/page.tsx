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
import Spinner from "@/components/update/ui/Spinner";
import { CreateVariantReportInput } from "@/src/API";
import { fetchVariantReport } from "@/hooks/useVariantReport";

export default function VariantReportPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [varReports, setVarReports] = useState<CreateVariantReportInput[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadVariants = async () => {
      try {
        setLoading(true);
        const fetchedVariants = await fetchVariantReport();
        setVarReports(fetchedVariants);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVariants();
  }, []);

  const fetchLoadVariantReport = async (): Promise<void> => {
    const loadVariants = async () => {
      try {
        setLoading(true);
        const fetchedVariants = await fetchVariantReport();
        setVarReports(fetchedVariants);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadVariants();
  };

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
              variant="iconPrimary"
              size="innerSize"
              icon={<SearchIcon className="w-5 h-5 " />}
            />
          </div>
          <AddReportDialog onUpdateVariantReport={fetchLoadVariantReport}/>
          <Button
            variant={
              viewMode === "card" ? "iconCardViewActive" : "iconCardView"
            }
            onClick={() => setViewMode("card")}
            icon={<LayoutDashboard className="w-6 h-6" />}
          />
          <Button
            variant={
              viewMode === "list" ? "iconListViewActive" : "iconListView"
            }
            onClick={() => setViewMode("list")}
            icon={<LayoutList className="w-6 h-6" />}
          />
        </div>
      </div>

      <div className="mb-6 w-auto">
        <Tabs defaultValue="allStatus">
          <TabsList>
            <TabsTrigger value="allStatus">All</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="inProccess">In Process</TabsTrigger>
            <TabsTrigger value="waitingForApproval">
              Waiting for Approval
            </TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="allStatus">
            {loading ? (
              <Spinner />
            ) : viewMode === "card" ? (
              <CardView initialVariants={varReports} />
            ) : (
              <ListView initialVariants={varReports} />
            )}
          </TabsContent>
          <TabsContent value="draft">
            {loading ? (
              <Spinner />
            ) : viewMode === "card" ? (
              <CardView initialVariants={varReports} />
            ) : (
              <ListView initialVariants={varReports} />
            )}
          </TabsContent>
          <TabsContent value="inProccess">
            {loading ? (
              <Spinner />
            ) : viewMode === "card" ? (
              <CardView initialVariants={varReports} />
            ) : (
              <ListView initialVariants={varReports} />
            )}
          </TabsContent>
          <TabsContent value="waitingForApproval">
            {loading ? (
              <Spinner />
            ) : viewMode === "card" ? (
              <CardView initialVariants={varReports} />
            ) : (
              <ListView initialVariants={varReports} />
            )}
          </TabsContent>
          <TabsContent value="completed">
            {loading ? (
              <Spinner />
              
            ) : viewMode === "card" ? (
              <CardView initialVariants={varReports} />
            ) : (
              <ListView initialVariants={varReports} />
            )}
          </TabsContent>
        </Tabs>
      </div>

      {loading ? (
        <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
          Loading
        </p>
      ) : (
        <div className="flex justify-between items-center mt-10">
          <PaginationVariantReport />
        </div>
      )}
    </div>
  );
}
