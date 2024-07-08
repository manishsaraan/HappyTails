"use client";

import Link from "next/link";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const routes = [
  {
    path: "/app/dashboard",
    label: "Dashboard",
  },
  {
    path: "/app/account",
    label: "Accounts",
  },
];
export default function AppHeader() {
  const activePathName = usePathname();

  return (
    <header className="flex justify-between items-center border-b border-white/10 py-2">
      <Logo />
      <nav>
        <ul className="flex gap-2 text-xs">
          {routes.map((link) => (
            <li key={link.path}>
              <Link
                className={cn(
                  `text-white/70 bg-black/10 rounded-sm px-2 py-1
                 hover:text-white focus:text-white transition`,
                  {
                    "bg-black/10 text-white": activePathName === link.path,
                  }
                )}
                href={link.path}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
