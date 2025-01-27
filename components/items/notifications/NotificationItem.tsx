"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserNotifications } from "@/src/API";
import React from "react";

interface NotificationItemProops {
  notifItem: UserNotifications;
}
const NotificationItem = ({ notifItem }: NotificationItemProops) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{"Variant Analysis Invitation"}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-between">
          <p className="text-balance text-sm text-gray-600">
            {notifItem.message}
          </p>
          <p className="text-balance text-sm">{notifItem.createdAt}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationItem;
