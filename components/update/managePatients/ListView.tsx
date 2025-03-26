import { Eye, Trash2, ArrowUpDown } from "lucide-react";
import Button from "@/components/update/button/Button";
import { removePatient, fetchPatients } from "@/hooks/usePatients";
import { useRouter } from "next/navigation";
import { DataPatients } from "@/utils/object";
import { useState } from "react";
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
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/update/ui/table";

interface CardViewProps {
  initialPatients: DataPatients[];
}

const ListView: React.FC<CardViewProps> = ({ initialPatients }) => {
  const router = useRouter();
  const [patients, setPatients] = useState<DataPatients[]>(initialPatients);
  const { toast } = useToast();
  const [sortConfig, setSortConfig] = useState<{ key: keyof DataPatients; direction: "asc" | "desc" } | null>(null);

  const handleSort = (key: keyof DataPatients) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedPatients = [...patients].sort((a, b) => {
    if (!sortConfig || !sortConfig.key) return 0; 

    const key = sortConfig.key as keyof DataPatients; 

    if (!a[key] || !b[key]) return 0; 

    if (sortConfig.direction === "asc") {
      return String(a[key]).localeCompare(String(b[key]));
    } else {
      return String(b[key]).localeCompare(String(a[key]));
    }
  });

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
              {[
                { key: "id", label: "Patient ID" },
                { key: "id_reference", label: "ID Reference" },
                { key: "name", label: "Name" },
                { key: "sex", label: "Sex" },
                { key: "dob", label: "Date of Birth" },
                { key: "phone_number", label: "Phone Number" },
                { key: "health_desc", label: "Health Description" }
              ].map(({ key, label }) => (
                <TableHead key={key}>
                  <button
                    onClick={() => handleSort(key as keyof DataPatients)}
                    className="flex items-center gap-1 text-text-primary hover:text-primary transition-colors duration-200"
                  >
                    {label} <ArrowUpDown className="w-4 h-4" />
                  </button>
                </TableHead>
              ))}
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPatients.map((patient) => (
              <TableRow key={patient.id} >
                <TableCell className="font-medium">{patient.id || "N/A"}</TableCell>
                <TableCell className="font-medium">{patient.id_reference || "N/A"}</TableCell>
                <TableCell>{patient.name || "N/A"}</TableCell>
                <TableCell>{patient.sex || "N/A"}</TableCell>
                <TableCell>{patient.dob || "N/A"}</TableCell>
                <TableCell>{patient.phone_number || "N/A"}</TableCell>
                <TableCell>{patient.health_desc || "N/A"}</TableCell>
                <TableCell className="flex gap-4">
                  <Button
                    variant="outlineSecondary"
                    size="small"
                    icon={<Eye className="w-4 h-4" />}
                    onClick={() => {
                      router.push(`/features/manage-patients/${patient.id}`);
                    }}
                  />
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outlineDanger" icon={<Trash2 className="w-4 h-4" />} />
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
