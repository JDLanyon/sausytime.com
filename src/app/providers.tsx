'use client';

import { ThemeProvider, useTheme } from 'next-themes';
import { LotusNextProvider } from '@jdlanyon/lotus-library/react/next';

/**
 * Host-side providers. `next-themes` stays the single source of truth for the
 * theme (it writes `data-theme` on <html>); we forward its state into the
 * library via `LotusNextProvider`'s `themeController` so the library's
 * <ThemeSwitch> reflects and updates the real theme. `enableSystem` is on so
 * the switch's `light → dark → system` cycle has a real `system` state.
 */
function LotusWithTheme({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <LotusNextProvider
      themeController={{
        theme: theme as 'light' | 'dark' | 'system' | undefined,
        setTheme,
      }}
    >
      {children}
    </LotusNextProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" enableSystem attribute="data-theme">
      <LotusWithTheme>{children}</LotusWithTheme>
    </ThemeProvider>
  );
}

export default Providers;
