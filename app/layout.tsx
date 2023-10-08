import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import MenuButton from "./_components/MenuButton";
import Head from "next/head";
import Script from "next/script";
import SnackBar from "./_components/Snackbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "hradmin.dev",
  description:
    "HR Administration System which allowing users to efficiently manage employee details",
  manifest: "/manifest.json",
  themeColor: "#000",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Script src="https://unpkg.com/@material-tailwind/html@latest/scripts/dismissible.js"></Script> */}
      <body suppressHydrationWarning={true} className={inter.className}>
        <MenuButton />
        <SnackBar />
        {children}
      </body>
    </html>
  );
}
