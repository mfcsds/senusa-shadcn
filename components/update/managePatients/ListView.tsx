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
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";

interface CardViewProps {
  initialPatients: DataPatients[];
}

const ListView: React.FC<CardViewProps> = ({ initialPatients }) => {
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
    <div className="bg-foreground shadow-xl rounded-lg p-6">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Patient ID</TableHead>
          <TableHead>ID Reference</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Sex</TableHead>
          <TableHead>Date of Birth</TableHead>
          <TableHead>Phone Number:</TableHead>
          <TableHead>Health Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
      {patients.map((patient) => (
          <TableRow key={patient.id}>
            <TableCell className="font-medium">{patient.id}</TableCell>
            <TableCell className="font-medium">{patient.id_reference}</TableCell>
            <TableCell>{patient.name}</TableCell>
            <TableCell>{patient.sex}</TableCell>
            <TableCell>{patient.dob}</TableCell>
            <TableCell>{patient.phone_number}</TableCell>
            <TableCell>{patient.health_desc}</TableCell>
            <TableCell className="flex gap-4">
            <Button
              variant="outlineSecondary"
              size="small"
              icon={<SquarePen className="w-4 h-4" />}
              onClick={() => {
                router.push(`/features/manage-patients/${patient.id}`);
              }}
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
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      
    </div>
  );
};

export default ListView;
