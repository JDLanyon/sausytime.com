"use client"

import Image from "next/image";

import "../globals.css";
import Button from "./button";

import { SiGithub, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import { Circle, Eclipse, Moon, Linkedin } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from "next/link";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const [isHovering, setIsHovered] = useState(false);
  const onMouseEnter = () => setIsHovered(true);
  const onMouseLeave = () => setIsHovered(false);

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div id="theme_switch"
      className="transition"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>

      {theme != 'light' ? 
        <Button onClick={() => setTheme('light')}>
          {isHovering ? <Circle /> : <Moon /> }
        </Button> : null
      }

      {theme != 'dark' ? 
        <Button onClick={() => setTheme('dark')}>
          {isHovering ? <Moon /> : <Circle /> }
        </Button> : null
      }

    </div>
  )
}

export default function Footer({home_page = false} : {home_page? : boolean}) {
  return (
    <footer className={`relative w-min mx-auto flex-col mb-4 md:flex md:flex-row gap-8 items-center justify-center ${home_page ? "lg:z-1 lg:bottom-0 lg:absolute lg:left-0 lg:right-0" : ""}`}>
      {/* Github */}
      <Link
        className="flex w-min mx-auto gap-2 my-4 hover:underline hover:underline-offset-4 text-[var(--secondary)]"
        href="https://github.com/JDLanyon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiGithub color="var(--secondary)" />
        GitHub
      </Link>

      {/* LinkedIn */}
      <Link
        className="flex w-min mx-auto gap-2 my-4 hover:underline hover:underline-offset-4 text-[var(--secondary)]"
        href="https://www.linkedin.com/in/jdlanyon/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Linkedin color="var(--secondary)" />
        LinkedIn
      </Link>

      {/* Youtube */}
      <Link
        title="branded account"
        className="flex w-min mx-auto gap-2 my-4 hover:underline hover:underline-offset-4 text-[var(--secondary)]"
        href="https://www.youtube.com/@sausytime"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiYoutube color="var(--secondary)" />
        YouTube
      </Link>

      {/* Instagram */}
      <Link
        className="flex w-min mx-auto gap-2 my-4 hover:underline hover:underline-offset-4 text-[var(--secondary)]"
        href="https://www.instagram.com/sausytime/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <SiInstagram color="var(--secondary)" />
        Instagram
      </Link>

      <ThemeSwitch />
    </footer>
  )
}
