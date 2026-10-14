'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Footer as LotusFooter, Button, Tooltip } from '@jdlanyon/lotus-library/react';
import { Circle, Moon, SunMoon } from 'lucide-react';

/**
 * Host-owned theme switch. Wired directly to `next-themes` (the single source
 * of truth) — no library theme context indirection. Cycles
 * light → dark → system, mirroring the original site behaviour.
 */
function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const icon = !mounted ? <Circle /> : theme === 'light' ? <Circle /> : theme === 'dark' ? <Moon /> : <SunMoon />;

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('system');
    else setTheme('light');
  };

  const tooltipText = !mounted ? 'Light mode' : theme === 'light' ? 'Light mode' : theme === 'dark' ? 'Dark mode' : 'System theme';

  return (
    <Tooltip text={tooltipText}>
      <Button onClick={cycleTheme} aria-label="Toggle theme" invertOnHover={false}>
        {icon}
      </Button>
    </Tooltip>
  );
}

/**
 * Host-owned footer. The library's <Footer> lays out site content above a
 * centered wrapping row of branding links; we pass the theme switch through
 * `extraSlot` so it sits inline next to the links. Nothing inline-theme-specific
 * lives in the library — the toggle is host-owned and just poured into a slot.
 */
export function Footer({ landingPage = false }: { landingPage?: boolean }) {
  return (
    <LotusFooter
      landingPage={landingPage}
      extraSlot={<ThemeSwitch />}
    />
  );
}

export default Footer;

