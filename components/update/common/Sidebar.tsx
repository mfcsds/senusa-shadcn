"use client"; 

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation"; 
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
  HospitalIcon,
  Info,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/update/ui/Sidebar";
import { useRouter } from "next/navigation";
import {
  PATH_MANAGE_INSTITUTIONS,
  PATH_DASHBOARD,
  PATH_MANAGE_PATIENT,
  PATH_MANAGE_USERS,
  PATH_VARIANT_LIBRARY,
  PATH_VARIANT_QUERY,
  PATH_VARIANT_REPORT,
  ROLE_ADMIN_LAB,
  ROLE_BIOINFORMATICIAN,
  ROLE_GENETICS_CONCELOR,
  ROLE_HEADLAB,
  ROLE_SUPER_ADMIN,
  ROLE_USER_LAB,
} from "@/utils/Contanst";
import { fetchUserAttributes } from "aws-amplify/auth";

const settings = [
  { title: "Subscription", url: "#", icon: Gem },
  { title: "About", url: "#", icon: Info },
  { title: "Manuals", url: "#", icon: CircleHelp },
  { title: "Logout", url: "#", icon: LogOut },
];

const generals = [
  { title: "Dashboard", url: "#", icon: LayoutDashboard },
  { title: "Manage Accounts", url: "/features/manage-accounts", icon: User },
  {
    title: "Manage Patients",
    url: "/features/manage-patients",
    icon: PersonStanding,
  },
  { title: "Variant Report", url: "/features/variant-report", icon: Dna },
  { title: "Variant Query", url: "/features/variant-query", icon: TextSearch },
  { title: "Variant Library", url: "/features/variant-library", icon: SquareLibrary },
];

export function AppSidebar() {
  const currentPath = usePathname();
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
      title: "Manage Institutions",
      roles: [ROLE_SUPER_ADMIN],
      icon: HospitalIcon,
      path: PATH_MANAGE_INSTITUTIONS,
    },
    {
      title: "Manage Users",
      roles: [ROLE_ADMIN_LAB, ROLE_HEADLAB],
      icon: User,
      path: PATH_MANAGE_USERS,
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
      icon: TextSearch,
      path: PATH_VARIANT_QUERY,
    },
    {
      title: "Variant Library",
      roles: [ROLE_BIOINFORMATICIAN, ROLE_GENETICS_CONCELOR, ROLE_HEADLAB],
      icon: SquareLibrary,
      path: PATH_VARIANT_LIBRARY,
    },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <div className="flex justify-start p-4">
          <img
            src="/logo-senusa.png"
            alt="Logo"
            className="w-12 h-auto object-contain"
          />
          <SidebarGroupLabel className="text-4xl font-bold text-primary mt-8">
            enusa
          </SidebarGroupLabel>
        </div>
        <SidebarGroup>
          <SidebarMenu>
          {list_menu
                .filter((menu) => roles && menu.roles.includes(roles))
                .map((item) => (
              <SidebarMenuItem key={item.title} className="mb-2">
                <SidebarMenuButton
                  asChild
                  className="hover:bg-accent hover:text-text-primary"
                  onClick={() => navigateTo(item.path)}
                >
                  <a
                    href={item.path}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      currentPath === item.path
                        ? "bg-primary text-text-action"
                        : "text-text-primary"
                    }`}
                  >
                    <item.icon
                      className={
                        currentPath === item.path
                          ? "text-text-action"
                          : "text-primary"
                      }
                    />
                    <span className="font-semibold">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarGroupLabel className="text-text-secondary">
          Settings
        </SidebarGroupLabel>
        <SidebarMenu>
          {settings.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className="hover:bg-accent hover:text-text-primary"
              >
                <a
                  href={item.url}
                  className={`flex items-center space-x-2 p-2 rounded-lg ${
                    currentPath === item.url
                      ? "bg-primary text-foreground"
                      : "text-text-primary"
                  }`}
                >
                  <item.icon
                    className={
                      currentPath === item.url
                        ? "text-foreground"
                        : "text-primary"
                    }
                  />
                  <span className="font-semibold">{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
