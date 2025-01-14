"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "../../ui/switch";
import { Mail, LogOut, RectangleEllipsis } from "lucide-react";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { SidebarTrigger } from "@/components/update/ui/Sidebar";
import { useRouter } from "next/navigation";

import { signOut } from "aws-amplify/auth";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      // router.push("/login");
      router.push("/");
      console.log("log out");
    } catch (error) {
      console.log("gagal log out");
      console.log(error);
    }
  };

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
              user@example.com
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
