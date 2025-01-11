import NavBar from "@/component/navbar";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

import type { Metadata } from "next";
import "./globals.css";

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
      <body className={roboto.className}>
        <NavBar />
        <main
          style={{
            height: "calc(100% - 80px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}
