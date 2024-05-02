import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AI } from "./play/action";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import { getSEOTags, renderSchemaTags } from "@/lib/seo";
import { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = getSEOTags({ canonicalUrlRelative: "/" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "dark relative isolate flex h-full min-h-screen flex-col justify-between",
        )}
      >
        {renderSchemaTags()}
        <div>
          <Header className="sticky top-0 z-30" />
          <main className="flex flex-grow overflow-auto flex-col">
            <AI>{children}</AI>
          </main>
        </div>
        <Footer className="flex-shrink mt-auto" />
        <Toaster />
      </body>
    </html>
  );
}
