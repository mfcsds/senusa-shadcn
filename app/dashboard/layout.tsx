import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import { Amplify } from "aws-amplify";
import config from "@/src/amplifyconfiguration.json";

// function AmplifyConfiguration() {
//   Amplify.configure(config);
// }

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Senusa-App",
  description: "Software Penilaian Gen untuk Bangsa",
};

Amplify.configure(config);
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${inter.className} flex h-screen overflow-hidden w-screen`}
    >
      <Sidebar />
      <div className="flex flex-col w-full h-full overflow-y-auto">
        <Navbar />
        <main className="flex justify-start items-start m-5 ">{children}</main>
      </div>
    </div>
  );
}
