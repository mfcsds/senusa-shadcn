"use client";
import "@/app/globals.css";
import {
  LayoutDashboard,
  SquareLibrary,
  TextSearch,
  CircleHelp,
  LogOut,
  Dna,
  PersonStanding,
  User,
  Gem,
} from "lucide-react";

import React from "react";
import { DividerHorizontalIcon } from "@radix-ui/react-icons";
import MenuHeading from "./ui/menu-heading";
import MenuItems from "./ui/menu-items";

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[170px] min-w-[100px] border-r min-h-screen ml-5">
      <h1 className="mt-5 font-extrabold text-xl text-violet-800">Senusa</h1>
      <DividerHorizontalIcon></DividerHorizontalIcon>
      <div className="flex flex-col">
        <MenuHeading title="Stats"></MenuHeading>
        <MenuItems title="Dashboard" Icon={LayoutDashboard} ></MenuItems>

        <MenuHeading title="Accounts"></MenuHeading>
        <MenuItems title="Manage Accounts" Icon={User} path="/manageaccount"></MenuItems>

        <MenuHeading title="Patients"></MenuHeading>
            <MenuItems title="Manage Patients" Icon={PersonStanding}></MenuItems>

        <MenuHeading title="Variant Analysis"></MenuHeading>
            <MenuItems title="Variant Report" Icon={Dna}></MenuItems>
            <MenuItems title="Variant Query" Icon={TextSearch}></MenuItems>
            <MenuItems title="Variant Library" Icon={SquareLibrary}></MenuItems>
            <DividerHorizontalIcon></DividerHorizontalIcon>
      </div>

      <div className="mt-auto">
        <MenuHeading title="Settings"></MenuHeading>
            <MenuItems title="Subscription" Icon={Gem}></MenuItems>
            <MenuItems title="Manuals" Icon={CircleHelp} />
            <MenuItems title="Log Out" Icon={LogOut} />
      </div>
    </div>
  );
};

export default Sidebar;
