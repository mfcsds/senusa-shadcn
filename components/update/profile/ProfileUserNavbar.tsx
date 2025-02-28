"use client";
import React, { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/update/ui/avatar";
import { getUser } from "@/src/graphql/queries";
import { User } from "@/src/API";
import { CircleUser, LogOut, RectangleEllipsis } from "lucide-react";
import { generateClient } from "aws-amplify/api";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

const ProfileUserNavbar = () => {
  const client = generateClient();
  const router = useRouter();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [hasFetched, setHasFetched] = useState(false);
  const [userLogin, setUserLogin] = useState<User>();

  const getUserProfile = async () => {
    try {
      const result = client.graphql({
        query: getUser,
        variables: { id: username },
      });
      setUserLogin((await result).data.getUser as User);
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
      await setUsername(username);
      await setUserRole(userId);
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

  const delay = 1000; 

useEffect(() => {
  const timeout = setTimeout(() => {
    console.log("User LOGIN IS", userLogin);
    if (userLogin?.status === 3) {
      handleLogout();
    }
  }, delay);

  return () => clearTimeout(timeout); 
}, [userLogin]);

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/");
      console.log("log out");
    } catch (error) {
      console.log("gagal log out");
      console.log(error);
    }
  };
  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p className="hidden lg:block text-sm text-text-secondary">
          {userLogin?.first_name ?? ""} {userLogin?.last_name ?? ""}
        </p>
      </div>
      {dropDownOpen && (
        <div className="absolute right-0 mt-2 w-48 md:w-56 py-2 bg-foreground border rounded shadow-xl z-50">
          <div className="px-4 py-3">
            <span className="block w-full text-sm text-text-primary text-center md:text-left truncate">
              {userLogin?.email ?? "No Email"}
            </span>
            <hr className="border-t border-border my-2" />
          </div>
          <a className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-accent">
            <CircleUser className="mr-2 w-4 h-4 text-primary" />
            Profile
          </a>
          <a href="/auth/forgot-password" className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-accent">
            <RectangleEllipsis className="mr-2 w-4 h-4 text-primary" />
            Change Password
          </a>
          <button onClick={handleLogout} className="w-full">
            <a className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-accent">
              <LogOut className="mr-2 w-4 h-4 text-primary" />
              Logout
            </a>
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileUserNavbar;
