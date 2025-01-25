"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
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
      const { username, userId, signInDetails } = await getCurrentUser();
      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${signInDetails}`);
      setUsername(username);
      setUserRole(userId);
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
      <div className="flex flex-row gap-2 items-center justify-center">
        <Avatar onClick={toggleDropdown} className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm text-balance font-semibold">
            {username ?? "Muhamad Fathurahman"}
          </p>
          <p className="text-sm text-balance  font-extralight text-gray-500">
            {userRole ?? "Bioinformatician"}
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
