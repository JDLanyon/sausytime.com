import { Overpass, Overpass_Mono, Doto } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes';

import "./globals.css";


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
  title: "JDLanyon - Portfolio",
  description: "made with nextjs and love :>",
};


export default function RootLayout({
  // modal,
  children,
}: Readonly<{
  // modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${overpass.variable} ${overpass_mono.variable} ${doto.variable}`} suppressHydrationWarning>
      <body className="min-h-[100vh]">
        <ThemeProvider defaultTheme="dark" enableSystem={false}>
        {/* {modal} */}
        <div id="modal-root"></div>
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
