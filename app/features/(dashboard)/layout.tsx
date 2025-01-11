import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/update/ui/Sidebar";
import { AppSidebar } from "@/components/update/common/Sidebar";
import Navbar from "@/components/update/common/Navbar";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <div
      className={`flex h-screen overflow-hidden w-screen`}
    >
      <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <div className="flex flex-col w-full h-full overflow-y-auto bg-background">
        <Navbar/>
        <main className="fl ex justify-start items-start m-1">{children}</main>
      </div>
      </SidebarProvider>
    </div>
 
  );
}
