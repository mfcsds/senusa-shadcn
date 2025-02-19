"use client";

import React, { useEffect, useState } from "react";import { Progress } from "@/components/update/progress/Progress";
import Button from "@/components/update/button/Button";
import { HospitalIcon, Eye, Trash2 } from "lucide-react";
import { Institution } from "@/utils/object"
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
import { useRouter } from "next/navigation";
import { removeInstitution, fetchInstitutions, removeUserByInstitutionId, fetchUserByInstitutionId } from "@/hooks/useAccounts";

interface ListViewProps {
  intialInstitution: Institution[];
}

const ListView: React.FC<ListViewProps> = ({ intialInstitution }) => {
  const [institutionList, setInstitutionsList] = useState<Institution[]>(intialInstitution);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
      try {
        const data = await fetchUserByInstitutionId(id);
        console.log(data);
        console.log(id);
        await removeInstitution(id);
        await Promise.all(
          data.map(async (user) => {
            await removeUserByInstitutionId(user.id);
            console.log("Removed user from institution");
          })
        );
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
    <div className="space-y-4">
      {institutionList.map((institution) => (
        <div
          key={institution.id}
          className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-foreground shadow rounded-lg relative"
        >
          <div className="flex items-center w-full md:w-auto">
            <HospitalIcon className="w-10 h-10 text-primary" />
            <div className="ml-4">
              <h2 className="text-lg font-semibold text-text-primary">
                {institution.name}
              </h2>
              <p className="text-text-secondary text-sm">{institution.id}</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mt-4 md:mt-0">
            <div className="flex flex-col w-full">
              <div className="flex">
                <p className="text-sm text-text-primary font-nostalgic mb-2">
                  Storage Quota
                </p>
                <p className="text-sm text-text-primary font-semibold ml-4">
                  {institution.currentStorageQuota} / {institution.storageQuota}GB
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <Progress
                value={(institution.currentStorageQuota / institution.currentStorageQuota) * 100}
                  className="w-full md:w-40"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mt-4 md:mt-0">
            <div className="flek">
              <h2 className="text-sm text-text-primary font-nostalgic">
                Subscription Type
              </h2>
              <p className="text-text-secondary text-sm font-semibold">
              {institution.subscription_type} Months
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mt-4 md:mt-0">
            <div className="border-2 text-primary border-primary px-4 py-1 rounded-lg text-sm">
            {institution.accountStatus ? "Active" : "Inactive"}
            </div>
          </div>

          <div className="flex mt-4 md:mt-0 space-x-2 md:space-x-4 absolute md:relative bottom-2 right-4 md:bottom-auto md:right-auto">
            <Button
              variant="outlineSecondary"
              size="small"
              icon={<Eye className="w-4 h-4" />}
            />
            <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outlineDanger"
                    icon={<Trash2 className="w-4 h-4" />}
                  />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete this account Institutions?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(institution.id!)}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListView;
