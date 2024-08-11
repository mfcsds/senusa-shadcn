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
import { handleLogout } from "@/utils/auth/authUtils";
import { useRouter } from "next/navigation";

import { signOut } from "aws-amplify/auth";

const Sidebar = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await signOut();
      router.push("/login");
      console.log("log out");
    } catch (error) {
      console.log("gagal log out");
    }
  };
  return (
    <div className="flex flex-col w-[270px] min-w-[100px] border-r min-h-screen ml-5  ">
      <h1 className="mt-5 font-extrabold text-xl text-violet-800">Senusa</h1>
      <DividerHorizontalIcon></DividerHorizontalIcon>
      <div className="flex flex-col">
        <MenuHeading title="Stats"></MenuHeading>
        <MenuItems title="Dashboard" Icon={LayoutDashboard}></MenuItems>

        <MenuHeading title="Accounts"></MenuHeading>
        <MenuItems
          title="Manage Accounts"
          Icon={User}
          path="/dashboard/manageaccount/"
        ></MenuItems>

        <MenuHeading title="Patients"></MenuHeading>
        <MenuItems
          title="Manage Patients"
          Icon={PersonStanding}
          path="/dashboard/managepatient/"
        ></MenuItems>

        <MenuHeading title="Variant Analysis"></MenuHeading>
        <MenuItems
          title="Variant Report"
          Icon={Dna}
          path="/dashboard/variantreport/"
        ></MenuItems>
        <MenuItems
          title="Variant Query"
          Icon={TextSearch}
          path="/dashboard/variantquery/"
        ></MenuItems>
        <MenuItems
          title="Variant Library"
          Icon={SquareLibrary}
          path="/dashboard/variantlibrary"
        ></MenuItems>
        <DividerHorizontalIcon></DividerHorizontalIcon>
      </div>

      <div className="mt-auto">
        <MenuHeading title="Settings"></MenuHeading>
        <MenuItems title="Subscription" Icon={Gem}></MenuItems>
        <MenuItems title="Manuals" Icon={CircleHelp} />
        <MenuItems onClick={handleLogout} title="Log Out" Icon={LogOut} />
      </div>
    </div>
  );
};

export default Sidebar;
