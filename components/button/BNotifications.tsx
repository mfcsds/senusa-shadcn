"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { BellRing } from "lucide-react";
import { Badge } from "../ui/badge";
import { User } from "@/src/API";

interface BNotificationsProops {
  user: User;
}

const BNotifications = () => {
  const [numberNewNotif, setNumberNofitications] = useState(0);
  const [listOfNotification, setListOfNotification] = useState(0);

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={"ghost"}>
            <BellRing className="w-6 h-6 text-gray-500"></BellRing>
            <Badge
              variant="secondary"
              className="h-5 w-5 rounded-full text-[0.75rem] bg-red-600 text-white justify-center flex p-2 hover:text-white hover:bg-red-600"
            >
              {2}
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">This is the body</div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BNotifications;
