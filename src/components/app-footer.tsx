import { cn } from "@/lib/utils";
import Link from "next/link";

const links = [
  {
    label: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    label: "Terms & Conditions",
    link: "/terms-conditions",
  },
  {
    label: "Refund Policy",
    link: "/refund-policy",
  },
];

export default function AppFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("border-t border-black/50 py-5 mt-auto flex", className)}
    >
      <small className="opacity-50">&copy; 2030, all rights reserved</small>
      <section className="flex gap-5 ml-auto">
        {links.map((link) => (
          <Link
            className="opacity-70"
            target="_blank"
            href={link.link}
            key={link.label}
          >
            {link.label}
          </Link>
        ))}
      </section>
    </footer>
  );
}
