'use client'

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';


const navLinks = [
  { name: 'Home', href: '/', position: 'left' },
  { name: 'About', href: '/about', position: 'left' },
  { name: 'Programming', href: '/programming', position: 'right' },
  { name: 'Motion Graphics', href: '/motion_graphics', position: 'right' },
];

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isActive = usePathname() === href;
  return (
    <a
      href={href}
      className={`flex items-center ${isActive ? 'text-(--primary) font-bold' : 'text-(--secondary) hover:underline hover:underline-offset-4'}`}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}

function MobileMenu({ isOpen, toggle }: { isOpen: boolean; toggle: React.MouseEventHandler }) {
  return (
    <div
      className={`fixed flex flex-col z-10 top-0 right-0 h-full w-full bg-(--background)/80 transition-transform duration-300 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Top bar – invisible copy of the navbar to place the X exactly where the burger was */}
      <div className="grid grid-cols-7 w-screen gap-8 items-center h-16">
        {/* Left side (invisible) */}
        <div className="col-start-2 col-span-2 mx-auto gap-16 flex invisible">
          {navLinks.filter(l => l.position === 'left').map(l => (
            <NavLink key={l.href} href={l.href}>{l.name}</NavLink>
          ))}
        </div>
        {/* Lotus (invisible) */}
        <div className="col-start-4 mx-auto invisible">
          <Image src="/lotus.svg" width={64} height={64} alt="lotus" />
        </div>
        {/* Right side (invisible) */}
        <div className="col-start-5 col-span-2 mx-auto gap-16 flex invisible">
          {navLinks.filter(l => l.position === 'right').map(l => (
            <NavLink key={l.href} href={l.href}>{l.name}</NavLink>
          ))}
        </div>
        {/* X – visible, same column as burger */}
        <div className="col-start-7 col-span-1 flex justify-center items-center">
          <X color="var(--secondary)" onClick={toggle} className="cursor-pointer" />
        </div>
      </div>

      {/* Menu links – centered below */}
      <div className="flex-1 flex flex-col justify-center items-center space-y-8">
        {navLinks.map(l => (
          <NavLink key={l.href} href={l.href}>{l.name}</NavLink>
        ))}
      </div>
    </div>
  );
}

export default function Nav() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!isMenuOpen);

  return (
    <nav className="z-10 grid grid-cols-7 w-screen gap-8 items-center justify-center text-center fixed top-0 bg-linear-to-b from-(--background)/80 to-0">
      {/* Left links (desktop only) */}
      <div className="col-start-2 col-span-2 mx-auto gap-16 hidden md:flex">
        {navLinks.filter(l => l.position === 'left').map(l => (
          <NavLink key={l.href} href={l.href}>{l.name}</NavLink>
        ))}
      </div>

      {/* Lotus (always visible) */}
      <Link className="col-start-4 mx-auto" href="/">
        <Image className="dark:invert" src="/lotus.svg" width={64} height={64} alt="lotus" />
      </Link>

      {/* Right links (desktop only) */}
      <div className="col-start-5 col-span-2 mx-auto gap-16 hidden md:flex">
        {navLinks.filter(l => l.position === 'right').map(l => (
          <NavLink key={l.href} href={l.href}>{l.name}</NavLink>
        ))}
      </div>

      {/* Burger (mobile only) */}
      <div className="grid col-start-7 h-full w-full place-items-center mx-auto md:hidden">
        <Menu color="var(--secondary)" onClick={toggleMenu} className="w-full" />
        <MobileMenu isOpen={isMenuOpen} toggle={toggleMenu} />
      </div>
    </nav>
  );
}