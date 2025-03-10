"use client";
import React, { useEffect, useState } from "react";
import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getUser } from "@/src/graphql/queries";
import { User } from "@/src/API";
import { generateClient } from "aws-amplify/api";

const ProfileUserNavbar = () => {
  const client = generateClient();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [user, setUser] = useState<User>();

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
      const user = await getCurrentUser();
      const attributes = await fetchUserAttributes();
      const role = attributes["custom:roles"];

      await setUsername(user.username);
      await setUserRole(role ?? "");
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
  return (
    <div className="relative">
      <div className="flex flex-row gap-5 items-center justify-center">
        <Avatar onClick={toggleDropdown} className="w-12 h-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-lg font-semibold">{user?.first_name ?? "No"}</p>
          <p className="text-lg font-extralight text-gray-500">
            {user?.role ?? "No Data"}
          </p>
        </div>
      </div>

      {dropDownOpen && (
        <div className="absolute right-20 w-48 mt-2 py-2 bg-white border border-gray-200 rounded shadow-xl transform translate-x-1/2">
          <a className="block px-4 py-2 text-sm text-gray hover:bg-gray-100">
            Profile
          </a>
          <a className="block px-4 py-2 text-sm text-gray hover:bg-gray-100">
            Change Password
          </a>
        </div>
      )}
    </div>
  );
};

export default ProfileUserNavbar;
