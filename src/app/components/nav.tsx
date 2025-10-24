'use client'

import { useState } from "react";
import Image from "next/image";

import "../globals.css";
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation'


function NavButton({text, href} : {text : string, href : string}) {
  if (href == usePathname()) {
    return (<a
    className="flex items-center text-[var(--primary)] font-bold"
    rel="noopener noreferrer"
  >
    {text}
  </a>);
  } {
    return (<a
    className="flex items-center hover:underline hover:underline-offset-4 text-[var(--secondary)]"
    href={href}
    rel="noopener noreferrer"
  >
    {text}
  </a>);
  }
}

function MobileMenu({ is_open, toggle } : {is_open : boolean, toggle : React.MouseEventHandler}) {
  return (
    <div
      className={`fixed flex flex-col justify-center items-center z-10 top-0 right-0 h-full w-full bg-[var(--background)]/80 transition-transform duration-300 transform ${
        is_open ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <X color="var(--secondary)" onClick={toggle} className="fixed right-8 top-8"/>
      <div className="flex flex-col justify-center items-center space-y-8">
          <NavButton text="Home" href="/" />
          <NavButton text="About" href="/about" />
          <NavButton text="Programming" href="/programming" />
          <NavButton text="Motion Graphics" href="/motion_graphics" />

        {/* Add other navigation links */}
      </div>
    </div>
  );
}



export default function Nav() {

  const [isMenuOpen, SetMenuOpen] = useState(false);
  const MenuToggle = () => {
    SetMenuOpen(!isMenuOpen);
  }

  return (
    <nav className="z-10 grid grid-cols-7 w-screen items-center justify-center text-center fixed top-0">
      {/* left side */}
      <div className="col-start-2 col-span-2 mx-auto gap-16 hidden md:relative md:flex">
        <NavButton text="Home" href="/" />
        <NavButton text="About" href="/about" />
      </div>

      {/* Lotus */}
      <a className="col-start-4 mx-auto col-300" href="/">
        <Image
          className="dark:invert"
          src="/lotus.svg"
          width={64}
          height={64}
          alt="lotus"
        />
      </a>

      {/* right side */}
      <div className="col-start-5 col-span-2 mx-auto gap-16 hidden md:relative md:flex">
      <NavButton text="Programming" href="/programming" />
      <NavButton text="Motion Graphics" href="/motion_graphics" />

      </div>
      

      {/* mobile options */}

      {/* burger menu */}
      <div className="grid col-start-7 h-full w-full place-items-center mx-auto gap-8 md:hidden">
        <Menu color="var(--secondary)" onClick={MenuToggle} className={`w-max transition-transform duration-300 transform ${isMenuOpen ? 'translate-x-full' : 'translate-x-0'}`} />
        <MobileMenu is_open={isMenuOpen} toggle={MenuToggle}/>

      </div>
      {/* mobile nav div */}


    </nav>
  )
}