
import React from 'react'

interface MenuHeadingProps {
    title:string;
}

const MenuHeading: React.FC<MenuHeadingProps> = ({title}) => {
  return (
    <div className='flex text-[10px] text-slate-500 font-semibold'>
      <p>{title}</p>
    </div>
  )
}

export default MenuHeading
