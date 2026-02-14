import React from 'react';


interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export function Tooltip({ children, text}: TooltipProps) {
  return (
    <div className='relative group'>
      {children}
      <span
        role='tooltip'
        className='text-(--secondary) opacity-0 translate-y-4
                   group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-in-out
                   pointer-events-none  z-10'
      >{text}</span>
    </div>
  );
}