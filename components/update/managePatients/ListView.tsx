import { SquarePen, Trash2, Accessibility } from "lucide-react";
import Button from "@/components/update/button/Button";
import { removePatient, PatientData } from "@/hooks/managePatients/usePatients";
import { useRouter } from "next/navigation";

interface CardViewProps {
  patients: PatientData[];
}

const ListView: React.FC<CardViewProps> = ({ patients }) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
  return (
    <div className="space-y-4">
      {patients.map((patient, index) => (
        <div
          key={patient.id}
          className="flex items-center justify-between p-4 bg-foreground shadow rounded-lg"
        >
          <div className="bg-accent rounded-lg flex items-center justify-center w-16 h-16">
            <Accessibility className="text-primary w-8 h-8" />
          </div>
          <div className="flex-1 ml-6">
            <h3 className="text-lg font-medium text-text-primary">{patient.id}</h3>
          </div>
          <div className="flex space-x-2 gap-2 sm:gap-4">
            <Button
              variant="outlineSecondary"
              size="small"
              icon={<SquarePen className="w-4 h-4" />}
              onClick={() => {router.push(`/features/manage-patients/${patient.id}`)}}
            />
            <Button
              variant="outlineDanger"
              icon={<Trash2 className="w-4 h-4" />}
              onClick={() => removePatient(patient.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
