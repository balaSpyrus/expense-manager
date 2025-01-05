import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CircleUserRound } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Expense Manager",
  description: "Created to manage your expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <nav className="nav">
          <h1>
            <Link href="/">Expense Manager</Link>
          </h1>
          <ul>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/configure">Configure</Link>
            </li>
            <li>
              <Link href="/user/dummy">
                <CircleUserRound />
              </Link>
            </li>
          </ul>
        </nav>
        <main style={{ height: "calc(100% - 62px" }}>{children}</main>
      </body>
    </html>
  );
}
