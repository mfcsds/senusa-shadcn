"use client";

import Button from "@/components/update/button/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/update/ui/card";
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
          <div className="flex flex-row justify-between">
            <p className="text-lg font-semiBold text-primary">{`Variant Analysis Invitation`}</p>
            <p className="text-balance text-sm text-text-secondary">
              {notifItem.createdAt}
            </p>
            
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <p className="text-balance text-sm text-text-primary">
            {notifItem.message}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className="w-full flex flex-row items-end justify-end">
        <Button
              label="See Report"
              variant="underlineSecondary"
              className="p-0"
              size="large"
              onClick={() => {
                router.push(
                  `/features/variant-report/${notifItem.id_report}`
                );
                onCloseDialog?.();
              }}
            />
        </div>
      </CardFooter>
    </Card>
  );
};

export default NotificationItem;
