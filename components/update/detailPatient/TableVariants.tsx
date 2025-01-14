import { useEffect, useState } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { removeVCFData } from "@/hooks/managePatients/usePatientVariants"; 
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
import { VcfData } from "@/utils/object"; // Model untuk VCF data

interface TabelVariantsProps {
  initialVariants: VcfData[]; 
  patientID: string;
}

const TabelVariants: React.FC<TabelVariantsProps> = ({ patientID, initialVariants }) => {
  const [vcfData, setVcfData] = useState<VcfData[]>([]);
  const router = useRouter();

  // const handleDelete = async (vcfDataId: string, filePath: string) => {
  //   if (confirm("Are you sure you want to delete this file?")) {
  //     await removeVCFData(vcfDataId, filePath);
  //     setVcfData((prevData) =>
  //       prevData.filter((data) => data.id !== vcfDataId)
  //     );
  //   }
  // };

  return (
    <Table>
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
          vcfData.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="font-medium">{variant.id}</TableCell>
              <TableCell>{variant.genome_reference}</TableCell>
              <TableCell>{variant.sample_date}</TableCell>
              <TableCell>{variant.number_variant}</TableCell>
              <TableCell>{variant.uploadAt}</TableCell>
              <TableCell className="flex gap-4">
                <Button
                  variant="borderSecondary"
                  size="small"
                  icon={<SquarePen className="w-4 h-4" />}
                  // onClick={() => router.push(`/edit/${variant.id}`)}
                />
                <Button
                  variant="borderDanger"
                  icon={<Trash2 className="w-4 h-4" />}
                  // onClick={() => handleDelete(variant.id, variant.filePath)}
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
