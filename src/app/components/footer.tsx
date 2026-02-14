'use client'


import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { SiGithub, SiInstagram, SiYoutube } from '@icons-pack/react-simple-icons';
import { Circle, Moon, Linkedin, SunMoon } from 'lucide-react';
import Button from './button';


function Tooltip({ children, text }: { children: React.ReactNode; text: string }) {
  return (
    <div className='relative group'>
      {children}
      <span
        role='tooltip'
        className='absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                   opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 
                   transition-all duration-500 ease-in-out text-(--secondary)'
      >
        {text}
      </span>
    </div>
  );
}

const socialLinks = [
  { href: 'https://github.com/JDLanyon', icon: SiGithub, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/jdlanyon/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'https://www.youtube.com/@sausytime', icon: SiYoutube, label: 'YouTube' },
  { href: 'https://www.instagram.com/sausytime/', icon: SiInstagram, label: 'Instagram' },
];

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const icon = theme === 'light' ? <Circle /> : theme === 'dark' ? <Moon /> : <SunMoon />;
  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const tooltipText = theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System theme';

  return (
    <Tooltip text={tooltipText}>
      <Button onClick={cycleTheme} md_invert={false}>
        {icon}
      </Button>
    </Tooltip>
  );
}


export default function Footer({ landingPage = false }: { landingPage?: boolean }) {
  return (
    <footer
      className={`
        flex flex-row flex-wrap items-center justify-center gap-2 py-4 whitespace-nowrap
        ${landingPage ? 'md:absolute md:bottom-8 md:left-0 md:right-0' : ''}
      `}
    >
      {socialLinks.map(({ href, icon: Icon, label }) => (
        <Link
          key={href}
          href={href}
          target='_blank'
          rel='noopener noreferrer'
          className='flex gap-2 p-2 hover:underline hover:underline-offset-4 text-(--secondary)'
        >
          <Icon color='var(--secondary)' />
          <p>{label}</p>
        </Link>
      ))}
      <ThemeSwitch />
    </footer>
  );
}