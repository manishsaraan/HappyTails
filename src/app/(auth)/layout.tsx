import Logo from "@/components/logo";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-y-5 justify-center items-center min-h-screen flex-col">
      <Logo />
      {children}
    </div>
  );
}
