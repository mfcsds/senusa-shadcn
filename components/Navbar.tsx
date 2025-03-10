"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "./ui/switch";
import { generateClient } from "aws-amplify/api";

import { DividerVerticalIcon } from "@radix-ui/react-icons";
import ProfileUserNavbar from "./ProfileUserNavbar";
import BNotifications from "./button/BNotifications";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  return (
    <div className="flex flex-row-reverse justify-between  shadow-md px-10 w-full items-center py-4 cursor-pointer gap-3">
      <div className="flex flex-row-reverse">
        <div className="flex gap-2 items-center">
          <p className="ml-2 text-gray-500 text-[10px]">Dark Mode</p>
          <Switch className="h-2"></Switch>
        </div>
        <DividerVerticalIcon></DividerVerticalIcon>
        <ProfileUserNavbar></ProfileUserNavbar>
        <BNotifications></BNotifications>
      </div>
      <SidebarTrigger className="w-10 h-10" />
      {/* <div className="relative">
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
      </div> */}
    </div>
  );
};

export default Navbar;
