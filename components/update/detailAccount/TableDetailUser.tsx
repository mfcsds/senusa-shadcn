import React, { useState, useEffect } from "react";
import Button from "@/components/update/button/Button";
import { Check, X } from "lucide-react";
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

  useEffect(() => {
    setUsers(listUsers);
  }, [listUsers]);

  const handleUpdateUser = (updatedUser: DataUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((users) =>
        users.id === updatedUser.id ? updatedUser : users
      )
    );
  };

  const handleUpdateStatusDestructive = async (id: string) => {
    try {
      await updateAccountUser(id, 3);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 3 } : user
        )
      );

      toast({
        title: "Deactivated Successfully",
        description: "Account has been deactivated successfully.",
      });
    } catch (error) {
      console.error("Error deactivate account:", error);
      toast({
        variant: "destructive",
        title: "Failed to deactivate account",
        description: "Unable to deactivate the account user.",
      });
    }
  };

  const handleUpdateStatusActive = async (id: string) => {
    try {
      await updateAccountUser(id, 2);

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, status: 2 } : user
        )
      );

      toast({
        title: "Active Successfully",
        description: "Account has been active successfully.",
      });
    } catch (error) {
      console.error("Error active account:", error);
      toast({
        variant: "destructive",
        title: "Failed to active account",
        description: "Unable to active the account user.",
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
                {user.status == 3 ? (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="borderPrimary"
                        icon={<Check className="w-4 h-4" />}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to active this account?
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleUpdateStatusActive(user.id!)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                ) : (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="borderDanger"
                        icon={<X className="w-4 h-4" />}
                      />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to deactivated this account?
                        </AlertDialogTitle>
                        <AlertDialogDescription></AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleUpdateStatusDestructive(user.id!)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableDetailUser;
