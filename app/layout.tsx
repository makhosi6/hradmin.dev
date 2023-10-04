import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import MenuButton from './components/MenuButton'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'hradmin.dev',
  description: 'HR Administration System which allowing users to efficiently manage employee details',
  manifest: "/manifest.json",
  themeColor: "#000"

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <MenuButton />
        {children}</body>
    </html>
  )
}
