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

interface ListViewProps {
  data: Array<{
    patientId: string;
    reportId: string;
    phenotypes: string;
    medicalHistory: string;
    currentDiagnosis: string;
    sampleCollection: string;
    statusReport: string;
  }>;
}

const ListView: React.FC<ListViewProps> = ({ data }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Report ID</TableHead>
          <TableHead>Patient ID</TableHead>
          <TableHead>Medical History</TableHead>
          <TableHead>Current Diagnosis</TableHead>
          <TableHead>Sample Collection</TableHead>
          <TableHead>Patient Phenotypes:</TableHead>
          <TableHead>Status Report</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.reportId}>
            <TableCell className="font-medium">{item.reportId}</TableCell>
            <TableCell className="font-medium">{item.patientId}</TableCell>
            <TableCell>{item.phenotypes}</TableCell>
            <TableCell>{item.medicalHistory}</TableCell>
            <TableCell>{item.currentDiagnosis}</TableCell>
            <TableCell>{item.sampleCollection}</TableCell>
            <TableCell className="text-text-primary">{item.statusReport}</TableCell>
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

export default ListView;
