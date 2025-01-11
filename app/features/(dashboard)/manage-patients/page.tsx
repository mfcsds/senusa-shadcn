"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import Spinner from "@/components/update/ui/Spinner";
import { Info, SearchIcon, LayoutList, LayoutDashboard } from "lucide-react";
import CardView from "@/components/update/managePatients/CardView";
import ListView from "@/components/update/managePatients/ListView";
import AddPatientDialog from "@/components/update/managePatients/AddPatientDialog";
import PaginationPatient from "@/components/update/managePatients/PaginationPatient";
import { fetchPatients, PatientData } from "@/hooks/managePatients/usePatients";

export default function ManageAccountsPage() {
  const [patientID, setPatientID] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const [patients, setPatients] = useState<PatientData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        setLoading(true);
        const fetchedPatients = await fetchPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPatients();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-text-primary">
            Manage Patient
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
          <AddPatientDialog />
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

      {loading ? (
        <Spinner />
      ) : viewMode === "card" ? (
        <CardView patients={patients} />
      ) : (
        <ListView patients={patients} />
      )}

      {loading ? (
        <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
        Fetching your data...
      </p>
      ) : (
        <div className="flex justify-between items-center mt-8">
          <PaginationPatient />
        </div>
      )}
    </div>
  );
}
