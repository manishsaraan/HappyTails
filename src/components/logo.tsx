import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href={"/"}>
      <Image
        className={cn("h-[45px] w-[45px] rounded-full", className)}
        alt="HappyTails logo"
        src={logo}
      />
    </Link>
  );
}
