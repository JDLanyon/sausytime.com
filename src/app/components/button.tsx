'use client'

import "@/app/globals.css";


interface ButtonProps {
  text?: string;
  href?: string;
  md_invert?: boolean;
  target_blank?: boolean;
  onClick?: React.MouseEventHandler;
  children?: React.ReactNode;
}

// TODO: auto generate buttons based on existing headings


export default function Button({text, href = "#", md_invert=true, target_blank, onClick, children} : ButtonProps) {
  return (
    <div className="transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
      <a
      onClick={onClick}
      className={`flex items-center justify-center p-4 min-h-12
                 ${md_invert ? 'backdrop-invert md:backdrop-invert-0' : ''} hover:backdrop-invert
                 ${md_invert ? 'text-(--background) md:text-(--secondary)' : ''} hover:text-(--background)`}
      href={href}
      target = {target_blank ? "_blank" : ""} // really dodgy way of determining relative routes n that
      // target="_blank"
      rel="noopener noreferrer"
      >
        {text}
        {children}
      </a>
    </div>
  )
}