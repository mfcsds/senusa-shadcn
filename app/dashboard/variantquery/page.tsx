import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { Search } from "lucide-react";

const VariantQuery = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-col">
        <div className="mb-10">
          <p className="text-2xl">Type the Variant</p>
          <p className="text-gray-400 text-sm">
            Keep up to date for the new variant
          </p>
        </div>
        <div className="grid grid-cols-4 gap-4 items-center">
          <div className="col-span-3">
            <Input
              type="text"
              className="border-slate-300 border-2 shadow h-[50px] hover:none"
              placeholder="Type e.g c.388T>C"
            ></Input>
          </div>
          <div>
            <Button
              variant="outline"
              className="hover:bg-violet-800 hover:text-white"
            >
              <small>
                <Search className="w-4 h-5"></Search>
              </small>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantQuery;
