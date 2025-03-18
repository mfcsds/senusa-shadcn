"use client";

import React, { useEffect, useState } from "react";
import { listUsers } from "@/src/graphql/queries";
import { SelectedVariant, User, UserNotifications } from "@/src/API";
import { generateClient } from "aws-amplify/api";
import { toast } from "../ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import {
  TableBody,
  TableHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import Profile from "../items/profile/Profile";
import { UserPlus } from "lucide-react";
import { createUserNotifications } from "@/src/graphql/mutations";

interface BInviteUserProops {
  user: User | undefined;
  variant_data?: SelectedVariant;
}

const BInviteUser: React.FC<BInviteUserProops> = ({ user, variant_data }) => {
  const [listOfUser, setListOfUser] = useState<User[]>([]);
  const client = generateClient();
  const [hasFetched, setHasFetched] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User>();

  const handleInviteUserButton = async (index: number) => {
    if (!user?.id || !listOfUser.at(index)?.id || !variant_data?.id_report) {
      console.error("Missing required parameters");
      return;
    }
    try {
      const notificationInput = {
        institutionID: user?.institutionID,
        user_id: listOfUser.at(index)?.id,
        message: `Hallo, ${
          listOfUser.at(index)?.first_name
        } ,this invitation is from ${
          user?.first_name
        } to invite you join the analysis on the report ID ${
          variant_data?.id_report
        } - ${variant_data.hgvs}`,
        id_fromuser: user?.id,
        id_report: variant_data?.id_report,
        id_patient: variant_data?.id_patient,
      };
      const addNotif = client.graphql({
        query: createUserNotifications,
        variables: { input: notificationInput },
      });
      toast({
        title: "Successfully Send Invitation",
        description: `Sucessfully sent invitation to ${
          listOfUser.at(index)?.first_name
        }`,
      });
    } catch (error) {
      console.log("error invite user", error);
    }
  };

  const fetchListOfUser = async () => {
    if (user) {
      try {
        const result = client.graphql({
          query: listUsers,
          variables: { filter: { institutionID: { eq: user.institutionID } } },
        });
        await setListOfUser((await result).data.listUsers.items as User[]);
        setHasFetched(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!hasFetched) {
      fetchListOfUser();
    }
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="border bg-green-50 border-green-600"
        >
          <UserPlus className="w-4 h-4"></UserPlus>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <p className="text-2xl">{"Notify Expert"}</p>
          </DialogTitle>
          <DialogDescription>
            <p className="text-lg text-gray-500">
              {"Invite other users to join this variant analysis report"}
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-2xl flex flex-col">
          <Table>
            <TableHeader>
              <TableHead>User</TableHead>

              <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
              {listOfUser.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Profile user={item}></Profile>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={"ghost"}
                      className="border"
                      onClick={(e) => handleInviteUserButton(index)}
                    >
                      <small>
                        <UserPlus className="h-4 w-4"></UserPlus>
                      </small>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BInviteUser;
