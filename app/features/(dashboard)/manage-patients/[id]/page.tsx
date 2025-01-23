"use client";

import { useEffect, useState } from "react";
import { fetchPatients, updateDataPatient } from "@/hooks/usePatients";
import Button from "@/components/update/button/Button";
import DropDownSelectPatient from "@/components/update/managePatients/DropDownSelectPatient";
import AddVCFDialog from "@/components/update/detailPatient/AddVCFDialog";
import TableVCF from "@/components/update/detailPatient/TableVCF";
import { DataPatients } from "@/utils/object";
import { ArrowLeft, Info, Accessibility, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { fetchVCFData } from "@/hooks/useVcfData";
import { VcfData } from "@/utils/object";
import Dropdown from "@/components/update/input/Dropdown";
import ButtonAddFamilyDisease from "@/components/update/button/ButtonAddFamilyDisease";
import ButtonAddPatientDisease from "@/components/update/button/ButtonAddPatientDisease";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import {
  Select,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/update/ui/select";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";
import { useToast } from "@/components/ui/use-toast";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailPatientPage({ params }: PageProps) {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const [patients, setPatients] = useState<DataPatients[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [vcfData, setVcfData] = useState<VcfData[]>([]);
  const [statusPasien, setStatusPasien] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [patientStatusDesc, setPatientStatusDesc] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        if (resolvedParams.id) {
          setId(resolvedParams.id);
        } else {
          console.error("Patient ID is not available in params.");
        }
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    };
    resolveParams();
  }, [params]);

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
    if (!id) return;
    const loadVCFData = async () => {
      try {
        setLoading(true);
        const data = await fetchVCFData(id);
        setVcfData(data);
      } catch (error) {
        console.error("Failed to fetch VCF data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadVCFData();
  }, [id]);

  const handleUpdatePatientStatus = async () => {
    try {
      await updateDataPatient(id!, patientStatusDesc);
      toast({
        title: "Update Successfully",
        description: "The patient status has been update successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed update patient",
        description: "Can not update patient status",
      });
    }
  };

  return (
    <div className="p-4 sm:p-8 min-h-screen grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-[1fr_3fr]">
  {/* Information Patient */}
  <div className="flex flex-col gap-6">
    <div className="flex flex-col md:flex-row flex-wrap items-start md:items-center bg-foreground shadow-xl rounded-lg w-full">
      <div className="flex items-center justify-center bg-accent text-primary w-full md:w-20 h-full rounded-t-lg md:rounded-lg">
        <Accessibility className="w-10 h-10" />
      </div>
      <div className="flex flex-col flex-1 p-4 md:ml-4 text-left gap-2">
        <h4 className="font-semibold text-lg text-text-primary">Patient ID</h4>
        <p className="text-lg font-medium text-text-secondary">{id}</p>
        <DropDownSelectPatient
          options={patients}
          selectedValue={selectedPatient || ""}
          onChange={setSelectedPatient}
          placeholder="Select Patient State"
        />
      </div>
    </div>

    {/* Status Patient State */}
    <div className="bg-foreground shadow-lg rounded-lg p-4 sm:p-6">
      <div className="flex flex-col items-start gap-4">
        <label
          htmlFor="family-disease"
          className="font-medium text-sm text-text-primary"
        >
          Status
        </label>
        <div className="flex flex-col items-start gap-4 flex-wrap">
        <Select
              onValueChange={(value) => {
                setPatientStatusDesc(value);
              }}
            >
            <SelectTrigger className="w-full md:w-auto">
              <SelectValue placeholder="Select Patient State" />
            </SelectTrigger>
            <SelectContent side="bottom" align="start" position="popper">
              <SelectGroup>
                <SelectLabel>Patient History Options</SelectLabel>
                <SelectItem value="No personal or familial history of cancer">
                  No personal or familial history of cancer
                </SelectItem>
                <SelectItem value="Healthy with a family history of cancer">
                  Healthy with a family history of cancer
                </SelectItem>
                <SelectItem value="Personal history of cancer, no family history">
                  Personal history of cancer, no family history
                </SelectItem>
                <SelectItem value="Personal and family history of cancer">
                  Personal and family history of cancer
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
              label="Save"
              variant="borderSecondary"
              size="medium"
              className="w-full"
              icon={<Save className="w-3 h-3" />}
              onClick={() => handleUpdatePatientStatus()}
            />
        </div>
      </div>
    </div>

    {/* Family Disease History */}
    <div className="bg-foreground shadow-lg rounded-lg p-4 sm:p-6">
      <div className="flex flex-col items-start gap-4">
        <label
          htmlFor="family-disease"
          className="font-medium text-sm text-text-primary"
        >
          Patient Disease History
        </label>
        <ButtonAddPatientDisease patient_id={id} />
      </div>
    </div>

    {/* Patient Disease History */}
    <div className="bg-foreground shadow-lg rounded-lg p-4 sm:p-6">
      <div className="flex flex-col items-start gap-4">
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
  <div className="bg-foreground shadow-lg rounded-lg p-4 sm:p-6 space-y-4 h-auto overflow-x-auto">
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
        <AddVCFDialog patientID={id!} />
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
