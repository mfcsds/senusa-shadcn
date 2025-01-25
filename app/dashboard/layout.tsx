import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import ClientLayout from "./ClientLayout"; // Komponen client terpisah

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senusa-App",
  description: "Software Penilaian Gen untuk Bangsa",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Layout ini boleh mengekspor metadata karena file ini server component
  // Pastikan TIDAK ada "use client" di baris paling atas
  return (
    <div
      className={`${inter.className} flex h-screen overflow-hidden w-screen`}
    >
      <ClientLayout>
        <Sidebar />
        <div className="flex flex-col w-full h-full overflow-y-auto">
          <Navbar />
          {/* Bungkus children dengan komponen client yang cek session */}

          <main className="flex justify-start items-start m-5">{children}</main>
        </div>
      </ClientLayout>
    </div>
  );
}
