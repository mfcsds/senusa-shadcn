"use client";

import React, { useState, useEffect } from "react";
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
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900">Notifications</h1>
        <h2 className="text-lg text-gray-600">{`You have ${listOfNotification.length} notifications`}</h2>
      </div>

      <div className="w-full max-w-[1000px] p-6">
        {listOfNotification.length === 0 ? (
          <p className="text-center text-gray-500">No Notifications</p>
        ) : (
          <div className="space-y-4">
            {listOfNotification.map((item) => (
              <NotificationItem
                key={item.id}
                notifItem={item}
                onCloseDialog={() => setOpen(false)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ButtonNotifications;
