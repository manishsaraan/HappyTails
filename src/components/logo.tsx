import Image from "next/image";
import React from "react";
import logo from "../../public/images/logo.png";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image
        className="h-[45px] w-[45px] rounded-full"
        alt="HappyTails logo"
        src={logo}
      />
    </Link>
  );
}
