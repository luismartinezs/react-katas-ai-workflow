import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AI } from "./action";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Katas AI Workflow",
  description: "React Katas AI Workflow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark")}>
        <AI>{children}</AI>
      </body>
    </html>
  );
}
