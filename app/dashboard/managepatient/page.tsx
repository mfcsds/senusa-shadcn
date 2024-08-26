"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import TableManagePatient from "@/components/table/TableManagePatient";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Page = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <Card className="w-full h-full">
      <CardHeader>
        <CardTitle>Manage Patients</CardTitle>
        <CardDescription>
          Add, Edit, View, and Control Patient Data
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full mr-10 px-5 py-5 flex flex-col">
          <div className="flex flex-row w-full border-none">
            <TableManagePatient></TableManagePatient>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
