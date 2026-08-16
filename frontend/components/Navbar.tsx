// TODO (Person A): Reusable navbar component
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/dashboard", label: "Documents" },
  { href: "/profile", label: "Profile" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-[--color-line] bg-[--color-paper]">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/dashboard" className="font-display text-xl font-semibold text-[--color-ink]">
          SynapseOS <span className="text-[--color-highlight]">Lite</span>
        </Link>

        <div className="flex items-center gap-6">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "text-sm font-medium text-[--color-ink] border-b-2 border-[--color-highlight] pb-1"
                    : "text-sm font-medium text-[--color-ink]/60 hover:text-[--color-ink] pb-1"
                }
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/login"
            className="rounded-full border border-[--color-line] px-4 py-1.5 text-sm font-medium text-[--color-ink] hover:bg-[--color-surface]"
          >
            Log out
          </Link>
        </div>
      </div>
    </nav>
  );
}