import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Senusa-App",
  description: "Software Penilaian Gen untuk Bangsa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`${inter.className} flex h-screen`}>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Navbar />
        <main className="px-10 py-10 flex flex-col items-center w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
