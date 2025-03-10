"use client";
import {
  Book,
  Diamond,
  Dna,
  Home,
  Info,
  LayoutDashboard,
  LogOut,
  PersonStanding,
  Search,
  SquareLibrary,
  User,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { signOut } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import {
  PATH_ADMIN_MANAGE_ACCOUNT,
  PATH_DASHBOARD,
  PATH_MANAGE_ACCOUNT,
  PATH_MANAGE_INSTITUTION_USER,
  PATH_MANAGE_PATIENT,
  PATH_VARIANT_LIBRARY,
  PATH_VARIANT_QUERY,
  PATH_VARIANT_REPORT,
  ROLE_ADMIN_LAB,
  ROLE_BIOINFORMATICIAN,
  ROLE_GENETICS_CONCELOR,
  ROLE_HEADLAB,
  ROLE_SUPER_ADMIN,
  ROLE_USER_LAB,
} from "@/utils/Constant";
import path from "path";

import { fetchUserAttributes, getCurrentUser } from "aws-amplify/auth";

const AppSidebar = () => {
  const router = useRouter();
  const [roles, setRoles] = useState<string | null>(null);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const attributes = await fetchUserAttributes();
        setRoles(attributes["custom:roles"] || null);
      } catch (error) {
        console.error("Error fetching user attributes", error);
      }
    };
    getUserRole();
  }, []);

  const navigateTo = async (path: string) => {
    try {
      router.push(path);
    } catch (error) {
      console.log(error);
    }
  };
  const list_menu = [
    {
      title: "Dashboard",
      roles: [
        ROLE_SUPER_ADMIN,
        ROLE_BIOINFORMATICIAN,
        ROLE_ADMIN_LAB,
        ROLE_GENETICS_CONCELOR,
        ROLE_HEADLAB,
        ROLE_USER_LAB,
      ],
      icon: LayoutDashboard,
      path: PATH_DASHBOARD,
    },
    {
      title: "Manage Costumer Accounts",
      roles: [ROLE_SUPER_ADMIN],
      icon: User,
      path: PATH_ADMIN_MANAGE_ACCOUNT,
    },
    {
      title: "Manage User Accounts",
      roles: [ROLE_ADMIN_LAB, ROLE_HEADLAB],
      icon: User,
      path: PATH_MANAGE_INSTITUTION_USER,
    },
    {
      title: "Manage Patient",
      roles: [ROLE_ADMIN_LAB, ROLE_HEADLAB, ROLE_USER_LAB],
      icon: PersonStanding,
      path: PATH_MANAGE_PATIENT,
    },
    {
      title: "Variant Report",
      roles: [ROLE_BIOINFORMATICIAN, ROLE_GENETICS_CONCELOR, ROLE_HEADLAB],
      icon: Dna,
      path: PATH_VARIANT_REPORT,
    },
    {
      title: "Variant Query",
      roles: [ROLE_BIOINFORMATICIAN, ROLE_GENETICS_CONCELOR, ROLE_HEADLAB],
      icon: Search,
      path: PATH_VARIANT_QUERY,
    },
    {
      title: "Variant Library",
      roles: [ROLE_BIOINFORMATICIAN, ROLE_GENETICS_CONCELOR, ROLE_HEADLAB],
      icon: SquareLibrary,
      path: PATH_VARIANT_LIBRARY,
    },
  ];

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
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <p className="text-lg p-2 font-bold text-violet-600">SENUSA</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {list_menu
                .filter((menu) => roles && menu.roles.includes(roles))
                .map((item) => (
                  <SidebarMenuItem
                    key={item.title}
                    className="h-10 hover:bg-violet-50 hover:border-2 hover:border-violet-800 rounded-sm items-center"
                  >
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-violet-50"
                      onClick={() => navigateTo(item.path)}
                    >
                      <a>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup className="border rounded-md p-2">
          <SidebarGroupLabel>Support</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem
                onClick={handleLogout}
                className="hover:border-2 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-700 rounded-md"
              >
                <SidebarMenuButton asChild>
                  <a>
                    <Info></Info>
                    <span>About</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={handleLogout}
                className="hover:border-2 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-700 rounded-md"
              >
                <SidebarMenuButton asChild>
                  <a>
                    <Book></Book>
                    <span>Manual</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem
                onClick={handleLogout}
                className="hover:border-2 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-700 rounded-md"
              >
                <SidebarMenuButton asChild>
                  <a>
                    <Diamond></Diamond>
                    <span>Subscription</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarMenu className="border rounded-md p-2">
          <SidebarMenuItem
            onClick={handleLogout}
            className="hover:border-2 hover:bg-violet-100 hover:text-violet-800 hover:border-violet-700 rounded-md"
          >
            <SidebarMenuButton asChild>
              <a>
                <LogOut></LogOut>
                <span>Log Out</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
