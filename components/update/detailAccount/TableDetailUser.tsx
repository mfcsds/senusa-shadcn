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

interface DetailUserProps {
  data: Array<{
    id: string;
    fullName: string;
    userLevel: string;
    userRole: string;
    email: string;
    phone: string;
  }>;
}

const TableDetailUser: React.FC<DetailUserProps> = ({ data }) => {
  return (
    <div className="bg-foreground shadow rounded-lg p-6 space-y-4 mt-6">
    <Table>
          <TableCaption>Current Number of User Account 7/10.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>User Level</TableHead>
              <TableHead>User Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.fullName}
                </TableCell>
                <TableCell>{item.userLevel}</TableCell>
                <TableCell>{item.userRole}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
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
    </div>
  );
};

export default TableDetailUser;
