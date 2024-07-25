'use client'
import React, { useState } from 'react'
import { LucideIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
interface MenuItemsProps{
    title:string;
    Icon:LucideIcon;
    path?:string;
}

const MenuItems:React.FC<MenuItemsProps> = ({title, Icon, path}) => {
  const router = useRouter();
  
  const navigateTo = (path:string)=>{
    router.push(path);
  }
    
  return (
    <div onClick={()=> navigateTo(path||"")} className='flex flex-row hover:bg-violet-100  p-2 rounded-sm alignment-left cursor-pointer items-center'>
        <Icon className='mr-2 w-3 h-3 hover:text-white' />
        <p className='text-[12px] font-semibold text-slate-800'>{title}</p>
    </div>
  )
}

export default MenuItems
