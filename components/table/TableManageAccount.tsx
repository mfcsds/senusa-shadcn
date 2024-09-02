"use client";
import React, { useState, useEffect } from "react";
import graphqlOperation, { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/api";
import { listInstitutions } from "@/src/graphql/queries";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import InstitutionItems from "@/components/items/InstitutionItems";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";

import config from "@/src/amplifyconfiguration.json";
import { Institution } from "@/utils/object";
Amplify.configure(config);

const TableManageAccount = () => {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loadings, setLoadings] = useState(true);

  const client = generateClient();
  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const result = await client.graphql({ query: listInstitutions });
        setInstitutions(result.data.listInstitutions.items as Institution[]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadings(false);
      }
    };
    fetchInstitution();
  }, []);

  const router = useRouter();
  const handleEditInstitutionButton = (path: string) => {
    router.push(path);
    console.log("Click Edit");
  };

  // console.log(institutions.at(0).);

  return (
    <div className="w-full border-none flex flex-col-reverse overflow-x-auto">
      {loadings && (
        <p className="text-gray-500 text-center p-10 text-2xl">
          Fetching Data...
        </p>
      )}
      <Table className="overflow-x-visible">
        <TableHeader>
          <TableRow className="text-xs">
            <TableHead className="w-[600px]">Name</TableHead>
            <TableHead className="w-[400px]">Address</TableHead>
            <TableHead>Subscription Type</TableHead>
            <TableHead className="w-[400px]">Cur-User Quota</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Quotas</TableHead>
            <TableHead>Storage Quota</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Account Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-xs">
          {institutions.map((institution) => (
            <TableRow
              key={institution.id}
              className="hover:text-white hover:bg-violet-900"
            >
              <TableCell>
                <InstitutionItems
                  id={institution.id}
                  name={institution.name}
                ></InstitutionItems>
              </TableCell>
              <TableCell>{institution.address || ""}</TableCell>
              <TableCell>{institution.subscription_type || ""}</TableCell>
              <TableCell>{institution.currentUserQuota}</TableCell>
              <TableCell>{institution.email || ""}</TableCell>
              <TableCell>{institution.userQuotas || ""}</TableCell>
              <TableCell>{institution.storageQuota || ""}</TableCell>
              <TableCell>
                {new Date(institution.registrationDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(institution.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={`px-3 items-center ${
                    institution.accountStatus ? "bg-green-200" : "bg-red-200"
                  }`}
                >
                  {institution.accountStatus ? "Active" : "Inactive"}
                </Badge>
              </TableCell>
              <TableCell className="text-center">
                <div className="flex items-center">
                  <Button variant="ghost" className="group hover:bg-violet-800">
                    <span>
                      <Trash className="group-hover:text-white w-3 h-3 " />
                    </span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="group hover:bg-violet-800"
                    onClick={(e) =>
                      handleEditInstitutionButton(
                        "/dashboard/manageaccount/manageinstitution/"
                      )
                    }
                  >
                    <span>
                      <Pencil className="w-3 h-3 group-hover:text-white" />
                    </span>
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableManageAccount;
