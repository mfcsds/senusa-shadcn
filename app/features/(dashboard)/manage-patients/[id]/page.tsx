"use client";

import { useEffect, useState } from "react";
import { fetchPatients } from "@/hooks/managePatients/usePatients";
import Button from "@/components/update/button/Button";
import Dropdown from "@/components/update/input/Dropdown";
import DropDownSelectPatient from "@/components/update/managePatients/DropDownSelectPatient";
import AddVCFDialog from "@/components/update/detailPatient/AddVCFDialog";
import TableVariants from "@/components/update/detailPatient/TableVariants";
import { DataPatients } from "@/utils/object"
import {
  Plus,
  ArrowLeft,
  Info,
  Accessibility,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchVCFData } from "@/hooks/managePatients/usePatientVariants"; 
import { VcfData } from "@/utils/object";

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
  });

  useEffect(() => {
    const loadVCFData = async () => {
      try {
        const data = await fetchVCFData(id);
        setVcfData(data);
      } catch (error) {
        console.error("Failed to fetch variants:", error);
      }
      
    };
    loadVCFData();

  });

  const [roleAccount, setRoleAccount] = useState("");

  const userLevel = [
    { label: "Level 1", value: "level 1" },
    { label: "Level 2", value: "level 2" },
  ];

  const userRole = [
    { label: "Admin Lab", value: "Admin Lab" },
    { label: "User Lab", value: "User Lab" },
    { label: "Bioinformatician", value: "Bioinformatician" },
    { label: "Head Lab", value: "Head Lab" },
    { label: "Genetic Cousellor", value: "Genetic Cousellor" },
    { label: "Clinical Pathology", value: "Clinical Pathology" },
  ];


  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col md:flex-row rounded-lg items-start md:items-center gap-6">
        <div className="flex flex-col md:flex-row items-start md:items-center bg-foreground shadow-md rounded-lg pr-0 md:pr-6 w-full md:flex-1">
          <div className="flex items-center justify-center bg-accent text-primary w-full md:w-20 h-24 rounded-t-lg md:rounded-lg">
            <Accessibility className="w-10 h-10" />
          </div>
          <div className="flex flex-col flex-1 p-4 md:p-0 md:ml-4 text-left md:text-left">
            <h4 className="font-semibold text-lg text-text-primary">
              Patient ID
            </h4>
            <p className="text-lg font-medium text-text-secondary">{id}</p>
          </div>
          <div className="flex flex-row items-center justify-between gap-4 w-full px-4 md:px-0 md:ml-auto md:w-auto mb-6 md:mb-0 md:pr-8 pr-0">
            <Dropdown
              options={userRole}
              selectedValue={roleAccount}
              onChange={setRoleAccount}
              placeholder="Family Disease History"
              size="medium"
              variant="primary"
            />
            <Button
              variant="borderSecondary"
              size="small"
              icon={<Plus className="w-5 h-5" />}
            />
          </div>
          <div className="flex flex-row items-center justify-between gap-4 w-full px-4 md:px-0 md:ml-auto md:w-auto mb-6 md:mb-0 ">
            <label
              htmlFor="patient-select"
              className="font-medium text-sm text-text-primary"
            >
              Select Patient ID
            </label>
            <DropDownSelectPatient
              options={patients}
              selectedValue={id}
              onChange={setSelectedPatient}
              placeholder="Select a Role"
            />
          </div>
        </div>
      </div>

      <div className="bg-foreground shadow rounded-lg p-6 space-y-4 mt-10">
        <div className="mb-4 sm:mb-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="iconPrimary"
                size="large"
                icon={<ArrowLeft className="w-8 h-8" />}
                className="bg-foreground"
                onClick={() => {router.push(`/features/manage-patients`)}}
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
            <AddVCFDialog />
          </div>
        </div>

        <TableVariants patientID={id} initialVariants={vcfData}/>
      </div>
    </div>
  );
}
