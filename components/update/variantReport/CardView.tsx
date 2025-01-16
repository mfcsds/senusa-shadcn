import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/update/ui/card";
import Button from "@/components/update/button/Button";
import { SquarePen, Trash2 } from "lucide-react";
import { CreateVariantReportInput } from "@/src/API";

interface CardViewProps {
  initialVariants: CreateVariantReportInput[]
}

const CardView: React.FC<CardViewProps> = ({ initialVariants }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {initialVariants.map((item) => (
        <Card key={item.id}>
          <CardHeader className="flex items-left gap-4">
            <div>
              <CardTitle className="text-sm text-text-primary"> ID: {item.id}</CardTitle>
              <CardTitle className="text-sm text-text-primary">Patient ID: {item.idPatient}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-text-secondary mb-4">
              <strong>Patient Phenotypes:</strong> {item.phenotype}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="border-2 text-primary text-center border-primary px-4 py-1 rounded-lg text-sm">
              {item.status}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outlineSecondary"
                  size="small"
                  icon={<SquarePen className="w-4 h-4" />}
                />
                <Button
                  variant="outlineDanger"
                  size="small"
                  icon={<Trash2 className="w-4 h-4" />}
                />
              </div>
            </div>
            <div className="flex justify-between gap-2 border-t pt-2">
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Medical History</p>
                <p className="text-sm text-text-secondary">{item.medical_history}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Current Diagnosis</p>
                <p className="text-sm text-text-secondary">{item.current_diagnosis}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-xs text-text-secondary">Sample Collection</p>
                <p className="text-sm text-text-secondary">{item.sample_collection}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
