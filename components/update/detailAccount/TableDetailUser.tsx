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
import { updateAccountUser } from "@/hooks/useAccounts";
import { useToast } from "@/components/ui/use-toast";

interface DetailUserProps {
  listUsers: DataUser[];
}

const TableDetailUser: React.FC<DetailUserProps> = ({ listUsers }) => {
  const [users, setUsers] = useState<DataUser[]>(listUsers);
  const { toast } = useToast();
  const handleUpdateUser = (updatedUser: DataUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((listUsers) => (listUsers.id === updatedUser.id ? updatedUser : listUsers))
    );
  };

  const handleUpdateStatus = async (id: string) => {
    try {
      await updateAccountUser(id, 3);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 3 } : user
        )
      );

      toast({
        title: "Deactivated Successfully",
        description: "Account has been Deactivated successfully.",
      });
    } catch (error) {
      console.error("Error deactivating account:", error);
      toast({
        variant: "destructive",
        title: "Failed to deactivate account",
        description: "Unable to deactivate the account user.",
      });
    }
  };

  return (
    <div className="bg-foreground shadow rounded-lg p-6 space-y-4 mt-6">
      <Table>
        <TableCaption>
          Current Number of User Account {listUsers.length}/10.
        </TableCaption>
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
              <TableCell>
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell>{user.level}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone_number}</TableCell>
              <TableCell>{userStatus(user.status!)}</TableCell>
              <TableCell className="flex gap-4">
                <EditUserDialog
                  institutionID={user.institutionID!}
                  user={user}
                  onUpdateSuccess={handleUpdateUser}
                />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="borderDanger"
                      icon={<Trash2 className="w-4 h-4" />}
                    />
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you sure you want to deactivated this account
                        Institutions?
                      </AlertDialogTitle>
                      <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleUpdateStatus(user.id!)}
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

export default TableDetailUser;
