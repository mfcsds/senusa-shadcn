import { SquarePen, Trash2 } from "lucide-react";
import Button from "@/components/update/button/Button";
import { useRouter } from "next/navigation";
import { removePatient, PatientData } from "@/hooks/managePatients/usePatients";
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
  variants: PatientData[];
}

const CardView: React.FC<CardViewProps> = ({ variants }) => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };
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
            {variants.map((variant) => (
              <TableRow key={variant.id}>
                <TableCell className="font-medium">{variant.id}</TableCell>
                <TableCell>{variant.id}</TableCell>
                <TableCell>{variant.id}</TableCell>
                <TableCell>{variant.id}</TableCell>
                <TableCell>{variant.id}</TableCell>
                <TableCell className="flex gap-4">
                  <Button
                    variant="borderSecondary"
                    size="small"
                    icon={<SquarePen className="w-4 h-4" />}
                  />
                  <Button
                    variant="borderDanger"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
  );
};

export default CardView;
