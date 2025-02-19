"use client";

import React, { useEffect, useState } from "react";
import { listUsers } from "@/src/graphql/queries";
import { User, UserNotifications } from "@/src/API";
import { generateClient } from "aws-amplify/api";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import Button from "@/components/update/button/Button";
import { ButtonAdd } from "@/components/update/button/ButtonAdd";
import {
  TableBody,
  TableHeader,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from "../ui/table";
import ProfileAddUser from "@/components/update/profile/ProfileAddUser";
import { UserPlus } from "lucide-react";
import { createUserNotifications } from "@/src/graphql/mutations";
import { SelectedVariant } from "@/utils/object";

interface ButtonInviteUserProops {
  user: User | undefined;
  variant_data?: SelectedVariant;
}

const ButtonInviteUser: React.FC<ButtonInviteUserProops> = ({
  user,
  variant_data,
}) => {
  const [listOfUser, setListOfUser] = useState<User[]>([]);
  const client = generateClient();
  const [hasFetched, setHasFetched] = useState(false);
  const { toast } = useToast();

  const handleInviteUserButton = async (index: number) => {
    if (!user?.id || !listOfUser.at(index)?.id || !variant_data?.id_report) {
      console.error("Missing required parameters");
      return;
    }
    try {
      console.log("Invite");
      const notificationInput = {
        id: "NF-1939128391",
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
        markasread: false,
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
          variant="iconSecondary"
          size="md"
          icon={<UserPlus className="w-4 h-4" />}
        />
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            <p>{"Notify Expert"}</p>
          </DialogTitle>
          <DialogDescription>
            <p className="text-text-secondary">
              {"Invite other users to join this variant analysis report"}
            </p>
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-2xl flex flex-col">
          <Table>
            <TableHeader className="bg-accent text-text-primary">
              <TableHead>User</TableHead>

              <TableHead>Action</TableHead>
            </TableHeader>
            <TableBody>
              {listOfUser.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <ProfileAddUser user={item}></ProfileAddUser>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="borderSecondary"
                      size="medium"
                      icon={<UserPlus className="w-4 h-4" />}
                      onClick={() => handleInviteUserButton(index)}
                    />
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

export default ButtonInviteUser;
