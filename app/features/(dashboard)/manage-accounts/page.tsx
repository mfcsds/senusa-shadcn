"use client";

import React, { useState, useEffect } from "react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import { LayoutList, LayoutDashboard, Info, SearchIcon } from "lucide-react";
import PaginationVariantReport from "@/components/update/manageAccounts/PaginationAccount";
import CardView from "@/components/update/manageAccounts/CardView";
import ListView from "@/components/update/manageAccounts/ListView";
import CreateAccountDialog from "@/components/update/manageAccounts/CreateAccountDialog";
import { fetchInstitutions } from "@/hooks/useAccounts";
import { Institution } from "@/utils/object"
import Spinner from "@/components/update/ui/Spinner";
import { get } from "http";

export default function ManageAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInstitutions = async () => {
      try {
        setLoading(true); 
        const data = await fetchInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error("Error loading institutions:", error);
      } finally {
        setLoading(false); 
      }
    };

    loadInstitutions();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="flex">
            <h1 className="text-2xl font-semibold text-text-primary">
              Manage Accounts
            </h1>
            <Button
              variant="iconSecondary"
              size="large"
              icon={<Info className="w-6 h-6" />}
            />
          </div>
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

          <CreateAccountDialog />

          <Button
            variant={
              viewMode === "card"
                ? "iconCardViewActive"
                : "iconCardView"
            }
            onClick={() => setViewMode("card")}
            icon={<LayoutDashboard className="w-6 h-6" />}
          />
          <Button
            variant={
              viewMode === "list"
                ? "iconListViewActive"
                : "iconListView"
            }
            onClick={() => setViewMode("list")}
            icon={<LayoutList className="w-6 h-6" />}
          />
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : viewMode === "card" ? (
        <CardView intialInstitution={institutions} />
      ) : (
        <ListView intialInstitution={institutions} />
      )}
        
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