import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// TODO: note that this breaks if you reference the same thing the root layout does.
// import './globals.scss'
import Nav from "../Nav"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'My personal portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Nav />
        {children}
      </body>
    </html>
  )
}
