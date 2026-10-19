"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { locales, localeMeta, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routes";
import { cx } from "@/lib/text";

/** Figma 07 Components / Language Switch (Active = PT | EN). Keeps the current page. */
export function LanguageSwitch({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();

  return (
    <nav aria-label={label} className="flex items-center gap-sm">
      {locales.map((l, index) => (
        <Fragment key={l}>
          {index > 0 && <span aria-hidden="true" className="h-3 w-px bg-border-default" />}
          <Link
            href={switchLocalePath(pathname, l)}
            hrefLang={localeMeta[l].hreflang}
            lang={localeMeta[l].hreflang}
            aria-current={l === locale ? "true" : undefined}
            className={cx(
              "type-nav rounded-sm transition-colors",
              l === locale ? "text-text-primary" : "text-text-muted hover:text-text-primary",
            )}
          >
            {localeMeta[l].label}
          </Link>
        </Fragment>
      ))}
    </nav>
  );
}
