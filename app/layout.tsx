import NavBar from "@/component/navbar";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
      <body>
        <NavBar />
        <main style={{ height: "calc(100% - 80px" }}>{children}</main>
      </body>
    </html>
  );
}
