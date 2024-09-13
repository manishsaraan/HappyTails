import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HappyTails: a pet daycare software",
  description: "Take care of people's pets responsibly",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${inter.className} text-sm text-zinc-900 bg-[#D5F5E3] min-h-screen`}
      >
        <SessionProvider>{children}</SessionProvider>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
