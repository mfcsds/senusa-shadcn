"use client";

import React, { useState, useEffect } from "react";
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
import { User, UserNotifications } from "@/src/API";

import { getCurrentUser } from "aws-amplify/auth";

import { generateClient } from "aws-amplify/api";
import { listUserNotifications, getUser } from "@/src/graphql/queries";
import NotificationItem from "../items/notifications/NotificationItem";

interface BNotificationsProops {
  user: User;
}

const BNotifications = () => {
  const client = generateClient();

  const [user, setUser] = useState<User>();
  const [username, setUsername] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [open, setOpen] = useState(false);

  const [numberNewNotif, setNumberNofitications] = useState(0);
  const [listOfNotification, setListOfNotification] = useState<
    UserNotifications[]
  >([]);

  const getUserProfile = async () => {
    try {
      const result = client.graphql({
        query: getUser,
        variables: { id: username },
      });
      setUser((await result).data.getUser as User);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const currentAuthenticatedUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      await setUsername(username);
      await getUserProfile();
    } catch (err) {
      console.log(err);
    } finally {
      setHasFetched(true);
    }
  };
  useEffect(() => {
    if (!hasFetched) {
      currentAuthenticatedUser();
    }
  });
  useEffect(() => {
    fetchNotification();
  }, [user?.id]);

  const fetchNotification = async () => {
    if (user?.id) {
      console.log("Fetching user notification");
      try {
        const result = client.graphql({
          query: listUserNotifications,
          variables: { filter: { user_id: { eq: user.id } } },
        });
        setListOfNotification(
          (await result).data.listUserNotifications.items as UserNotifications[]
        );
      } catch (error) {}
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"ghost"}>
            <BellRing className="w-6 h-6 text-gray-500"></BellRing>
            <Badge
              variant="secondary"
              className="h-5 w-5 rounded-full text-[0.75rem] bg-red-600 text-white justify-center flex p-2 hover:text-white hover:bg-red-600"
            >
              {listOfNotification.length}
            </Badge>
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              {`List of Notification ${listOfNotification.length}`}{" "}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 overflow-y-auto h-[400px]">
            {listOfNotification.length <= 0
              ? "No Data"
              : listOfNotification.map((item) => (
                  <NotificationItem
                    key={item.id}
                    notifItem={item}
                    onCloseDialog={() => setOpen(false)}
                  ></NotificationItem>
                ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BNotifications;
