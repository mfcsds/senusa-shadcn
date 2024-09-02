import { Badge } from "lucide-react";
import React from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface UserAccount {
  id: string;
  name: string;
  initial: string;
}

const UserAccountItem: React.FC<UserAccount> = ({ id, name, initial }) => {
  return (
    <div className="flex flex-row items-center h-[80px]">
      <Avatar>
        <AvatarFallback className="bg-violet-900 text-white">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-left ml-3 h-2.5 justify-center">
        <p className="text-[18px] text-black-900 text-sm font-semibold">
          {name}
        </p>
        <p className="text-[16px] text-gray-500">{id}</p>
      </div>
    </div>
  );
};

export default UserAccountItem;
