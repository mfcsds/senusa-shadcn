import React from "react";
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

const ManageInstituionData = () => {
  return (
    <Card className="w-full h-screen">
      <CardHeader>
        <CardTitle>Medika Institution</CardTitle>
        <CardDescription>Manage and Detail Account</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs>
          <TabsList>
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
          <TabsContent value="Account">
            <TableUserAccount></TableUserAccount>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ManageInstituionData;
