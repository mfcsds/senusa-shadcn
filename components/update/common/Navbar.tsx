"use client";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/update/ui/Switch";
import { Mail, LogOut, RectangleEllipsis } from "lucide-react";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { SidebarTrigger } from "@/components/update/ui/Sidebar";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "aws-amplify/auth";
import { signOut } from "aws-amplify/auth";
import { getUser } from "@/src/graphql/queries";
import { User } from "@/src/API";
import { generateClient } from "aws-amplify/api";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [userRole, setUserRole] = useState("");
  const [user, setUser] = useState<User>();
  const [hasFetched, setHasFetched] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };
  const client = generateClient();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/features/login");
      console.log("log out");
    } catch (error) {
      console.log("gagal log out");
      console.log(error);
    }
  };

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

  return (
    <div className="sticky top-0 z-50 flex justify-between shadow-md px-4 w-full items-center py-4 bg-foreground">
      <div className="flex">
        <SidebarTrigger className="text-text-primary hover:bg-foreground hover:text-primary"/>
        <h1 className="text-lg font-semibold ml-4 text-primary">
          Software Penilaian Gen Nusantara
        </h1>
      </div>
      <div className="flex items-center gap-4 cursor-pointer">
        <div className="flex gap-2 items-center">
          <Switch className="h-4 w-10"></Switch>
        </div>
        <DividerVerticalIcon className="text-text-primary" />
        <div className="relative">
          <div className="flex items-center gap-2" onClick={toggleDropdown}>
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="hidden lg:block text-sm text-text-secondary">
            {user?.email ?? "No Email"}
            </p>
          </div>
          {dropDownOpen && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-foreground border rounded shadow-xl z-50">
              <a className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-accent">
                <Mail className="mr-2 w-4 h-4 text-primary" />
                Profile
              </a>
              <a className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-accent">
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
      </div>
    </div>
  );
};

export default Navbar;
