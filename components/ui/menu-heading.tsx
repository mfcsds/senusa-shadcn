import React from "react";

interface MenuHeadingProps {
  title: string;
}

const MenuHeading: React.FC<MenuHeadingProps> = ({ title }) => {
  return (
    <div className="flex text-[13px] text-slate-500 font-semibold mt-3 ">
      <p>{title}</p>
    </div>
  );
};

export default MenuHeading;
