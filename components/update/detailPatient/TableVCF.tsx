import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { removeVCFData } from "@/hooks/managePatients/usePatientVariants"; 
import  DetailVCFDialog  from "@/components/update/detailPatient/DetailVCFDialog";
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
import { VcfData } from "@/utils/object"; 
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

interface TabelVariantsProps {
  initialVCFData: VcfData[]; 
}

const TabelVariants: React.FC<TabelVariantsProps> = ({ initialVCFData }) => {
  const router = useRouter();

  // const handleDelete = async (vcfDataId: string, filePath: string) => {
  //   if (confirm("Are you sure you want to delete this file?")) {
  //     await removeVCFData(vcfDataId, filePath);
  //     setVcfData((prevData) =>
  //       prevData.filter((data) => data.id !== vcfDataId)
  //     );
  //   }
  // };

  const handleDelete = async (vcfDataId: string, filePath: string) => {
    try {
      await removeVCFData(vcfDataId, filePath);
      Swal.fire({
        title: "Success",
        text: "Data VCF has been deleted!",
        icon: "success",
        background: "bg-background", 
        color: "text-text-primary", 
        timer: 3000,
        customClass: {
          popup: "bg-background text-text-primary", 
          title: "text-2xl font-bold", 
          confirmButton: "bg-primary text-text-action hover:bg-secondary rounded-lg px-4 py-2", 
          cancelButton: "bg-red-primary text-text-action hover:bg-red-secondary rounded-lg px-4 py-2",  
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
      <Table className="h-full w-full overflow-y-auto">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Genome Reference</TableHead>
          <TableHead>Sample Collection Date</TableHead>
          <TableHead>Number of Variants</TableHead>
          <TableHead>Upload Date</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialVCFData.length > 0 ? (
          initialVCFData.map((vcf) => (
            <TableRow key={vcf.id}>
              <TableCell className="font-medium">{vcf.id}</TableCell>
              <TableCell>{vcf.genome_reference}</TableCell>
              <TableCell>{vcf.sample_date}</TableCell>
              <TableCell>{vcf.number_variant}</TableCell>
              <TableCell>{vcf.uploadAt}</TableCell>
              <TableCell className="flex gap-4">
                <DetailVCFDialog id_vcf={vcf.id!} />
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="iconBorderDanger"
                    icon={<Trash2 className="w-5 h-5" />}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this VCF data?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(vcf.id!, vcf.pathfile!)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No data available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TabelVariants;
