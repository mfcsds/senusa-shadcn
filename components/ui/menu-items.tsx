"use client";
import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
interface MenuItemsProps {
  title: string;
  Icon: LucideIcon;
  path?: string;
  onClick?: () => void | Promise<void>;
}

const MenuItems: React.FC<MenuItemsProps> = ({
  title,
  Icon,
  path,
  onClick,
}) => {
  const router = useRouter();

  const handleNavigation = () => {
    if (path) {
      const navigateTo = async (path: string) => {
        router.push(path);
      };
      navigateTo(path);
      console.log(path);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleNavigation}
      className="flex flex-row hover:bg-violet-300 py-3 p-2 rounded-sm alignment-left cursor-pointer items-center"
    >
      <Icon className="mr-2 w-5 h-5 group hover:text-white" />
      <p className="text-[14px] font-semibold text-slate-800">{title}</p>
    </div>
  );
};

export default MenuItems;
