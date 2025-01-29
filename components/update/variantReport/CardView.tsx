import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/update/ui/card";
import Button from "@/components/update/button/Button";
import { SquarePen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ReportStatus } from "@/utils/DateHelperFunction";
import { useRouter } from "next/navigation";
import { removeVariantReport, fetchVariantReport } from "@/hooks/useVariantReport";
import { CreateVariantReportInput } from "@/src/API";
import { useToast } from "@/components/ui/use-toast";
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

interface CardViewProps {
  initialVariants: CreateVariantReportInput[]
}

const CardView: React.FC<CardViewProps> = ({ initialVariants }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [variantReport, setVariantReport] = useState<CreateVariantReportInput[]>(initialVariants);

  const handleDelete = async (id: string) => {
    try {
      await removeVariantReport(id);
      const updateVariantReport = await fetchVariantReport();
      setVariantReport(updateVariantReport);
      toast({
        title: "Delete Successfully",
        description: "variant Report has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete variant Report",
        description: "Unable to delete the variant Report data.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {variantReport.map((variant) => (
        <Card key={variant.id}>
          <CardHeader className="flex items-left gap-4">
            <div>
              <CardTitle className="text-sm text-text-primary">Report ID: {variant.id}</CardTitle>
              <CardTitle className="text-sm text-text-primary">Patient ID: {variant.idPatient}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary mb-4">
              <strong>Patient Phenotypes:</strong> {variant.phenotype}
            </p>
            <div className="grid gap-2 items-center justify-between mb-4">
            <p className="text-sm text-text-secondary">
              <strong>Status Report:</strong>
            </p>
              <div className="border-2 text-primary text-center border-primary px-4 py-1 rounded-lg text-sm">
              {ReportStatus(variant.status ?? 4)}
              </div>
              
            </div>
            <div className="flex justify-between gap-2 border-t pt-2">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Medical History</p>
                <p className="text-sm text-text-secondary">{variant.medical_history}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Current Diagnosis</p>
                <p className="text-sm text-text-secondary">{variant.current_diagnosis}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Sample Collection</p>
                <p className="text-sm text-text-secondary">{variant.sample_collection}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-end mt-6">
                <Button
                  variant="outlineSecondary"
                  size="large"
                  icon={<SquarePen className="w-4 h-4" />}
                  onClick={() =>
                    router.push(`/features/variant-report/${variant.id}`)
                  }
                />
                <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outlineDanger"
                    size="large"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this variant report data?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(variant.id!)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
