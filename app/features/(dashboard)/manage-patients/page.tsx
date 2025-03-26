"use client";

import React, { useEffect, useState, useCallback } from "react";
import Button from "@/components/update/button/Button";
import Input from "@/components/update/input/Input";
import Spinner from "@/components/update/ui/Spinner";
import { Info, RefreshCw, LayoutList, LayoutDashboard, Search } from "lucide-react";
import CardView from "@/components/update/managePatients/CardView";
import ListView from "@/components/update/managePatients/ListView";
import AddPatientDialog from "@/components/update/managePatients/AddPatientDialog";
import { fetchPatientsById } from "@/hooks/usePatients";
import { DataPatients } from "@/utils/object";
import { fetchUserAttributes } from "aws-amplify/auth";

export default function ManageAccountsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [patients, setPatients] = useState<DataPatients[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<DataPatients[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [institution_id, setInstitutionID] = useState<string | null>(null);

  useEffect(() => {
    const getUserInstitutionID = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setInstitutionID(attributes["custom:institution_id"] || null);
      } catch (error) {
        console.error("Error fetching user attributes", error);
      }
    };
    getUserInstitutionID();
  }, []);

  const fetchLoadPatients = useCallback(async (institutionID: string | null) => {
    if (!institutionID) return;
    try {
      setLoading(true);
      const fetchedPatients = await fetchPatientsById(institutionID);
      setPatients(fetchedPatients);
      setFilteredPatients(fetchedPatients);
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
      setSearch(true);
    }
  }, []);

  useEffect(() => {
    if (institution_id) {
      fetchLoadPatients(institution_id);
    }
  }, [institution_id, fetchLoadPatients]);

  useEffect(() => {
    console.log("search query", searchQuery)
    if (searchQuery.trim() === "") {
      setFilteredPatients(patients);
      console.log("patient", patients)
    } else {
      setFilteredPatients(
        patients.filter((patient) =>
          patient.id_reference?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      console.log(filteredPatients)
    }
  }, [searchQuery, patients]);

  useEffect(() => {
    console.log("Updated Filtered Patients:", filteredPatients);
  }, [filteredPatients]);

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="flex items-center mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-text-primary">Manage Patient</h1>
          <Button variant="iconSecondary" size="large" icon={<Info className="w-6 h-6" />} />
        </div>
        <div className="flex flex-wrap gap-4 items-center">
          <div className="relative w-full sm:w-auto">
            <Input
              id="searchQuery"
              type="text"
              placeholder="Search ID Reference"
              value={searchQuery}
              size="medium"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-2 bg-foreground"
            />
            <Button 
              variant="iconPrimary" 
              size="innerSize" 
              icon={search ? <Search className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />} 
              onClick={() => setSearchQuery("")} 
            />
          </div>
          <AddPatientDialog onUpdatePatients={() => fetchLoadPatients(institution_id)} />
          <Button
            variant={viewMode === "card" ? "iconCardViewActive" : "iconCardView"}
            onClick={() => setViewMode("card")}
            icon={<LayoutDashboard className="w-6 h-6" />}
          />
          <Button
            variant={viewMode === "list" ? "iconListViewActive" : "iconListView"}
            onClick={() => setViewMode("list")}
            icon={<LayoutList className="w-6 h-6" />}
          />
        </div>
      </div>

      {loading ? (
        <div>
          <Spinner />
          <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">Loading</p>
        </div>
      ) : filteredPatients.length === 0 ? (
        <p className="text-lg text-center mt-10 text-primary font-semibold">No patients found</p>
      ) : (
        <>
          {viewMode === "card" ? <CardView initialPatients={filteredPatients} /> : <ListView initialPatients={filteredPatients} />}
        </>
      )}
    </div>
  );
}
