import React from "react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

const VariantAnalysisResult = () => {
  return (
    <div className="flex flex-col mt-10 gap-3">
      <div className="flex flex-row justify-between">
        <p className="font-semibold text-xs">chr3:g.14156487A-T</p>
        <Button variant={"ghost"} className="h-4 text-gray-400">
          Edit
        </Button>
      </div>
      <Textarea className="w-full"></Textarea>
    </div>
  );
};

export default VariantAnalysisResult;
