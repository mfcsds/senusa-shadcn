"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import TableUserAccount from "../table/TableUserAccount";
import ProfileInstitution from "./ProfileInstitution";

import { getInstitution } from "@/src/graphql/queries";

import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

import { generateClient } from "aws-amplify/api";
import { Institution } from "@/utils/object";

Amplify.configure(config);

interface ManageInstituionDataProops {
  id: string | null;
}

const ManageInstituionData: React.FC<ManageInstituionDataProops> = ({ id }) => {
  const [institutionItem, setInstitutionItem] = useState<Institution>();
  useEffect(() => {
    const retrieveInst = async () => {
      try {
        const client = generateClient();
        const result = await client.graphql({
          query: getInstitution,
          variables: { id: id ?? "" },
        });
        const newInstitutionItems = result.data.getInstitution as Institution;
        setInstitutionItem(newInstitutionItems);
        console.log("Sucessfull retrive Data");
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      retrieveInst();
    }
  }, [id]);

  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>{institutionItem?.name ?? "Ada"}</CardTitle>
        <CardDescription>Manage and Detail Account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="Profile">
          <TabsList defaultValue="Profile">
            <TabsTrigger value="Profile" className="w-[200px]">
              Profile
            </TabsTrigger>
            <TabsTrigger value="Account" className="w-[200px]">
              User Account
            </TabsTrigger>
            <TabsTrigger value="Invoices" className="w-[200px]">
              Invoices
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Profile">
            <ProfileInstitution id={id}></ProfileInstitution>
          </TabsContent>
          <TabsContent value="Account">
            <TableUserAccount></TableUserAccount>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ManageInstituionData;
