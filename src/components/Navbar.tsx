"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "首页" },
  { href: "/listening", label: "听力练习" },
  { href: "/speaking", label: "口语练习" },
  { href: "/profile", label: "个人中心" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-zinc-100">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-16">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-sm font-bold tracking-tight transition-colors ${
                isActive
                  ? "text-accent"
                  : "text-zinc-400 hover:text-zinc-700"
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute -bottom-[19px] left-0 right-0 h-0.5 bg-accent rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
