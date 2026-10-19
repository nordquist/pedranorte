"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "@/lib/text";

export interface NavItem {
  label: string;
  href: string;
}

/** Figma 07 Components / Nav Link (Default | Hover | Active with sand indicator). */
export function NavLinks({ items, className, onNavigate }: { items: NavItem[]; className?: string; onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <ul className={className}>
      {items.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cx(
                "group flex flex-col gap-2xs rounded-sm py-xs type-nav transition-colors",
                active ? "text-text-primary" : "text-text-secondary hover:text-text-primary",
              )}
            >
              {item.label}
              <span aria-hidden="true" className={cx("h-px w-full", active ? "bg-accent-default" : "bg-transparent")} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
