import { Overpass, Overpass_Mono, Doto } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';
import { LotusNextProvider } from '@jdlanyon/lotus-library/react/next';

import "./globals.css";
import '@jdlanyon/lotus-library/style.css';

const overpass = Overpass({
  variable: "--font-overpass",
  subsets: ["latin"],
  display: 'swap',
})

const overpass_mono = Overpass_Mono({
  variable: "--font-overpass-mono",
  subsets: ["latin"],
  display: 'swap',
})

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Sausytime - Designer Portfolio",
  description: "made with nextjs and love :>",
};


export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${overpass.variable} ${overpass_mono.variable} ${doto.variable}`} suppressHydrationWarning>
      <body className="min-h-screen">
        <ThemeProvider defaultTheme="dark" enableSystem={false} attribute="data-theme">
          <LotusNextProvider>
            {modal}
            {children}
          </LotusNextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
