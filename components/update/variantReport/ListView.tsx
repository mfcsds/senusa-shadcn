import { useState } from "react";
import Button from "@/components/update/button/Button";
import { SquarePen, Trash2, ArrowUpDown } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { CreateVariantReportInput } from "@/src/API";
import { ReportStatus } from "@/utils/DateHelperFunction";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import {
  removeVariantReport,
  fetchVariantReport,
} from "@/hooks/useVariantReport";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/update/dialog/AlertDialog";

interface CardViewProps {
  initialVariants: CreateVariantReportInput[];
}

const ListView: React.FC<CardViewProps> = ({ initialVariants }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [variantReport, setVariantReport] =
    useState<CreateVariantReportInput[]>(initialVariants);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof CreateVariantReportInput | null;
    direction: "ascending" | "descending";
  }>({ key: null, direction: "ascending" });

  const handleDelete = async (id: string) => {
    try {
      await removeVariantReport(id);
      const updateVariantReport = await fetchVariantReport();
      setVariantReport(updateVariantReport);
      toast({
        title: "Delete Successfully",
        description: "Variant Report has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting variant report:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete variant Report",
        description: "Unable to delete the variant Report data.",
      });
    }
  };

  const handleSort = (key: keyof CreateVariantReportInput) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...variantReport].sort((a, b) => {
      const valA = a[key] ?? "";
      const valB = b[key] ?? "";

      if (typeof valA === "number" && typeof valB === "number") {
        return direction === "ascending" ? valA - valB : valB - valA;
      }

      return direction === "ascending"
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    setVariantReport(sortedData);
  };

  return (
    <div className="bg-foreground shadow-xl rounded-lg p-6 space-y-4 mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            {[
              { label: "Report ID", key: "id" },
              { label: "Patient ID", key: "idPatient" },
              { label: "Sample Collection", key: "sample_collection" },
              { label: "Patient Phenotypes", key: "phenotype" },
              { label: "Status Report", key: "status" },
            ].map(({ label, key }) => (
              <TableHead key={key}>
                <button
                  onClick={() =>
                    handleSort(key as keyof CreateVariantReportInput)
                  }
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
          {variantReport.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell className="font-medium">{variant.id}</TableCell>
              <TableCell className="font-medium">{variant.idPatient}</TableCell>
              <TableCell>{variant.sample_collection}</TableCell>
              <TableCell>
                {Array.isArray(variant.phenotype) ? (
                  <div className="flex flex-col">
                    {variant.phenotype.map((item, index) => (
                      <span key={index}>{item}</span>
                    ))}
                  </div>
                ) : (
                  <span>{variant.phenotype}</span>
                )}
              </TableCell>
              <TableCell className="text-text-primary">
                {ReportStatus(variant.status ?? 4)}
              </TableCell>
              <TableCell className="flex gap-4">
                <Button
                  variant="outlineSecondary"
                  size="small"
                  icon={<SquarePen className="w-4 h-4" />}
                  onClick={() =>
                    router.push(`/features/variant-report/${variant.id}`)
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
                        Are you sure you want to delete this variant report
                        data?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(variant.id!)}
                      >
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
