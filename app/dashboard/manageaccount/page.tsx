"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import TableManageAccount from "@/components/table/TableManageAccount";

const Page = () => {
  const router = useRouter();
  const navigateTo = (path: string) => {
    router.push(path);
  };

  return (
    <div className="mr-10 px-5 py-5 flex flex-col bg-grey-300 border">
      <div className="flex flex-row-reverse mb-5">
        <Button
          className="hover:text-white hover:bg-violet-800"
          variant="secondary"
          onClick={() => navigateTo("./manageaccount/createnewuser")}
        >
          <span>
            <Plus className="w-3 h-3 mr-2"></Plus>
          </span>{" "}
          Add New Account
        </Button>
      </div>
      <div className="flex flex-row">
        <TableManageAccount></TableManageAccount>
      </div>
    </div>
  );
};

export default Page;
