"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/update/ui/card";
import { Progress } from "@/components/update/progress/Progress";
import Button from "@/components/update/button/Button";
import { HospitalIcon } from "lucide-react";
import { Institution } from "@/utils/object";
import { useRouter } from "next/navigation";
import { removeInstitution, fetchInstitutions, removeUserByInstitutionId, fetchUserByInstitutionId } from "@/hooks/useAccounts";
import { useToast } from "@/components/ui/use-toast";
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

interface CardViewProps {
  intialInstitution: Institution[];
}

const CardView: React.FC<CardViewProps> = ({ intialInstitution }) => {
  const [institutionList, setInstitutionsList] =
    useState<Institution[]>(intialInstitution);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const data = await fetchUserByInstitutionId(id);
      console.log(data);
      console.log(id);
      await removeInstitution(id);
      // for (const user of data) {
      //   await removeUserByInstitutionId(user.id);
      //   console.log("Removed user from institution");
      // }
      const updateInstitution = await fetchInstitutions();
      setInstitutionsList(updateInstitution);
      toast({
        title: "Delete Successfully",
        description: "Account Institutions has been deleted successfully.",
      });
    } catch (error) {
      console.error("Error deleting patient:", error);
      toast({
        variant: "destructive",
        title: "Failed to delete patient",
        description: "Unable to delete the account Institutions.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {institutionList.map((institution) => (
        <Card key={institution.id}>
          <CardHeader>
            <div className="flex items-center mb-4">
              <HospitalIcon className="w-10 h-10 text-primary" />
              <div className="ml-4">
                <CardTitle className="text-lg font-semibold text-text-primary">
                  {institution.name}
                </CardTitle>
                <CardDescription className="text-text-secondary text-sm">
                  {institution.id}
                </CardDescription>
                <div className="border-2 text-primary border-primary px-2 py-1 rounded-lg text-sm w-auto text-center mt-3">
                  {institution.accountStatus ? "Active" : "Inactive"}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <h2 className="text-sm text-text-primary font-nostalgic">
                Subscription Type
              </h2>
              <p className="text-text-secondary text-sm font-semibold">
                {institution.subscription_type} Months
              </p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-text-primary font-nostalgic">
                Storage Quota
              </p>
              <p className="text-text-secondary text-sm font-semibold">
                {institution.currentStorageQuota} / {institution.storageQuota}{" "}
                GB
              </p>
            </div>
            <Progress
              value={
                (institution.currentStorageQuota /
                  institution.currentStorageQuota) *
                100
              }
              className="w-full"
            />
          </CardContent>
          <CardFooter className="flex justify-end mt-2 mb-2 gap-4">
            <Button
              label="View"
              variant="outlineSecondary"
              size="medium"
              onClick={() =>
                router.push(`/features/manage-accounts/${institution.id}`)
              }
            />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outlineDanger" label="Delete" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Are you sure you want to delete this account Institutions?
                  </AlertDialogTitle>
                  <AlertDialogDescription></AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => handleDelete(institution.id!)}
                  >
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default CardView;
