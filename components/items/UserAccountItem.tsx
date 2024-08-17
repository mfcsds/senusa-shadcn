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
    <div className="flex flex-row items-center">
      <Avatar>
        <AvatarFallback className="bg-violet-900 text-white">
          {initial}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col text-left ml-3">
        <p className="text-[10px] text-black-900 text-sm">{name}</p>
        <p className="text-[10px] text-gray-500">{id}</p>
      </div>
    </div>
  );
};

export default UserAccountItem;
