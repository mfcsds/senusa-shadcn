"use client";
import React, { useEffect, useState } from "react";
import { Switch } from "@/components/update/ui/Switch";
import { DividerVerticalIcon } from "@radix-ui/react-icons";
import { SidebarTrigger } from "@/components/update/ui/Sidebar";
import ProfileUserNavbar from "@/components/update/profile/ProfileUserNavbar";
import ButtonNotifications from "@/components/update/button/ButtonNotifications";

const Navbar = () => {
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
        <ProfileUserNavbar></ProfileUserNavbar>
        <ButtonNotifications></ButtonNotifications>
      </div>
    </div>
  );
};

export default Navbar;
