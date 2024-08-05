import React from "react";
import { Hospital } from "lucide-react";

interface InstitutionItemsProops {
  id?: string | null;
  name?: string | null;
}

const InstitutionItems: React.FC<InstitutionItemsProops> = ({ id, name }) => {
  return (
    <div className="flex flex-row items-center">
      <span className="mr-2">
        <Hospital />
      </span>
      <div className="flex flex-col text-left">
        <p className="text-[12px] text-black-900">{name}</p>
        <p className="text-[10px] text-gray-500">{id}</p>
      </div>
    </div>
  );
};

export default InstitutionItems;
