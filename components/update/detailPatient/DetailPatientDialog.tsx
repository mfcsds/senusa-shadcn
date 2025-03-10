import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import Button from "@/components/update/button/Button";
import { Info, Accessibility } from "lucide-react";
import { fetchDetailPatient } from "@/hooks/usePatients";
import { DataPatients } from "@/utils/object";

interface DetailPatientDialogProps {
  patientID: string;
}

const DetailPatientDialog = ({ patientID }: DetailPatientDialogProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [patient, setPatient] = useState<DataPatients | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPatientDetails = async () => {
      setLoading(true);
      try {
        const response = await fetchDetailPatient(patientID);
        setPatient(response[0] || null);
      } catch (error) {
        console.error("Error fetching patient:", error);
      } finally {
        setLoading(false);
      }
    };

    if (patientID) {
      getPatientDetails();
    }
  }, [patientID]);

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          variant="iconSecondary"
          size="none"
          icon={<Info className="w-5 h-5" />}
          className="bg-foreground mr-4"
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[50%] max-h-[90%] overflow-y-auto bg-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-text-primary text-2xl">Detail Patient</span>
          </DialogTitle>
          <DialogDescription className="text-text-secondary"></DialogDescription>
        </DialogHeader>

        {loading ? (
          <p className="text-center text-text-primary">Loading...</p>
        ) : !patient ? (
          <p className="text-center text-text-secondary">Data tidak tersedia</p>
        ) : (
          <div className="bg-foreground shadow-xl rounded-lg flex flex-row sm:flex-row items-center sm:items-start pr-6">
            <div className="bg-accent rounded-lg flex items-center justify-center w-12 h-full sm:w-16 sm:h-full">
              <Accessibility className="text-primary w-5 h-5 sm:w-10 sm:h-10" />
            </div>
            <div className="flex flex-col ml-4 flex-1 pt-4">
              <h2 className="text-lg sm:text-lg font-medium text-text-primary mb-2">
                Patient ID {patient.id}
              </h2>
              <ul className="space-y-3 text-sm text-text-secondary">
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent hover:text-text-primary transition-colors">
                  <span className="font-semibold">ID Reference: </span>
                  {patient.id_reference ?? "Not available"}
                </li>
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent hover:text-text-primary transition-colors">
                  <span className="font-semibold">Name: </span>
                  {patient.name ?? "Not available"}
                </li>
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent hover:text-text-primary transition-colors">
                  <span className="font-semibold">Sex: </span>
                  {patient.sex ?? "Not available"}
                </li>
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent hover:text-text-primary transition-colors">
                  <span className="font-semibold">Date of Birth: </span>
                  {patient.dob ?? "Not available"}
                </li>
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent hover:text-text-primary transition-colors">
                  <span className="font-semibold">Phone Number: </span>
                  {patient.phone_number ?? "Not available"}
                </li>
                <li className="p-2 bg-background border border-border rounded-md shadow-md hover:bg-accent h-[70px] hover:text-text-primary transition-colors">
                  <span className="font-semibold">Health Description: </span>
                  {patient.health_desc ?? "Not available"}
                </li>
              </ul>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DetailPatientDialog;
