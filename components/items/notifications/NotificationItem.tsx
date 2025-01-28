"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserNotifications } from "@/src/API";
import React from "react";
import { useRouter } from "next/navigation";

interface NotificationItemProops {
  notifItem: UserNotifications;
  onCloseDialog?: () => void;
}
const NotificationItem = ({
  notifItem,
  onCloseDialog,
}: NotificationItemProops) => {
  const router = useRouter();
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <p className="text-xl font-bold">{`Variant Analysis Invitation`}</p>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex flex-row justify-between">
            <p className="text-balance text-justify text-lg text-gray-600 mr-10">
              {notifItem.message}
            </p>
            <p className="text-balance text-sm font-bold">
              {notifItem.createdAt}
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-row items-end justify-end">
          <Button
            variant={"ghost"}
            className="border"
            onClick={(e) => {
              router.push(
                `/dashboard/variantreport/editreport?id=${notifItem.id_report}&patientid=${notifItem.id_patient}`
              );
              onCloseDialog?.();
            }}
          >
            See Report
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotificationItem;
