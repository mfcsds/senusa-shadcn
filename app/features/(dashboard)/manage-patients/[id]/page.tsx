"use client";

import { useEffect, useState } from "react";
import { fetchPatients } from "@/hooks/managePatients/usePatients";
import Button from "@/components/update/button/Button";
import DropDownSelectPatient from "@/components/update/managePatients/DropDownSelectPatient";
import AddVCFDialog from "@/components/update/detailPatient/AddVCFDialog";
import TableVCF from "@/components/update/detailPatient/TableVCF";
import { DataPatients } from "@/utils/object";
import { Plus, ArrowLeft, Info, Accessibility } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchVCFData } from "@/hooks/managePatients/usePatientVariants";
import { VcfData } from "@/utils/object";
import ButtonAddFamilyDisease from "@/components/update/detailPatient/ButtonAddFamilyDisease";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DetailPatientPage({ params }: PageProps) {
  const { id } = params;
  const router = useRouter();
  const [patients, setPatients] = useState<DataPatients[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [vcfData, setVcfData] = useState<VcfData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const fetchedPatients = await fetchPatients();
        setPatients(fetchedPatients);
      } catch (error) {
        console.error("Failed to fetch patients:", error);
      }
    };

    loadPatients();
  }, []);

  useEffect(() => {
    const loadVCFData = async () => {
      try {
        setLoading(true);
        const data = await fetchVCFData(id);
        setVcfData(data);
      } catch (error) {
        console.error("Failed to fetch variants:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVCFData();
  }, [id]);

  return (
    <div className="p-4 sm:p-8 min-h-screen grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Information Patient */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center bg-foreground shadow-md rounded-lg w-full">
          <div className="flex items-center justify-center bg-accent text-primary w-full md:w-20 h-24 rounded-t-lg md:rounded-lg">
            <Accessibility className="w-10 h-10" />
          </div>
          <div className="flex flex-col flex-1 p-4 md:ml-4 text-left">
            <h4 className="font-semibold text-lg text-text-primary">
              Patient ID
            </h4>
            <p className="text-lg font-medium text-text-secondary">{id}</p>
          </div>
          <div className="flex items-center justify-between gap-4 w-full md:w-auto px-4 md:px-4 ml-auto">
            <DropDownSelectPatient
              options={patients}
              selectedValue={id}
              onChange={setSelectedPatient}
              placeholder="Select a Patient"
            />
          </div>
        </div>

        {/* Status Patient State   */}
        <div className="bg-foreground shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <label
              htmlFor="family-disease"
              className="font-medium text-sm text-text-primary"
            >
              Family Disease History
            </label>
            <ButtonAddFamilyDisease patient_id={id} />
          </div>
        </div>

        {/* Family Disease History */}
        <div className="bg-foreground shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <label
              htmlFor="family-disease"
              className="font-medium text-sm text-text-primary"
            >
              Patient Disease History
            </label>
            <ButtonAddFamilyDisease patient_id={id} />
          </div>
        </div>

        {/* Patient Disease History */}
        <div className="bg-foreground shadow rounded-lg p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <label
              htmlFor="patient-disease"
              className="font-medium text-sm text-text-primary"
            >
              Family Disease History
            </label>
            <ButtonAddFamilyDisease patient_id={id} />
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-foreground shadow rounded-lg p-4 sm:p-6 space-y-4 h-auto">
        <div className="mb-4 sm:mb-10">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
            <div className="flex items-center space-x-4">
              <Button
                variant="iconPrimary"
                size="large"
                icon={<ArrowLeft className="w-8 h-8" />}
                className="bg-foreground"
                onClick={() => {
                  router.push("/features/manage-patients");
                }}
              />
              <h1 className="text-2xl font-semibold text-text-primary">
                Patient Variant Data
              </h1>
              <Button
                variant="iconSecondary"
                size="large"
                icon={<Info className="w-6 h-6" />}
                className="bg-foreground"
              />
            </div>
            <AddVCFDialog patientID={id} />
          </div>
        </div>
        {loading ? (
          <p className="text-sm text-center mt-10 text-primary font-semibold animate-pulse">
            Loading...
          </p>
        ) : (
          <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
            <TableVCF initialVCFData={vcfData} />
          </div>
        )}
      </div>
    </div>
  );
}
