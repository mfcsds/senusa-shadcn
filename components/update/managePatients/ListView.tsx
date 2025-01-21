import { SquarePen, Trash2, Accessibility } from "lucide-react";
import Button from "@/components/update/button/Button";
import { removePatient, fetchPatients } from "@/hooks/usePatients";
import { useRouter } from "next/navigation";
import { DataPatients } from "@/utils/object";
import { useState, useEffect } from "react";
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
import Swal from "sweetalert2";

interface CardViewProps {
  initialPatients: DataPatients[];
}

const ListView: React.FC<CardViewProps> = ({ initialPatients }) => {
  const router = useRouter();
  const [patients, setPatients] = useState<DataPatients[]>(initialPatients);

  const handleDelete = async (id: string) => {
    try {
      await removePatient(id);
      Swal.fire({
        title: "Success",
        text: "Patient has been deleted.",
        icon: "success",
        background: "bg-background",
        color: "text-text-primary",
        timer: 3000,
        customClass: {
          popup: "bg-background text-text-primary",
          title: "text-2xl font-bold",
          confirmButton:
            "bg-primary text-text-action hover:bg-secondary rounded-lg px-4 py-2",
          cancelButton:
            "bg-red-primary text-text-action hover:bg-red-secondary rounded-lg px-4 py-2",
        },
        confirmButtonText: "Oke",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
        window.location.reload();
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      alert("Failed to delete patient.");
    }
  };

  return (
    <div className="space-y-4">
      {patients.map((patient) => (
        <div
          key={patient.id}
          className="flex flex-col sm:flex-row items-center justify-between p-4 bg-foreground shadow-xl rounded-lg space-y-4 sm:space-y-0 sm:space-x-4"
        >
          {/* Icon */}
          <div className="bg-accent rounded-lg flex items-center justify-center w-16 h-16 shrink-0">
            <Accessibility className="text-primary w-8 h-8" />
          </div>

          {/* Patient Info */}
          <div className="flex-1 text-center sm:text-left">
            <h3 className="text-lg font-medium text-text-primary truncate">
              {patient.id}
            </h3>
            <p className="text-md text-text-secondary truncate">
              {patient.health_desc}
            </p>
          </div>

          {/* Actions */}
          <div className="flex space-x-2 sm:space-x-4">
            {/* Edit Button */}
            <Button
              variant="outlineSecondary"
              size="small"
              icon={<SquarePen className="w-4 h-4" />}
              onClick={() => {
                router.push(`/features/manage-patients/${patient.id}`);
              }}
            />

            {/* Delete Button with Confirmation */}
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
                    Note: All associated data, including reports, VCF files, and
                    variant samples linked to this patient, will be permanently
                    deleted. This action cannot be undone.
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
      ))}
    </div>
  );
};

export default ListView;
