"use client"; // Tambahkan ini di awal file

import { usePathname } from "next/navigation"; // Gunakan usePathname
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

// Menu settings items.
const settings = [
  { title: "Subscription", url: "#", icon: Gem },
  { title: "About", url: "#", icon: Info },
  { title: "Manuals", url: "#", icon: CircleHelp },
  { title: "Logout", url: "#", icon: LogOut },
];

// Menu generals items.
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
            {generals.map((item) => (
              <SidebarMenuItem key={item.title} className="mb-2">
                <SidebarMenuButton
                  asChild
                  className="hover:bg-accent hover:text-text-primary"
                >
                  <a
                    href={item.url}
                    className={`flex items-center space-x-2 p-2 rounded-lg ${
                      currentPath === item.url
                        ? "bg-primary text-text-action"
                        : "text-text-primary"
                    }`}
                  >
                    <item.icon
                      className={
                        currentPath === item.url
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
