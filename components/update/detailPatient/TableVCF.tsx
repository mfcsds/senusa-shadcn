import { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { removeVCFData } from "@/hooks/useVcfData";
import DetailVCFDialog from "@/components/update/detailPatient/DetailVCFDialog";
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
import { useToast } from "@/components/ui/use-toast";

interface TabelVariantsProps {
  initialVCFData: VcfData[];
}

const TabelVariants: React.FC<TabelVariantsProps> = ({ initialVCFData }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [vcfData, setVcfData] = useState<VcfData[]>(initialVCFData);

  const handleDelete = async (vcfDataId: string, filePath: string) => {
    try {
      await removeVCFData(vcfDataId, filePath);
      toast({
        title: "Delete Successfully",
        description: "VCF has been deleted successfully.",
      });
      setVcfData((prevData) => prevData.filter((vcf) => vcf.id !== vcfDataId));
    } catch (error) {
      console.error("Error deleting VCF:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete VCF",
        description: "Can not update VCF status",
      });
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
        {vcfData.length > 0 ? (
          vcfData.map((vcf) => (
            <TableRow key={vcf.id}>
              <TableCell className="font-medium">{vcf.id}</TableCell>
              <TableCell>{vcf.genome_reference}</TableCell>
              <TableCell>{vcf.sample_date}</TableCell>
              <TableCell>{vcf.number_variant}</TableCell>
              <TableCell>{vcf.uploadAt}</TableCell>
              <TableCell className="flex gap-4">
                <DetailVCFDialog id_vcf={vcf.id!} />
                <Button
                  variant="iconBorderDanger"
                  size="small"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDelete(vcf.id!, vcf.pathfile!)}
                />
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
