import Image from "next/image";
import React from "react";
import logo from "../../public/images/icon.svg";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href={"/"}>
      <Image alt="HappyTails logo" src={logo} />
    </Link>
  );
}
