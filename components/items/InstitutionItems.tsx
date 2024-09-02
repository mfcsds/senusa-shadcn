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
        <p className="text-sm text-black-900">
          <strong>{name}</strong>
        </p>
        <p className="text-[14px]">
          <small>{id}</small>
        </p>
      </div>
    </div>
  );
};

export default InstitutionItems;
