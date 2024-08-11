import React from "react";
import TabsVariantReport from "@/components/table/TabsVariantReport";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const VariantReport = () => {
  return (
    <div className="mr-10 px-5 py-5 flex flex-col bg-grey-300 w-full">
      <div className="flex flex-row-reverse mb-5">
        <Button
          className="hover:text-white hover:bg-violet-800"
          variant="secondary"
        >
          <span>
            <Plus className="w-3 h-3 mr-2"></Plus>
          </span>{" "}
          Create Variant Report
        </Button>
      </div>
      <div className="flex flex-row mb-10">
        <TabsVariantReport></TabsVariantReport>
      </div>
    </div>
  );
};

export default VariantReport;
