import React from "react";

import TableReportList from "./TableReportList";
import { VariantReportData } from "@/utils/object";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader } from "../ui/card";

const TableVariantReport = () => {
  return (
    <div className="w-full">
      <Tabs defaultValue="variant report " className="h-[20px]">
        <TabsList>
          <TabsTrigger value="draft" className="w-[200px]">
            Draft
          </TabsTrigger>
          <TabsTrigger value="process" className="w-[200px]">
            In Process
          </TabsTrigger>
          <TabsTrigger value="approve" className="w-[200px]">
            Waiting for Approval
          </TabsTrigger>
          <TabsTrigger value="completed" className="w-[200px]">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="draft">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <TableReportList></TableReportList>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="process">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <TableReportList></TableReportList>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="approve">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <TableReportList></TableReportList>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="completed">
          <Card>
            <CardHeader></CardHeader>
            <CardContent>
              <TableReportList></TableReportList>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TableVariantReport;
