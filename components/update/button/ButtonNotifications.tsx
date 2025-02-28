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
import { Badge } from "../ui/badge";
import { User, UserNotifications } from "@/src/API";

import { getCurrentUser } from "aws-amplify/auth";
import { generateClient } from "aws-amplify/api";
import { listUserNotifications, getUser } from "@/src/graphql/queries";
import { updateUserNotifications } from "@/src/graphql/mutations";
import NotificationItem from "@/components/update/notification/NotificationItem";

const ButtonNotifications = () => {
  const client = generateClient();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [open, setOpen] = useState(false);
  const [listOfNotification, setListOfNotification] = useState<
    UserNotifications[]
  >([]);

  useEffect(() => {
    const currentAuthenticatedUser = async () => {
      try {
        const { username } = await getCurrentUser();
        setUsername(username);
        const result = await client.graphql({
          query: getUser,
          variables: { id: username },
        });
        setUser(result.data.getUser as User);
      } catch (err) {
        console.log(err);
      } finally {
        setHasFetched(true);
      }
    };

    if (!hasFetched) {
      currentAuthenticatedUser();
    }
  }, [hasFetched]);

  useEffect(() => {
    const fetchNotification = async () => {
      if (user?.id) {
        try {
          const result = await client.graphql({
            query: listUserNotifications,
            variables: { filter: { user_id: { eq: user.id }, markasread: { eq: false } } },
          });
          const sortedNotifications =
            result.data.listUserNotifications.items.sort(
              (a: UserNotifications, b: UserNotifications) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );
          setListOfNotification(sortedNotifications);
        } catch (error) {
          console.log(error);
        }
      }
    };

    if (user?.id) {
      fetchNotification();
    }
  }, [user?.id]);

  const markNotificationAsRead = async (id: string) => {
    try {
      await client.graphql({
        query: updateUserNotifications,
        variables: {
          input: { id, markasread: true },
        },
      });
      setListOfNotification((prevNotifications) =>
        prevNotifications.filter((notif) => notif.id !== id)
      );
    } catch (error) {
      console.log("Error updating notification status", error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="flex flex-grid">
            <Button
              variant="iconSecondary"
              size="md"
              icon={<BellRing className="w-5 h-5" />}
            />
            <Badge
              variant="secondary"
              className="h-4 w-4 rounded-full text-[0.50rem] bg-red-primary text-text-action justify-center flex p-2 hover:text-text-action hover:bg-red-primary"
            >
              {listOfNotification.length}
            </Badge>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[50%] max-h-[80%] overflow-y-auto bg-foreground">
          <DialogHeader>
            <DialogTitle>Notifications</DialogTitle>
            <DialogDescription>
              <div className="flex flex-row justify-between">
                <p className="text-text-secondary">
                  {`You have ${listOfNotification.length} new notifications`}
                </p>
                <a
                  className="text-red-primary hover:text-red-secondary hover:underline"
                  href="/features/notification"
                >
                  View All Notification
                </a>
              </div>
            </DialogDescription>
          </DialogHeader>
          {listOfNotification.length <= 0 ? (
            <p className="text-text-secondary text-sm text-center mt-6">
              Nothing Notifications
            </p>
          ) : (
            listOfNotification
              // .filter((item) => item.markasread === false)
              .map((item) => (
                <NotificationItem
                  key={item.id}
                  notifItem={item}
                  onCloseDialog={() => {
                    markNotificationAsRead(item.id);
                    setOpen(false);
                  }}
                />
              ))
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ButtonNotifications;
