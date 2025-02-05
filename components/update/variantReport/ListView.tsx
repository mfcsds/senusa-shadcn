import Button from "@/components/update/button/Button";
import { SquarePen, Trash2 } from "lucide-react";
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
import { CreateVariantReportInput } from "@/src/API";
import { ReportStatus } from "@/utils/DateHelperFunction";
import { useRouter } from "next/navigation";

interface CardViewProps {
  initialVariants: CreateVariantReportInput[]
}

const ListView: React.FC<CardViewProps> = ({ initialVariants }) => {
  const router = useRouter();
  return (
    <div className="bg-foreground shadow-xl rounded-lg p-6 space-y-4 mt-6">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report ID</TableHead>
          <TableHead>Patient ID</TableHead>
          <TableHead>Medical History</TableHead>
          <TableHead>Sample Collection</TableHead>
          <TableHead>Patient Phenotypes</TableHead>
          <TableHead>Status Report</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {initialVariants.map((variant) => (
          <TableRow key={variant.id}>
            <TableCell className="font-medium">{variant.id}</TableCell>
            <TableCell className="font-medium">{variant.idPatient}</TableCell>
            <TableCell>{variant.phenotype}</TableCell>
            <TableCell>{variant.medical_history}</TableCell>
            <TableCell>{variant.current_diagnosis}</TableCell>
            <TableCell>{variant.sample_collection}</TableCell>
            <TableCell className="text-text-primary">{ReportStatus(variant.status ?? 4)}</TableCell>
            <TableCell className="flex gap-4">
              <Button
                variant="outlineSecondary"
                size="small"
                icon={<SquarePen className="w-4 h-4" />}
                onClick={() =>
                  router.push(`/features/variant-report/${variant.id}`)
                }
              />
              <Button
                variant="outlineDanger"
                icon={<Trash2 className="w-4 h-4" />}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
};

export default ListView;
