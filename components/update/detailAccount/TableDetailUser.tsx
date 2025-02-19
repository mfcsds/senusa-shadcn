import { useState } from "react";
import Button from "@/components/update/button/Button";
import { Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/update/ui/table";
import { DataUser } from "@/utils/object";
import { userStatus } from "@/utils/function";
import EditUserDialog from "./EditUserDialog";

interface DetailUserProps {
  listUsers: DataUser[];
}

const TableDetailUser: React.FC<DetailUserProps> = ({ listUsers }) => {
  const [users, setUsers] = useState<DataUser[]>(listUsers);

  const handleUpdateUser = (updatedUser: DataUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };

  return (
    <div className="bg-foreground shadow rounded-lg p-6 space-y-4 mt-6">
      <Table>
        <TableCaption>Current Number of User Account {users.length}/10.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>User Level</TableCell>
            <TableCell>User Role</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.first_name} {user.last_name}</TableCell>
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{userStatus(user.status!)}</TableCell>
              <TableCell className="flex gap-4">
                <EditUserDialog institutionID={user.institutionID!} user={user} onUpdateSuccess={handleUpdateUser} />
                <Button variant="borderDanger" icon={<Trash2 className="w-4 h-4" />} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDetailUser;
