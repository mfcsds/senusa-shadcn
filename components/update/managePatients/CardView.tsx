import { useState, useEffect } from "react";
import { SquarePen, Trash2, Accessibility } from "lucide-react";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { removePatient, fetchPatients } from "@/hooks/usePatients";
import { DataPatients } from "@/utils/object";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/update/dialog/AlertDialog";
import { useToast } from "@/components/ui/use-toast";

interface CardViewProps {
  initialPatients: DataPatients[];
}

const CardView: React.FC<CardViewProps> = ({ initialPatients }) => {
  const router = useRouter();
  const [patients, setPatients] = useState<DataPatients[]>(initialPatients);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      await removePatient(id);
      const updatedPatients = await fetchPatients();
      setPatients(updatedPatients);
      toast({
        title: "Delete Successfully",
        description: "Patient has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete patient",
        description: "Unable to delete the patient data.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="bg-foreground shadow-xl rounded-lg flex flex-row sm:flex-row items-center sm:items-start pr-6"
        >
          <div className="bg-accent rounded-lg flex items-center justify-center w-12 h-full sm:w-16 sm:h-full">
            <Accessibility className="text-primary w-5 h-5 sm:w-10 sm:h-10" />
          </div>
          <div className="flex flex-col ml-4 flex-1 pt-4">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-lg font-medium text-text-primary mb-2">
                Patient ID {patient.id}
              </h2>
            </div>

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

            <div className="flex justify-end space-x-2 mt-6 sm:mt-6 sm:mb-2 pb-5">
              <Button
                variant="outlineSecondary"
                size="small"
                icon={<SquarePen className="w-4 h-4" />}
                onClick={() =>
                  router.push(`/features/manage-patients/${patient.id}`)
                }
              />
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outlineDanger"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this patient data?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      Note: All associated data, including reports, VCF files,
                      and variant samples linked to this patient, will be
                      permanently deleted. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(patient.id)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardView;
