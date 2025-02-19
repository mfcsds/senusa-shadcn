"use client";

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/update/dialog/Dialog";
import Button from "@/components/update/button/Button";
import { BellRing } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { User, UserNotifications } from "@/src/API";

import { getCurrentUser } from "aws-amplify/auth";

import { generateClient } from "aws-amplify/api";
import { listUserNotifications, getUser } from "@/src/graphql/queries";
import NotificationItem from "@/components/update/notification/NotificationItem";

interface ButtonNotificationsProops {
  user: User;
}

const ButtonNotifications = () => {
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
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <div className="grid items-center gap-4 mb-4 sm:mb-0">
          <h1 className="text-2xl font-semibold text-text-primary">
            Notifications
          </h1>
          <h2 className="text-xl font-semibold text-text-primary">
            {`List of Notification ${listOfNotification.length}`}{" "}
          </h2>
        </div>
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
    </div>
  );
};

export default ButtonNotifications;
