"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import Button from "@/components/update/button/Button";
import {
  HospitalIcon,
  UserRoundPlus,
  Mail,
  User,
  Phone,
  ArrowLeft,
  Info,
  CheckCheck,
  FileText,
  Server,
  Eye,
  ArrowDownToLine,
  CircleDollarSign,
  UserRoundCheck,
} from "lucide-react";
import { Progress } from "@/components/update/progress/Progress";
import CreateUserDialog from "@/components/update/detailAccount/CreateUserDialog";
import TableDetailUser from "@/components/update/detailAccount/TableDetailUser";
import { fetchDetailInstitution } from "@/hooks/useAccounts";
import { Institution, DataUser } from "@/utils/object";
import Spinner from "@/components/update/ui/Spinner";
import { fetchUserByInstitutionId } from "@/hooks/useAccounts";
import { updateAccountUser } from "@/hooks/useAccounts";
import { useToast } from "@/components/ui/use-toast";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function DetailAccountsPage({ params }: PageProps) {
  const [id, setId] = useState<string | null>(null);
  const router = useRouter();
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [listUsers, setListUsers] = useState<DataUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
const { toast } = useToast();

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await params;
        if (resolvedParams.id) {
          setId(resolvedParams.id);
        } else {
          console.error("Patient ID is not available in params.");
        }
      } catch (error) {
        console.error("Failed to resolve params:", error);
      }
    };
    resolveParams();
  }, [params]);

  const fetchLoadAccountsUsers = async (): Promise<void> => {
    const loadInstitutions = async () => {
      try {
        setLoadingUsers(true);
        const data = await fetchUserByInstitutionId(id!);
        setListUsers(data);
        console.log("Daftar list account user", data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoadingUsers(false);
      }
    };

    loadInstitutions();
  };

  useEffect(() => {
    if (!id) return;

    const loadInstitutions = async () => {
      try {
        setLoading(true);
        const data = await fetchDetailInstitution(id);
        setInstitutions(data);
        fetchLoadAccountsUsers();
      } catch (error) {
        console.error("Error loading institutions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInstitutions();
  }, [id]);

  

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="mb-4 sm:mb-0">
          <div className="flex">
            <Button
              variant="iconPrimary"
              size="large"
              icon={<ArrowLeft className="w-8 h-8" />}
              onClick={() => {
                router.push(`/features/manage-institutions`);
              }}
            />
            <h1 className="text-2xl font-semibold text-text-primary">
              Manage and Detail Account
            </h1>
            <Button
              variant="iconSecondary"
              size="large"
              icon={<Info className="w-6 h-6" />}
            />
          </div>
        </div>

        <CreateUserDialog
          onUpdateAccountsUser={fetchLoadAccountsUsers}
          institution_id={id!}
        />
      </div>

      {loading ? (
        <Spinner />
      ) : (
        //   <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
        //   Loading
        // </p>
        institutions.map((institution) => (
          <div
            key={institution.id}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            <div className="bg-foreground shadow rounded-lg p-6 space-y-4">
              <div className="flex items-start space-x-6 p-2">
                <div>
                  <HospitalIcon className="text-primary w-14 h-16" />
                </div>
                <div className="space-y-1">
                  <h2 className="font-bold text-lg text-text-primary">
                    {institution.name}
                  </h2>
                  <p className="text-sm text-text-secondary">
                    {institution.id}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {institution.address}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <User className="text-blue-primary w-6 h-6" />
                  <p className="font-medium text-text-primary">
                    {institution.contactname}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="text-blue-primary w-6 h-6" />
                  <p className="font-medium text-text-primary">
                    {institution.email}
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-blue-primary w-6 h-6" />
                  <p className="font-medium text-text-primary">
                    {institution.contactphone}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-foreground shadow rounded-lg p-6 space-y-12">
              <div className="flex items-start space-x-4">
                <div>
                  <CircleDollarSign className="text-blue-primary w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    Subscription Type
                  </h3>
                  <p className="text-md text-text-secondary">
                    {institution.subscription_type} Months
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div>
                  <UserRoundPlus className="text-blue-primary w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    Number of User Quotas
                  </h3>
                  <p className="text-md text-text-secondary">
                    {institution.userQuotas} users
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div>
                  <UserRoundCheck className="text-blue-primary w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium text-text-primary">
                    Current Number of User
                  </h3>
                  <p className="text-md text-text-secondary">
                    {institution.currentUserQuota} users
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="bg-foreground shadow rounded-lg p-4 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <CheckCheck className="text-blue-primary w-8 h-8" />
                  <span className="font-medium text-text-secondary">
                    Status
                  </span>
                </div>
                <div className="border-2 text-primary border-primary px-6 py-1 rounded-lg text-sm">
                  {institution.accountStatus ? "Active" : "Inactive"}
                </div>
              </div>

              <div className="bg-foreground shadow rounded-lg p-4 flex justify-between items-center relative">
                <div className="flex items-center space-x-4">
                  <FileText className="text-blue-primary w-8 h-8" />
                  <span className="font-medium text-text-secondary">
                    Invoices
                  </span>
                </div>

                <div className="flex space-x-2 md:space-x-4 absolute md:relative bottom-4 right-4 md:bottom-auto md:right-auto">
                  <Button
                    variant="borderSecondary"
                    size="small"
                    icon={<Eye className="w-4 h-4" />}
                  />
                  <Button
                    variant="borderDanger"
                    icon={<ArrowDownToLine className="w-4 h-4" />}
                  />
                </div>
              </div>

              <div className="bg-foreground shadow rounded-lg p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center w-full md:w-auto mt-4 md:mt-0">
                  <div className="flex flex-col w-full">
                    <div className="flex items-center space-x-4">
                      <Server className="text-blue-primary w-8 h-8" />
                      <div className="flex w-full justify-between">
                        <span className="font-medium text-text-secondary">
                          Storage Quota
                        </span>
                        <p className="text-lg text-text-primary font-semibold ml-auto">
                          {institution.storageQuota} GB
                        </p>
                      </div>
                    </div>
                    <div className="items-center w-full pt-4">
                      <Progress
                        value={
                          (institution.currentStorageQuota /
                            institution.currentStorageQuota) *
                          100
                        }
                        className="w-full md:w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {loading ? (
        <p className="text-lg text-center mt-10 text-primary font-semibold animate-pulse">
          Loading
        </p>
      ) : (
        <TableDetailUser listUsers={listUsers} />
      )}
    </div>
  );
}
